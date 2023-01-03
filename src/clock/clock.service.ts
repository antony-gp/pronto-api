import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { QueryHelper } from '../../shared/helper/index.helper';
import { CreateClockDto } from './dto/create-clock.dto';
import { ClockRepository } from './clock.repository';
import { ClockPaginationQueryDto } from './dto/clock-pagination-query.dto';
import { ClockType } from '@prisma/client';
import { DateHelper } from '../../shared/helper/index.helper';
import { Clock } from './entities/clock.entity';

@Injectable()
export class ClockService {
  constructor(private readonly clockRepository: ClockRepository, private readonly userService: UserService) {}

  async findById(companyId: number, userId: number, id: number) {
    await this.userService.findById(companyId, userId);

    const clock = await this.clockRepository.findFirst({ userId, id });

    if (clock) return this.buildResponse(clock);

    throw new NotFoundException(`No such clock with id '${id}' for user with id '${userId}'`);
  }

  async findByClock(userId: number, datetime: Date, type: ClockType) {
    if (await this.clockRepository.findFirst({ userId, datetime, type }))
      throw new ConflictException(
        `E${type.slice(1)} clock at ${DateHelper.stringify(
          datetime,
        )} has already been registered for user with id '${userId}'`,
      );
  }

  async findAll(companyId: number, userId: number, query: ClockPaginationQueryDto) {
    await this.userService.findById(companyId, userId);

    const { page, perPage, minDate, maxDate, type } = query;

    const pagination = QueryHelper.getPaginationQuery(page, perPage);

    const [total, records] = await this.clockRepository.findAll(pagination, {
      datetime: {
        ...(maxDate && { lte: maxDate }),
        ...(minDate && { gte: minDate }),
      },
      type,
      userId,
    });

    return {
      total,
      ...QueryHelper.getPaginationResponse(page, pagination.take, total),
      records: records.map((record) => this.buildResponse(record)),
    };
  }

  async create(companyId: number, userId: number, body: CreateClockDto) {
    await this.userService.findById(companyId, userId);

    body.datetime ||= new Date();

    await this.findByClock(userId, body.datetime, body.type);

    return this.buildResponse(await this.clockRepository.create({ ...body, userId }));
  }

  async delete(companyId: number, userId: number, id: number) {
    await this.findById(companyId, userId, id);

    return await this.clockRepository.delete({ id });
  }

  buildResponse(clock: Clock) {
    return { ...clock, datetime: DateHelper.stringify(clock.datetime) };
  }
}
