import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Users } from './entities/user.entity';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

interface UpdateDTO {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

async find(): Promise<Users[]> {
  return await this.usersRepository.find()
}

async findById(id: string): Promise<Users> {
  const checkUser = await this.usersRepository.findOne(id);

  return checkUser;
}

async findByEmail(email: string): Promise<Users> {
  const checkEmail = await this.usersRepository.findOne({
    where: { email }
  })

  return checkEmail;
}

async create({ name, email, password }: RequestDTO): Promise<Users> {
  const findEmail = await this.findByEmail(email);

  if(findEmail) {
    throw new BadRequestException('This E-mail Already Exist');
  }

  const hashPassword = await hash(password, 8);

  return await this.usersRepository.save({
    name,
    email,
    password: hashPassword
  });
}

async update({ id ,name, email, password }: UpdateDTO): Promise<Users> {
  const users = await this.findById(id);

  if (!users) {
    throw new Error('This User Not Exist');
  }

  const checkEmail = await this.findByEmail(email);

  if (checkEmail) {
    throw new Error('This E-Mail Already Exist')
  }
  users.name = name;
  users.password = await hash(password, 8);

  return this.usersRepository.save(users);

}

async delete(id: string): Promise<DeleteResult> {
   const checkUsers = await this.findById(id);

   if (!checkUsers) {
     throw new Error('This User Not Exist');
   }

   return this.usersRepository.delete(id);
}
}