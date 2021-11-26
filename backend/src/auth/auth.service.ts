import { Injectable } from '@nestjs/common';
import { UserLoginDTO } from 'src/DTOs/UserLogin.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) {}

  async validateUser(user: UserLoginDTO) {
    const {name} = user;
    const foundUser = await this.userService.find(name);

  }
}
