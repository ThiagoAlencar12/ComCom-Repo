import { Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { EmailsService } from '../services/emails.service';

import { Email } from '../models/email.entity';
import { RestAuthGuard } from 'src/guards';
import { Users } from 'src/models/user.entity';
import { CurrentUser } from 'src/decoretors/current-user.decorator';

interface MessagesDTO {
  message: string;
  sender_id: string;
  reciever_id: string;
  date: Date;
}

@Controller('emails')
export class EmailsController {
  constructor(
    private emailService: EmailsService,
  ) {}

  @Get('/')
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
  async delete(@Param('id') id: string): Promise<any> {
    return this.emailService.delete(id);
  } 
}
