import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersDbService } from './usersDb.service';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersDbService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: Omit<User, 'id'>) {
    const dbUser = await this.usersService.getUserByEmail(user.email);
    if (dbUser) {
      throw new BadRequestException('Email already exist');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Password could not be hashed');
    }
    this.usersService.saveUser({ ...user, password: hashedPassword });
    return { success: 'User created sucesfully!' };
  }

  async signIn(email: string, password: string) {
    const dbUser = await this.usersService.getUserByEmail(email);
    if (!dbUser) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const userPayload = {
      sub: dbUser.id,
      id: dbUser.id,
      email: dbUser.email,
    };

    const token = this.jwtService.sign(userPayload);

    return { success: 'user logged in succesfully', token };
  }
}
