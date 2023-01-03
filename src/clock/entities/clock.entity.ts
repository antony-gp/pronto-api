import { ClockType } from '@prisma/client';

export class Clock {
  id: number;
  datetime: Date;
  type: ClockType;
}
