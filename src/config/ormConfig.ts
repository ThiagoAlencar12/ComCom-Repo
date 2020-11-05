import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const Options: TypeOrmModuleOptions = {
 type: 'postgres',
 username: 'postgres',
 password: 'docker',
 database: 'nestjs',
 host: 'localhost',
 port: 5432,
 entities: [__dirname + '/../**/*.entity.{js,ts}'],
 migrations: [__dirname + '/../database/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
}

module.exports = Options;

