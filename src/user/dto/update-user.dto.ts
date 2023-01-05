import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IsValidPassword } from '../../../shared/decorator/index.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @IsValidPassword()
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  name: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}
