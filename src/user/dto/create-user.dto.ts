import { IsBoolean, IsEmail, IsDefined, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsValidPassword } from '../../../shared/decorator/index.decorator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsValidPassword()
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;
}
