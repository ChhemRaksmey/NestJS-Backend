import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { hashPassword } from '../utils/hash.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const existing = await this.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: await hashPassword(data.password),
    });
    return this.userRepository.save(user);
  }
}
