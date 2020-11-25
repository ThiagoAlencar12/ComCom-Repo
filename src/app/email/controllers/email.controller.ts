import { Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { EmailService } from '../email.service';

import { Email } from '../../email/entities/email.entity';
import { Users } from '../../user/entities/user.entity';

import { RestAuthGuard } from '../../../guards';
import { CurrentUser } from 'src/auth/decoretors/current-user.decorator';

interface MessagesDTO {
  message: string;
  sender_id: string;
  reciever_id: string;
  date: Date;
}

@Controller('emails')
export class EmailController {
  constructor(
    private emailService: EmailService,
  ) {}

  @Get('/')
  @UseGuards(RestAuthGuard)
  index(): Promise<Email[]> {
    return this.emailService.findAll();
  }

  @Post('/create')
  @UseGuards(RestAuthGuard)
  async create(@CurrentUser() currentUser: Users ,@Body() @Param('id') { reciever_id, message }: MessagesDTO): Promise<Email> {
    return this.emailService.create({
      sender_id: currentUser.id,
      reciever_id,
      message,
      date: new Date()
    });
  }

  @Delete('/delete/:id')
  @UseGuards(RestAuthGuard)
  async delete(@Param('id') id: string): Promise<any> {
    return this.emailService.delete(id);
  } 
}
