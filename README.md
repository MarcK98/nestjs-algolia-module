# nestjs-algolia-module

The super fast Algolia module for NestJS!

## Install

```bash
yarn add nestjs-algolia-module
```

## Getting started

### Register the module

```typescript
// app.module.ts
import { AlgoliaModule } from 'nestjs-algolia-module';

@Module({
  imports: [
    //You can register the module (sync using forRoot or async using forRootAsync)
    AlgoliaModule.forRoot({
      // Set the credentials directly
      applicationId: 'ALGOLIA_APPLICATION_ID',
      apiKey: 'ALGOLIA_API_KEY',
    }),

    // OR
    AlgoliaModule.forRootAsync({
      // Or import them from a config:
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: AlgoliaConfigService,
    }),
  ],
})
export class AppModule {}
```

### Optional: Create the config if you choose to register using a config service

```typescript
// algolia.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AlgoliaModuleOptions } from 'nestjs-algolia-module';

@Injectable()
export class AlgoliaConfigService {
    constructor(private configService: ConfigService) {}

    createAlgoliaOptions(): AlgoliaModuleOptions {
        return {
            applicationId: this.configService.get<string>('algolia.appKey'),
            apiKey: this.configService.get<string>('algolia.apiKey'),
            // You can also set AlgoliaSearchOptions
            // options:
        };
    }
}

```

### Register the indexes

```typescript
// example.module.ts
import { AlgoliaModule } from 'nestjs-algolia-module';
import { Entity1, Entity2 } from '...';

@Module({
  imports: [
    AlgoliaModule.forFeature([Entity1, Entity2]),
    // OR
    AlgoliaModule.forFeature([{
      name: Entity2, // Or a string 'EntityCustomName'
      // options: Index options
    }]),
  ],
})
export class ExampleModule {}
```

Check [Algolia docs](https://www.algolia.com/doc/api-reference/settings-api-parameters/) for a list of all available Index options

### Use the registered Index

The Index is injectable using the `@InjectIndex` decorator

```typescript
// example.service.ts
import { InjectIndex } from 'nestjs-algolia-module';
import { SearchIndex } from 'algoliasearch';
import { Entity1 } from '...';

@Injectable()
export class ExampleService {
  constructor(
    @InjectIndex(Entity1) private algoliaEntity1Index: SearchIndex
    // Or you can inject using a string
    @InjectIndex('customIndexName') private algoliaCustomNameIndex: SearchIndex
  )

  async createEntity(...) {
    // ...

    this.algoliaEntity1Index.saveObject({
        id: ...,
        objectID: ...,
        // otherParameter: ...
    });

    // ...
  }


}
```

## Support

Code contributions are encouraged and welcomed!
