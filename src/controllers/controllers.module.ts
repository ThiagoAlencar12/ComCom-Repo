import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller'; 

@Global()
@Module({
  controllers: [
    UsersController,
  ],
})
export class ControllersModule {}
