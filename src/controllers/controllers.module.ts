import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {constants } from '../auth/auth.constants';

import { UsersController } from './users.controller'; 
import { MessageController } from './message.controller';
import { AuthController } from './auth.controller';
import { EmailsController } from './emails.controller';
import { TalkController } from './talk.controller';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: constants.secret,
        signOptions: {
          expiresIn: '1d',
          algorithm: 'HS512',
        },
        verifyOptions: {
          algorithms: ['HS512'],
          ignoreExpiration: false,
        }
      })
    }),
  ],

  controllers: [
    UsersController,
    MessageController,
    AuthController,
    EmailsController,
    TalkController
  ],
})
export class ControllersModule {}
