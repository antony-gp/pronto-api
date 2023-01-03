import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/company.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, CompanyService, CompanyRepository],
})
export class UserModule {}
