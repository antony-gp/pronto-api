import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.CompanyCreateInput) {
    return await this.prismaService.company.create({ data });
  }

  async findAll(pagination: { skip: number; take: number }) {
    return await this.prismaService.$transaction([
      this.prismaService.company.count(),
      this.prismaService.company.findMany({ ...pagination }),
    ]);
  }

  async findFirst(where: Prisma.CompanyWhereInput) {
    return await this.prismaService.company.findFirst({ where });
  }

  async update(where: Prisma.CompanyWhereUniqueInput, data: Prisma.CompanyUpdateInput) {
    return await this.prismaService.company.update({ where, data });
  }

  async delete(where: Prisma.CompanyWhereUniqueInput) {
    await this.prismaService.company.delete({ where });
  }
}
