import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import{ Messages } from '../models/message.entity';

interface RequestDTO {
  id: string;
  message: string;
  destinatario_id: string;
  remetente_id: string;
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

async create({ message, destinatario_id, remetente_id }: RequestDTO): Promise<Messages> {
  const findUserToSendEmail = await this.findByUsers(destinatario_id);

  if (!findUserToSendEmail) {
    throw new BadRequestException('User destination not exist');
  }

  const messages = this.messageRepository.save({
    message,
    destinatario_id,
    remetente_id,
  });

  return messages;
} 

async delete(id: string): Promise<DeleteResult> {
   const checkUsers = await this.findById(id);

   if (!checkUsers) {
     throw new Error('This User Not Exist');
   }

   return this.messageRepository.delete(id);
}
}