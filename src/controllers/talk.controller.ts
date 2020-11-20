import { Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';

import { RestAuthGuard } from 'src/guards';
import { CurrentUser } from 'src/decoretors/current-user.decorator';

import { Users } from 'src/models/user.entity';
import { Talk } from '../models/talk.entity';

import { TalkService } from '../services/talk.service';

interface TalkDTO {
  user_primary: string;
  user_secundary: string;
}

@Controller('talk')
export class TalkController {
  constructor(
    private messageService: TalkService,
  ) {}

  @Get('/')
  @UseGuards(RestAuthGuard)
  index(): Promise<Talk[]> {
    return this.messageService.findAll();
  }

  @Post('/create')
  @UseGuards(RestAuthGuard)
  async create(@CurrentUser() currentUser: Users ,@Body() @Param('id') { user_secundary }: TalkDTO): Promise<Talk> {
    return this.messageService.create({
      user_primary: currentUser.id,
      user_secundary,
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
