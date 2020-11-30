import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Messages } from '../message/entities/message.entity';
import { Users } from '../user/entities/user.entity';

interface RequestDTO {
  message: string;
  remetente_id: string;
  destinatario_id: string;
  hidden?: boolean;
  hidden_all?: boolean;
}

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Messages)
    private messageRepository: Repository<Messages>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

async findAll(): Promise<Messages[]> {
  return await this.messageRepository.find()
}

async findById(id: string): Promise<Messages> {
  const checkMessage = await this.messageRepository.findOne({
    where: { id }
  });

  return checkMessage;
}

async findByUsers(reciever_id: string): Promise<Users> {
  const findUsers = await this.usersRepository.findOne({
    where: { id: reciever_id }
  });

  return findUsers;
}

async create({ message, remetente_id, destinatario_id }: RequestDTO): Promise<Messages> {
  const findUserToSendEmail = await this.findByUsers(destinatario_id);

  if (!findUserToSendEmail) {
    throw new NotFoundException('User destination not exist');
  }

  const messages = this.messageRepository.save({
    message,
    destinatario_id,
    remetente_id,
  });

  return messages;
} 

async delete(id: string): Promise<DeleteResult> {
  const checkMessage = await this.findById(id);

  if (!checkMessage) {
    throw new NotFoundException('This message not exist');
  }

  return this.messageRepository.delete(id);
}

async softRemove(id: number) {
  const cv = await this.messageRepository.findOne(id);
  if (!cv) {
    throw new NotFoundException('This message not found');
  }

  const qb = this.messageRepository.createQueryBuilder('messages');
  
  // qb.select()

  return this.messageRepository.softRemove(cv);
}
}