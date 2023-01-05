import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.userRepository.findFirst({ email, password });
  }

  async login({ id: sub, email, isAdmin: admin }: User) {
    return {
      access_token: this.jwtService.sign({ sub, email, admin }),
    };
  }
}
