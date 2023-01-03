import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { QueryHelper } from '../../shared/helper/index.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginationQueryDto } from './dto/user-pagination-query.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly companyService: CompanyService) {}

  async findById(companyId: number, id: number) {
    await this.companyService.findById(companyId);

    const user = Number.isInteger(id) && (await this.userRepository.findFirst({ companyId, id }));

    if (user) return user;

    throw new NotFoundException(`No such user with id '${id}' for company with id '${companyId}'`);
  }

  async findByEmail(companyId: number, email: string, id?: number) {
    const { id: userId } = (await this.userRepository.findFirst({ companyId, email })) || {};

    if (userId && userId !== id)
      throw new ConflictException(`Email address '${email}' is already in use for company with id '${companyId}'`);
  }

  async findAll(companyId: number, query: UserPaginationQueryDto) {
    await this.companyService.findById(companyId);

    const { page, perPage, isAdmin } = query;
    const pagination = QueryHelper.getPaginationQuery(page, perPage);

    const [total, records] = await this.userRepository.findAll(pagination, { isAdmin, companyId });

    return { total, ...QueryHelper.getPaginationResponse(page, pagination.take, total), records };
  }

  async create(companyId: number, body: CreateUserDto) {
    await this.companyService.findById(companyId);
    await this.findByEmail(companyId, body.email);

    return await this.userRepository.create({ ...body, companyId });
  }

  async update(companyId: number, id: number, body: UpdateUserDto) {
    const { email } = (await this.findById(companyId, id)) || {};
    await this.findByEmail(companyId, body.email ?? email, id);

    return await this.userRepository.update({ id }, body);
  }

  async delete(companyId: number, id: number) {
    await this.findById(companyId, id);

    return await this.userRepository.delete({ id });
  }
}
