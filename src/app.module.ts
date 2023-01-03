import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { ClockModule } from './clock/clock.module';

@Module({
  imports: [PrismaModule, CompanyModule, UserModule, ClockModule],
})
export class AppModule {}
