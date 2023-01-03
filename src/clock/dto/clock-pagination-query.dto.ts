import { Transform } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { DateHelper } from '../../../shared/helper/index.helper';
import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';
import { IsSameOrAfter, IsSameOrBefore } from '../../../shared/decorator/index.decorator';
import { ClockType } from '@prisma/client';

export class ClockPaginationQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => DateHelper.parse(value, '00:00:00.000'))
  @IsDate({ message: "minDate must be a valid date string in 'YYYY-MM-DD' or 'YYYY-MM-DD HH:mm:ss.SSS' format" })
  @IsSameOrBefore('maxDate')
  minDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => DateHelper.parse(value, '23:59:59.999'))
  @IsDate({ message: "maxDate must be a valid date string in 'YYYY-MM-DD' or 'YYYY-MM-DD HH:mm:ss.SSS' format" })
  @IsSameOrAfter('minDate')
  maxDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(ClockType))
  type?: ClockType;
}
