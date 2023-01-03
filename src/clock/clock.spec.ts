import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { ClockController } from './clock.controller';
import { ClockRepository } from './clock.repository';
import { ClockService } from './clock.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/company.repository';

describe('ClockController', () => {
  let controller: ClockController, service: ClockService, repository: ClockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ClockController],
      providers: [ClockService, ClockRepository, UserService, UserRepository, CompanyService, CompanyRepository],
    }).compile();

    controller = module.get<ClockController>(ClockController);
    service = module.get<ClockService>(ClockService);
    repository = module.get<ClockRepository>(ClockRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
