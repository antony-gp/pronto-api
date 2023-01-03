import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaModule } from '../src/prisma/prisma.module';
import { CompanyModule } from '../src/company/company.module';
import { TestHelper } from '../shared/helper/test.helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await TestHelper.buildApplication({
      imports: [PrismaModule, CompanyModule],
    });

    await app.init();
  });

  it('/companies (GET)', () => {
    return request(app.getHttpServer()).get('/companies').expect(200);
  });

  afterEach(async () => await app.close());
});
