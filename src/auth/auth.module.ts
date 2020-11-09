import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import Users from '../models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
  ],
  providers: [
    JwtStrategy
  ]
})
export class AuthModule {}























