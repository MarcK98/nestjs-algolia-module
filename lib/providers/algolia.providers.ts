import { Provider } from '@nestjs/common';
import { SearchClient } from 'algoliasearch';

import { ALGOLIA_CLIENT } from '../constants';
import { AlgoliaIndexDefinition } from '../interfaces';
import { getIndexName } from '../utils';

export const createAlgoliaIndexProviders = (indexData: AlgoliaIndexDefinition[]): Provider[] => {
    return indexData.map((idx) => ({
        provide: getIndexName(idx.name),
        inject: [ALGOLIA_CLIENT],
        useFactory: async (client: SearchClient) => {
            const indexName = typeof idx.name === 'string' ? idx.name : idx.name.name;
            const index = client.initIndex(indexName);
            if (idx.options) {
                await index.setSettings(idx.options);
            }
            return index;
        },
    }));
};
