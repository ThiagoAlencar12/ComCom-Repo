import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers/controllers.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';

import * as Options from './config/ormConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(Options),
    ControllersModule,
    ServicesModule,
    AuthModule,
  ],
})
export class AppModule {}
