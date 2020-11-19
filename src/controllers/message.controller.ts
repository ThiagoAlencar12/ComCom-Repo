import { Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { MessageService } from '../services/messages.service';

import { Messages } from '../models/message.entity';
import { RestAuthGuard } from 'src/guards';
import { Users } from 'src/models/user.entity';
import { CurrentUser } from 'src/decoretors/current-user.decorator';

interface MessagesDTO {
  message: string;
  remetente_id: string;
  destinatario_id: string;
  hidden?: boolean;
  hidden_all?: boolean;
}

@Controller('messages')
export class MessageController {
  constructor(
    private messageService: MessageService,
  ) {}

  @Get('/')
  @UseGuards(RestAuthGuard)
  index(): Promise<Messages[]> {
    return this.messageService.findAll();
  }

  @Post('/create')
  @UseGuards(RestAuthGuard)
  async create(@CurrentUser() currentUser: Users ,@Body() @Param('id') { destinatario_id, message }: MessagesDTO): Promise<Messages> {
    return this.messageService.create({
      remetente_id: currentUser.id,
      destinatario_id,
      message,
    });
  }

  // @Delete('/delete/:id')
  // @UseGuards(RestAuthGuard)
  // async delete(@Param('id') id: string) {
  //   return this.messageService.delete(id);
  // }

  @Delete('/delete/:id')
  @UseGuards(RestAuthGuard)
  async deleteCv(
    @Param('id') id: number,
  ) {
    return this.messageService.softRemove(id);
  }
}
