import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { AuthGuard, Roles, Role } from '@libs/auth';

import { EmployeeRepository } from '../infrastructure';

@Controller('/api/employees')
@UseGuards(AuthGuard)
export class EmployeeController {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  @Post('/')
  @Roles(Role.admin)
  public async createEmployee(@Body() { fullName, phone }) {
    const data = await this.employeeRepository.create({ fullName, phone });

    return { data };
  }

  @Delete('/')
  @Roles(Role.admin)
  public async deleteEmployeesByIds(@Query() { employeeIds }) {
    const data = await this.employeeRepository.deleteByIds({ _id: employeeIds });

    return { data };
  }

  @Get('/')
  public async getEmployees() {
    const data = await this.employeeRepository.find();

    return { data };
  }

  @Put('/:clientId')
  @Roles(Role.admin)
  public async updateEmployeeById(@Param() { employeeId }, @Body() { fullName, phone }) {
    const data = await this.employeeRepository.updateOneAndGet({ _id: employeeId }, { fullName, phone });

    return { data };
  }
}
