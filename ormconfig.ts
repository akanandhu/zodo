const ConnectionOptions = require('typeorm');
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export default new ConnectionOptions.DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // migrationsRun: false,
  // logging: false,
  // logger: 'file',

  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  migrationsTableName: 'migrations',
});
