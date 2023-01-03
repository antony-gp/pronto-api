import { ClockType, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClockRepository {
  private readonly select: { id: boolean; datetime: boolean; type: boolean };

  constructor(private readonly prismaService: PrismaService) {
    this.select = { id: true, datetime: true, type: true };
  }

  async create(data: Prisma.ClockCreateInput) {
    return await this.prismaService.clock.create({ data, select: this.select });
  }

  async findAll(
    pagination: { skip: number; take: number },
    where: { userId: number; type: ClockType; datetime: Date | { lte: Date; gte: Date } },
  ) {
    return await this.prismaService.$transaction([
      this.prismaService.clock.count({ where }),
      this.prismaService.clock.findMany({ where, ...pagination, select: this.select }),
    ]);
  }

  async findFirst(where: Prisma.ClockWhereInput) {
    return await this.prismaService.clock.findFirst({ where, select: this.select });
  }

  async delete(where: Prisma.ClockWhereUniqueInput) {
    await this.prismaService.clock.delete({ where });
  }
}
