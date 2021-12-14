import { Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { HandlerGuad } from './auth/handler.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Roles } from './auth/roles.decorator';
import { AddUserDTO } from './DTOs/AddUser.dto';
import { UserDBModel } from './users/user.db.model';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, HandlerGuad)
  @Roles('handler')
  @Get('users')
  getAllUsers(@Request() req) {
    console.log('HIIIIIIII', req.user);
    return this.userService.getAllUsers();
  }

  @Get('users/search')
  findOneUser(@Query('name') name: string) {
    return this.userService.find(name);
  }

  @Post('users')
  addUser(@Body() user: AddUserDTO) {
    return this.userService.addUser(user);
  }

  @Put('users/:name')
  async updateUser(@Param('name') name: string, @Body() data: Partial<UserDBModel>) {
    return await this.userService.update(name, data);
  }
}
