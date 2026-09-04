import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../services/user.service';
import { User } from '../models/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: any, id?: number) => void) {
    done(null, user.id);
  }

  async deserializeUser(
    id: number,
    done: (err: any, user?: User | null) => void,
  ) {
    const user = await this.userService.findById(id);
    done(null, user);
  }
}
