import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Messages from '../models/message.entity';

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

async create({ message, destinatario_id, remetente_id }: RequestDTO): Promise<Messages> {
  const messages = this.messageRepository.save({
    message,
    destinatario_id,
    remetente_id,
  });

  return messages;
} 

// async update({ id ,name, email, password }: UpdateDTO): Promise<Messages> {
//   const users = await this.findById(id);

//   if (!users) {
//     throw new Error('This User Not Exist');
//   }

//   const checkEmail = await this.findByEmail(email);

//   if (checkEmail) {
//     throw new Error('This E-Mail Already Exist')
//   }

//   return this.messageRepository.save(users);

// }

async delete(id: string): Promise<DeleteResult> {
   const checkUsers = await this.findById(id);

   if (!checkUsers) {
     throw new Error('This User Not Exist');
   }

   return this.messageRepository.delete(id);
}
}