import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from '../user/entities/user.entity';
import { Talk } from '../talk/entities/talk.entity';

import { TalkController } from './controllers/talk.controller';
import { TalkService } from './talk.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Talk
    ])
  ],
  controllers: [TalkController],
  providers: [TalkService]
})
export class TalkModule {}
