import { Get, Controller, Put, Delete, Post, Query, Body, Param, UseGuards } from '@nestjs/common';

import { AuthGuard, Roles, Role } from '@libs/auth';

import { ProjectTypeRepository } from '../infrastructure';

@Controller('/api/project-types')
@UseGuards(AuthGuard)
export class ProjectTypeController {
  constructor(private readonly projectTypeRepository: ProjectTypeRepository) {}

  @Post('/')
  @Roles(Role.admin)
  public async createProjectType(@Body() { name }) {
    const data = await this.projectTypeRepository.create({ name });

    return { data };
  }

  @Delete('/')
  @Roles(Role.admin)
  public async deleteProjectTypeByIds(@Query() { projectTypeIds }) {
    await this.projectTypeRepository.deleteByIds({ _id: projectTypeIds });
  }

  @Get('/')
  public async getProjectTypes() {
    const data = await this.projectTypeRepository.find();

    return { data };
  }

  @Put('/:projectId')
  @Roles(Role.admin)
  public async updateProjectTypeById(@Param() { projectId }, @Body() { name }) {
    const data = await this.projectTypeRepository.updateOneAndGet({ _id: projectId }, { name });

    return { data };
  }
}
