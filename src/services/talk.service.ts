import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Talk } from '../models/talk.entity';
import { Users } from 'src/models/user.entity';

interface RequestDTO {
  user_primary: string;
  user_secundary: string;
}

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk)
    private talkRepository: Repository<Talk>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

async findAll(): Promise<Talk[]> {
  return await this.talkRepository.find()
}

async findTalkById(id: string): Promise<Talk> {
  const checkTalk = await this.talkRepository.findOne({
    where: { id }
  });

  return checkTalk;
}

async findUserToTalk(user_secundary: string): Promise<Users> {
  const findUsers = await this.usersRepository.findOne({
    where: { id: user_secundary }
  });

  return findUsers;
}

async create({ user_primary, user_secundary }: RequestDTO): Promise<Talk> {
  const findUserToSendMessageTotalk = await this.findUserToTalk(user_secundary);

  if (!findUserToSendMessageTotalk) {
    throw new NotFoundException('User destination not exist');
  }

  const talk = this.talkRepository.save({
    user_primary,
    user_secundary,
  });

  return talk;
} 

async delete(id: string): Promise<DeleteResult> {
  const checkTalk = await this.findTalkById(id);

  if (!checkTalk) {
    throw new NotFoundException('This talk not exist or not available');
  }

  return this.talkRepository.delete(id);
}

async softRemove(id: number) {
  const cv = await this.talkRepository.findOne(id);
  if (!cv) {
    throw new NotFoundException('This message not found');
  }

  const qb = this.talkRepository.createQueryBuilder('messages');
  
  // qb.select()

  return this.talkRepository.softRemove(cv);
}
}