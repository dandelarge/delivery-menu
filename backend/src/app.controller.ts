import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AddUserDTO } from './DTOs/AddUser.dto';
import { UserLoginDTO } from './DTOs/UserLogin.dto';
import { UserDBModel } from './users/user.db.model';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getAllUsers() {
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
}
