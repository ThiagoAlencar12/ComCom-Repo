import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Email } from './entities/email.entity';
import { Users } from '../user/entities/user.entity';

import { EmailService } from './email.service';
import { EmailController } from './controllers/email.controller';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Email,
      Users
    ])
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService]
})
export class EmailModule {}
