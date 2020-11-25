import { Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { MessageService } from '../message.service';

import { Messages } from '../entities/message.entity';
import { RestAuthGuard } from '../../../guards';
import { Users } from '../../user/entities/user.entity';
import { CurrentUser } from '../../../auth/decoretors/current-user.decorator';

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
