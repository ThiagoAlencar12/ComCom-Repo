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
  async create(@Body() usersData: Users): Promise<Users> {
    return this.usersService.create(usersData);
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() usersData: Users): Promise<Users> {
      usersData.id = String(id);
      console.log('Update #' + usersData.id)

      return this.usersService.update(usersData);
  }
  
  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.usersService.delete(id);
  } 
}
