import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import{ Email } from '../models/email.entity';

interface RequestDTO {
  message: string;
  sender_id: string;
  reciever_id: string;
  date: Date;
}

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {}

async findAll(): Promise<Email[]> {
  return await this.emailRepository.find()
}

async findById(id: string): Promise<Email> {
  const checkMessage = await this.emailRepository.findOne({
    where: { id }
  });

  return checkMessage;
}

async findByUsers(reciever_id: string): Promise<Email> {
  const findUsers = await this.emailRepository.findOne({
    where: {
      reciever_id
    }
  });

  return findUsers;
}

async create({ message, sender_id, reciever_id }: RequestDTO): Promise<Email> {
  const findUserToSendEmail = await this.findByUsers(reciever_id);

  if (!findUserToSendEmail) {
    console.log(findUserToSendEmail)
    throw new NotFoundException('User destination not exist');
  }

  const messages = this.emailRepository.save({
    message,
    reciever_id,
    sender_id,
    date: new Date(),
  });

  return messages;
} 

async delete(id: string): Promise<DeleteResult> {
   const checkUsers = await this.findById(id);

   if (!checkUsers) {
     throw new NotFoundException('This User Not Exist');
   }

   return this.emailRepository.delete(id);
}
}