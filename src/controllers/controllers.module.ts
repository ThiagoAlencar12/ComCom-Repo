import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller'; 
import { MessageController } from './message.controller';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {constants } from '../auth/auth.constants';


@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: constants.secret,
        signOptions: {
          expiresIn: '12h',
          algorithm: 'HS512',
        },
        verifyOptions: {
          algorithms: ['HS512'],
        }
      })
    }),
  ],

  controllers: [
    UsersController,
    MessageController,
    AuthController
  ],
})
export class ControllersModule {}
