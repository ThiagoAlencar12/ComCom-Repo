import { Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { MessageService } from '../services/messages.service';

import { Messages } from '../models/message.entity';
import { RestAuthGuard } from 'src/guards';
import { Users } from 'src/models/user.entity';
import { CurrentUser } from 'src/decoretors/current-user.decorator';

interface MessagesDTO {
  message: string;
  sender_id: string;
  destinatary_id: string;
  hidden?: boolean;
  hidden_all?: boolean;
}

@Controller('messages')
export class MessageController {
  constructor(
    private messageService: MessageService,
  ) {}

  @Get('/')
  index(): Promise<Messages[]> {
    return this.messageService.findAll();
  }

  @Post('/create')
  @UseGuards(RestAuthGuard)
  async create(@CurrentUser() currentUser: Users ,@Body() @Param('id') { destinatary_id, message }: MessagesDTO): Promise<Messages> {
    return this.messageService.create({
      sender_id: currentUser.id,
      destinatary_id,
      message,
    });
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.messageService.delete(id);
  } 
}
