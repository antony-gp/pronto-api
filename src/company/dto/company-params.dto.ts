import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

export class CompanyParamsDto {
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  id: number;
}
