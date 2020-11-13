import { Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { MessageService } from '../services/messages.service';

import {Messages} from '../models/message.entity';
import { RestAuthGuard } from 'src/guards';

interface MessagesDTO {
  message: string;
  destinatario_id: string
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
  async create(@Body() @Param('id') messageData: Messages): Promise<Messages> {
    return this.messageService.create(messageData);
  }

  // @Put('/update/:id')
  // async update(@Param('id') id: string, @Body() messageData: Messages): Promise<Messages> {
  //     messageData.id = String(id);
  //     console.log('Update #' + messageData.id)

  //     return this.messageService.update(messageData);
  // }
  
  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.messageService.delete(id);
  } 
}
