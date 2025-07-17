import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(userData: CreateUserDto): User {
    const newUser: User = {
      id: this.idCounter++,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }
}
