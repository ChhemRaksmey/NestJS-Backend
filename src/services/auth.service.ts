import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { comparePassword } from '../utils/hash.util';
import { User } from '../models/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return null;
    return user;
  }
}
