import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from '../models/user.entity';
import { Messages } from '../models/message.entity';
import { Email } from '../models/email.entity';
import { Talk } from '../models/talk.entity';

import { UsersService } from './users.service';
import { MessageService } from './messages.service';
import { EmailsService } from './emails.service';
import { TalkService } from './talk.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Messages,
      Email,
      Talk
    ])
  ],
  providers: [
    UsersService,
    MessageService,
    EmailsService,
    TalkService
  ],
  exports: [
    UsersService,
    MessageService,
    EmailsService,
    TalkService
  ]
})
export class ServicesModule {}
