import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import userService from '../services/user-service';

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const user = await userService.findByUsername(value);
          return user ? false : true;
        },
        defaultMessage(ValidationArguments?: ValidationArguments) {
          return 'Username must be unique';
        },
      },
    });
  };
}
