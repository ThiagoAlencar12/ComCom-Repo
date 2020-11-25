import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Messages } from '../message/entities/message.entity'
import { MessageController } from './controllers/message.controller';
import { Users } from '../user/entities/user.entity'
import { MessageService } from './message.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Messages,
      Users
    ])
  ],
  providers: [ MessageService ],
  controllers: [ MessageController ],
  exports: [ MessageService ]
})
export class MessageModule {}
