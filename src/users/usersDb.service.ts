import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  saveUser(user: Omit<User, 'id'>) {
    this.usersRepository.save(user);
  }
  getUserById(id: string) {
    throw this.usersRepository.findOne({ where: { id } });
  }
}
