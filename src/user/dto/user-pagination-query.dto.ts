import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';

export class UserPaginationQueryDto extends PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => (['true', 'false'].includes(value) ? value === 'true' : value))
  @IsBoolean()
  isAdmin?: boolean | undefined;
}
