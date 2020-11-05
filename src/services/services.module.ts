import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Users from '../models/user.entity';
import { UsersService } from './users.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users
    ])
  ],
  providers: [
    UsersService
  ],
  exports: [
    UsersService
  ]
})
export class ServicesModule {}
