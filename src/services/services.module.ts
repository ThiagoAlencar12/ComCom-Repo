import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from '../models/user.entity';
import { Messages } from '../models/message.entity';
import { Email } from '../models/email.entity';

import { UsersService } from './users.service';
import { MessageService } from './messages.service';
import { EmailsService } from './emails.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Messages,
      Email
    ])
  ],
  providers: [
    UsersService,
    MessageService,
    EmailsService
  ],
  exports: [
    UsersService,
    MessageService,
    EmailsService
  ]
})
export class ServicesModule {}
