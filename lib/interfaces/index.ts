import { Settings } from '@algolia/client-search';
import { ModuleMetadata, Provider, Type } from '@nestjs/common/interfaces';
import { AlgoliaSearchOptions } from 'algoliasearch';

export interface AlgoliaModuleOptions {
    applicationId: string;
    apiKey: string;
    options: AlgoliaSearchOptions;
}

export interface AlgoliaModuleOptionsFactory {
    createAlgoliaOptions(): Promise<AlgoliaModuleOptions> | AlgoliaModuleOptions;
}

export interface AlgoliaModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<AlgoliaModuleOptionsFactory>;
    useClass?: Type<AlgoliaModuleOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<AlgoliaModuleOptions> | AlgoliaModuleOptions;
    inject?: any[];
    extraProviders?: Provider[];
}

export interface AlgoliaIndexDefinition {
    name: string | Function;
    options?: Settings;
}
