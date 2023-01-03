import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserParamsDto } from './dto/user-params.dto';
import { UserPaginationQueryDto } from './dto/user-pagination-query.dto';

@Controller('companies/:companyId/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Param() params: UserParamsDto, @Body() body: CreateUserDto) {
    return await this.userService.create(params.companyId, body);
  }

  @Get()
  async findAll(@Param() params: UserParamsDto, @Query() query: UserPaginationQueryDto) {
    return await this.userService.findAll(params.companyId, query);
  }

  @Get(':id')
  async findById(@Param() params: UserParamsDto) {
    return await this.userService.findById(params.companyId, params.id);
  }

  @Patch(':id')
  async update(@Param() params: UserParamsDto, @Body() body: UpdateUserDto) {
    return await this.userService.update(params.companyId, params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: UserParamsDto) {
    return await this.userService.delete(params.companyId, params.id);
  }
}
