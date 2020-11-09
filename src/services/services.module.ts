import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Users from '../models/user.entity';
import Messages from '../models/message.entity';
import { UsersService } from './users.service';
import { MessageService } from './messages.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Messages
    ])
  ],
  providers: [
    UsersService,
    MessageService
  ],
  exports: [
    UsersService,
    MessageService
  ]
})
export class ServicesModule {}
