import { Injectable } from '@nestjs/common';
import { DbLowService } from 'src/db/db-low/db-low.service';
import { AddUserDTO } from 'src/DTOs/AddUser.dto';

export interface UserModel {
  name: string;
}

@Injectable()
export class UsersService {

  dbReady = false;
  users: AddUserDTO[] = [];

  constructor() {
  }

  setDbAsReady() {
    this.dbReady = true;
  }

  async getAllUsers(): Promise<UserModel[]> {
    return this.users;
  }

  async addUser(user: AddUserDTO): Promise<UserModel> {
    this.users.push(user);
    return user;
  }

  async find(username: string): Promise<UserModel> {
    return Promise.resolve(this.users.find( user => user.name === username ));
  }
}
