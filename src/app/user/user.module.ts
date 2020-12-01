import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { constants } from '../../auth/auth.constants';

import { Users } from './entities/user.entity';
import { UsersService } from './user.service';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users
    ]),
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
  providers: [ UsersService ],
  controllers: [ UsersController, AuthController ],
  exports: [
    UsersService
  ],
})
export class UserModule {}
