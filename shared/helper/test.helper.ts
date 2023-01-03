import { HttpStatus, ModuleMetadata, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

export class TestHelper {
  static async buildApplication(moduleMetadata: ModuleMetadata) {
    const moduleFixture: TestingModule = await Test.createTestingModule(moduleMetadata).compile();

    const application = moduleFixture.createNestApplication();

    application.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
      }),
    );

    return application;
  }
}
