import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../shared/dto/pagination-query.dto';
import { CompanyService } from './company.service';
import { CompanyParamsDto } from './dto/company-params.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() body: CreateCompanyDto) {
    return await this.companyService.create(body);
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.companyService.findAll(query);
  }

  @Get(':id')
  async findById(@Param() params: CompanyParamsDto) {
    return await this.companyService.findById(params.id);
  }

  @Patch(':id')
  async update(@Param() params: CompanyParamsDto, @Body() body: UpdateCompanyDto) {
    return await this.companyService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: CompanyParamsDto) {
    return await this.companyService.delete(params.id);
  }
}
