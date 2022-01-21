import { Inject } from '@nestjs/common';

import { getIndexName } from '../utils';

export const InjectIndex = (indexName: string | Function) => Inject(getIndexName(indexName));
