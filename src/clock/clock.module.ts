import { Module } from '@nestjs/common';
import { ClockService } from './clock.service';
import { ClockController } from './clock.controller';
import { ClockRepository } from './clock.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/company.repository';

@Module({
  controllers: [ClockController],
  providers: [ClockService, ClockRepository, UserService, UserRepository, CompanyService, CompanyRepository],
})
export class ClockModule {}
