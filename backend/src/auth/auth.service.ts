import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from 'src/DTOs/UserLogin.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginData: UserLoginDTO) {
    const { name, password } = loginData;
    const user = this.userService.find(name);

    if (!user) {
      return null;
    }
    const isPasswordValid = await this.userService.passwordMatches(password, user.password);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
