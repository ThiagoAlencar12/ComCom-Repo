import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './app/user/user.module';
import { MessageModule } from './app/message/message.module';
import { EmailModule } from './app/email/email.module';
import { TalkModule } from './app/talk/talk.module';
import { WebsocketService } from './websocket/websocket.service';

import * as Options from './config/ormConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(Options),
    AuthModule,
    UserModule,
    MessageModule,
    EmailModule,
    TalkModule,
  ],
  providers: [ WebsocketService ],
})
export class AppModule {}
