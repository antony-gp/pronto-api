import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsSameOrAfter(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsSameOrAfterConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsSameOrAfter' })
export class IsSameOrAfterConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return !relatedValue || value >= relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    return args.property + ' must be the same or after than ' + args.constraints[0];
  }
}
