import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

export class PaginationQueryDto {
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  page = 1;

  @IsDefined()
  @Type(() => Number)
  @IsInt()
  perPage = 50;
}
