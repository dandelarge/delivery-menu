import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddUserDTO } from 'src/DTOs/AddUser.dto';
import { UserDBModel } from './user.db.model';
import { hash, compare } from 'bcrypt';
export interface UserModel {
  name: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {
  }

  getAllUsers(): UserDBModel[] {
    return this.db.getAll('users');
  }

  async addUser(user: AddUserDTO) {
    const passwordHash = await this.hashPassword(user.password);
    return this.db.add('users',{...user, password: passwordHash});
  }

  find(username: string): UserDBModel {
    return this.db.get('users', username, 'name');
  }

  update(name: string, data: Partial<UserDBModel>) {
    return this.db.update('users', data, name, 'name');
  }

  private async hashPassword(password: string) {
    return await hash(password, 10);
  }

  async passwordMatches(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
