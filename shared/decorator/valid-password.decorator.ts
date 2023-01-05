import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidPasswordConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsValidPassword' })
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
  private message: string;

  validate(value: any = '') {
    const messages = [];

    if (!/^(?=.*([A-Z]){1,}).*$/.test(value)) messages.push('uppercase');

    if (!/^(?=.*([a-z]){1,}).*$/.test(value)) messages.push('lowercase');

    if (!/^(?=.*(\d){1,}).*$/.test(value)) messages.push('numeric');

    if (!/^(?=.*([!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]){1,}).*$/.test(value)) messages.push('special');

    this.message = ` must contain at least one ${messages.join(', ').replace(/\,([^\,]*)$/, ' and$1')} character${
      messages.length > 1 ? 's' : ''
    }`;

    return !messages.length;
  }

  defaultMessage(args: ValidationArguments) {
    return args.property + this.message;
  }
}
