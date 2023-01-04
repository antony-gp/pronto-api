import { Module } from '@nestjs/common';
import { ClockService } from './clock.service';
import { ClockController } from './clock.controller';
import { ClockRepository } from './clock.repository';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [CompanyModule, UserModule],
  controllers: [ClockController],
  providers: [ClockService, ClockRepository],
})
export class ClockModule {}
