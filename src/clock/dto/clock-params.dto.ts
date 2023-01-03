import { Type } from 'class-transformer';
import { IsDefined, IsOptional, IsInt } from 'class-validator';

export class ClockParamsDto {
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  companyId: number;

  @IsDefined()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number;
}
