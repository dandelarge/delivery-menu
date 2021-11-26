import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AddUserDTO } from './DTOs/AddUser.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UsersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('users/search')
  async findOneUser(@Query('name') name: string) {
    return await this.userService.find(name);
  }


  @Post('users')
  async addUser(@Body() user: AddUserDTO) {
    return await this.userService.addUser(user);
  }
}
