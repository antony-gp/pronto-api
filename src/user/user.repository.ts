import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  private readonly select: { id: boolean; name: boolean; email: boolean; isAdmin: boolean };

  constructor(private readonly prismaService: PrismaService) {
    this.select = { id: true, name: true, email: true, isAdmin: true };
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({ data, select: this.select });
  }

  async findAll(pagination: { skip: number; take: number }, where: { companyId?: number; isAdmin?: boolean }) {
    return await this.prismaService.$transaction([
      this.prismaService.user.count({ where }),
      this.prismaService.user.findMany({ where, ...pagination, select: this.select }),
    ]);
  }

  async findFirst(where: Prisma.UserWhereInput) {
    return await this.prismaService.user.findFirst({ where, select: this.select });
  }

  async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return await this.prismaService.user.update({ where, data, select: this.select });
  }

  async delete(where: Prisma.UserWhereUniqueInput) {
    await this.prismaService.user.delete({ where, select: this.select });
  }
}
