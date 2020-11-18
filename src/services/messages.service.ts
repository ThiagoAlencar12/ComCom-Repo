import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import{ Messages } from '../models/message.entity';

interface RequestDTO {
  message: string;
  sender_id: string;
  destinatary_id: string;
  hidden?: boolean;
  hidden_all?: boolean;
}

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Messages)
    private messageRepository: Repository<Messages>,
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

async findByUsers(destinatario_id: string): Promise<Messages> {
  const findUsers = await this.messageRepository.findOne({
    where: {
      destinatario_id
    }
  });

  return findUsers;
}

async create({ message, sender_id, destinatary_id }: RequestDTO): Promise<Messages> {
  const findUserToSendEmail = await this.findByUsers(destinatary_id);

  if (!findUserToSendEmail) {
    throw new NotFoundException('User destination not exist');
  }

  const messages = this.messageRepository.save({
    message,
    destinatary_id,
    sender_id,
  });

  return messages;
} 

async delete(id: string): Promise<DeleteResult> {
   const checkUsers = await this.findById(id);

   if (!checkUsers) {
     throw new NotFoundException('This User Not Exist');
   }

   return this.messageRepository.delete(id);
}
}