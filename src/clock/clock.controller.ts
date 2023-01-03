import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ClockService } from './clock.service';
import { CreateClockDto } from './dto/create-clock.dto';
import { ClockParamsDto } from './dto/clock-params.dto';
import { ClockPaginationQueryDto } from './dto/clock-pagination-query.dto';

@Controller('companies/:companyId/users/:userId/clocks')
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  @Post()
  async create(@Param() params: ClockParamsDto, @Body() body: CreateClockDto) {
    return await this.clockService.create(params.companyId, params.userId, body);
  }

  @Get()
  async findAll(@Param() params: ClockParamsDto, @Query() query: ClockPaginationQueryDto) {
    return await this.clockService.findAll(params.companyId, params.userId, query);
  }

  @Get(':id')
  async findById(@Param() params: ClockParamsDto) {
    return await this.clockService.findById(params.companyId, params.userId, params.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: ClockParamsDto) {
    return await this.clockService.delete(params.companyId, params.userId, params.id);
  }
}
