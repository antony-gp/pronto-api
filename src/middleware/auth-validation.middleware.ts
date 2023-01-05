import { Injectable, NestMiddleware, UnprocessableEntityException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { AuthCredentialsDto } from '../auth/dto/auth-creadentials.dto';

@Injectable()
export class AuthValidationMiddleware implements NestMiddleware {
  async use({ body }: Request, _res: Response, next: NextFunction) {
    const credentials = new AuthCredentialsDto(body['email'], body['password']);

    const errors = (await validate(credentials))
      ?.map((validationError) => Object.values(validationError.constraints))
      .flat();

    if (errors.length) throw new UnprocessableEntityException(errors);

    next();
  }
}
