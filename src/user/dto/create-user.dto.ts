import { IsBoolean, IsEmail, IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

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
