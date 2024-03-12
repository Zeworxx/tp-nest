import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor() {}

  private dbFilePath = `src/user/users.json`;

  async addUser(user: User): Promise<User> {
    try {
      const users = await this.loadUsers();
      users.push(user);
      await this.saveUsers(users);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.loadUsers();
  }

  private async loadUsers(): Promise<User[]> {
    try {
      const data = await fs.readFile(this.dbFilePath);
      return JSON.parse(data.toString());
    } catch (error) {
      console.error(error);
    }
  }

  private async saveUsers(users: User[]): Promise<void> {
    try {
      await fs.writeFile(this.dbFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
}
