import { Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import Users from '../models/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Get('/')
  index(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Post('/create')
  async create(@Body() blocoData: Users): Promise<Users> {
    return this.usersService.create(blocoData);
  }

  @Put('/update/:id')
  async update(@Param('id') id, @Body() blocoData: Users): Promise<any> {
      blocoData.id = Number(id);
      console.log('Update #' + blocoData.id)

      return this.usersService.update(blocoData);
  }
  
  @Delete('/delete/:id')
  async delete(@Param('id') id): Promise<any> {
    return this.usersService.delete(id);
  } 
}
