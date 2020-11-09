import { Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import { MessageService } from '../services/messages.service';

import Messages from '../models/message.entity';

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
  async create(@Body() messageData: Messages): Promise<Messages> {
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
