import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UserModule } from '../src/user/user.module';
import { CompanyModule } from '../src/company/company.module';
import { TestHelper } from '../shared/helper/test.helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await TestHelper.buildApplication({
      imports: [PrismaModule, UserModule, CompanyModule],
    });

    await app.init();
  });

  it('/companies/:companyId/users (GET)', () => {
    return request(app.getHttpServer()).get('/companies/1/users').expect(200);
  });

  afterEach(async () => await app.close());
});
