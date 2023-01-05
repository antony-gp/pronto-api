import { IsEmail, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
