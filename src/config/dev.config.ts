import * as dotenv from 'dotenv';

dotenv.config();

import * as dbConfig from './typeorm.config';

export const typeOrmConfig = dbConfig.typeOrmConfig;
