import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Messages from '../models/message.entity';

interface RequestDTO {
  message: string;
}

// interface UpdateDTO {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// }

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

// async findByEmail(email: string): Promise<Messages> {
//   const checkEmail = await this.messageRepository.findOne({
//     where: {email}
//   })

//   return checkEmail;
// }

// async findByIDWithPassword(id: string): Promise<Messages> {
//   return await this.messageRepository.findOne(id)
// }

async create({ message }: RequestDTO): Promise<Messages> {
  const messages = this.messageRepository.save({
    message
  })

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