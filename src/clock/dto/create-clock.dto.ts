import { ClockType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDate, IsDefined, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DateHelper } from '../../../shared/helper/index.helper';

export class CreateClockDto {
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => DateHelper.parse(value))
  @IsDate({ message: "datetime must be a valid date string in 'YYYY-MM-DD HH:mm:ss.SSS' format" })
  datetime: Date;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(ClockType))
  type: ClockType;
}
