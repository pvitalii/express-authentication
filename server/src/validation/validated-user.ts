import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from './unique-decorator';

export class ValidatedUser {
  @IsString()
  @IsUnique()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
