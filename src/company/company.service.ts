import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../shared/dto/pagination-query.dto';
import { QueryHelper } from '../../shared/helper/index.helper';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) { }

  async findById(id: number) {
    const company = await this.companyRepository.findFirst({ id });

    if (company) return company;

    throw new NotFoundException(`No such company with id '${id}'`);
  }

  async findByEmail(email: string, id?: number) {
    const { id: companyId } = (await this.companyRepository.findFirst({ email })) || {};

    if (companyId && companyId !== id) throw new ConflictException(`Email address '${email}' is already in use`);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, perPage } = query;
    const pagination = QueryHelper.getPaginationQuery(page, perPage);

    const [total, records] = await this.companyRepository.findAll(pagination);

    return { total, ...QueryHelper.getPaginationResponse(page, pagination.take, total), records };
  }

  async create(body: CreateCompanyDto) {
    await this.findByEmail(body.email);

    return await this.companyRepository.create(body);
  }

  async update(id: number, body: UpdateCompanyDto) {
    await this.findById(id);
    await this.findByEmail(body.email, id);

    return await this.companyRepository.update({ id }, body);
  }

  async delete(id: number) {
    await this.findById(id);

    return await this.companyRepository.delete({ id });
  }
}
