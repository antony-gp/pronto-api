import { Type } from 'class-transformer';
import { IsDefined, IsOptional, IsInt } from 'class-validator';

export class UserParamsDto {
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  companyId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number;
}
