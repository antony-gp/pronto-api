import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaModule } from '../src/prisma/prisma.module';
import { ClockModule } from '../src/clock/clock.module';
import { TestHelper } from '../shared/helper/index.helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await TestHelper.buildApplication({
      imports: [PrismaModule, ClockModule],
    });

    await app.init();
  });

  it('/companies/:companyId/users/:userId/clocks (GET)', () => {
    return request(app.getHttpServer()).get('/companies/1/users/1/clocks').expect(200);
  });

  afterEach(async () => await app.close());
});
