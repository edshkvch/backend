import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { AuthGuard, Roles, Role } from '@libs/auth';

import { ProjectClientRepository } from '../infrastructure';

@Controller('/api/projects-clients')
@UseGuards(AuthGuard)
export class ProjectClientController {
  constructor(private readonly projectClientRepository: ProjectClientRepository) {}

  @Post('/')
  @Roles(Role.admin)
  public async createClient(@Body() { email, fullName, organization }) {
    const data = await this.projectClientRepository.create({ email, fullName, organization });

    return { data };
  }

  @Delete('/')
  @Roles(Role.admin)
  public async deleteClientsByIds(@Query() { clientIds }) {
    const data = await this.projectClientRepository.deleteByIds({ _id: clientIds });

    return { data };
  }

  @Get('/')
  public async getClients() {
    const data = await this.projectClientRepository.find();

    return { data };
  }

  @Put('/:clientId')
  @Roles(Role.admin)
  public async updateClientById(@Param() { clientId }, @Body() { email, fullName, organization }) {
    const data = await this.projectClientRepository.updateOneAndGet({ _id: clientId }, { email, fullName, organization });

    return { data };
  }
}
