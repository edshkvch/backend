import { Get, Controller, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';

import { AuthGuard, CurrentUser, CurrentUserArgs, Roles, Role } from '@libs/auth';

import { ProjectRepository } from '../infrastructure';

import { ProjectDto } from './dtos';

@Controller('/api/projects')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectRepository: ProjectRepository) {}

  @Post('/:projectId/employees')
  @Roles(Role.admin)
  public async addEmployeeToProject(@Body() { employeeId }, @Param() { projectId }) {
    const data = await this.projectRepository.addEmployeeToProject({ employeeId, projectId });

    return { data: new ProjectDto(data) };
  }

  @Post('/')
  @Roles(Role.admin)
  public async createProject(@Body() { address, name }, @CurrentUserArgs() { userId }: CurrentUser) {
    const data = await this.projectRepository.create({ address, name, userId });

    return { data: new ProjectDto(data) };
  }

  @Delete('/:projectId/employees')
  @Roles(Role.admin)
  public async deleteEmployeeFromProject(@Query() { employeeId }, @Param() { projectId }) {
    await this.projectRepository.removeEmployeeFromProject({ employeeId, projectId });
  }

  @Delete('/')
  @Roles(Role.admin)
  public async deleteProjectByIds(@Query() { projectIds }) {
    await this.projectRepository.deleteByIds({ _id: projectIds });
  }

  @Get('/')
  public async getProjects() {
    const data = await this.projectRepository.find();

    return { data: data.map((_) => new ProjectDto(_)) };
  }

  @Put('/:projectId')
  @Roles(Role.admin)
  public async updateProjectById(@Param() { projectId }, @Body() { address, clientId, name, typeId }) {
    const data = await this.projectRepository.updateOneAndGet({ _id: projectId }, { address, clientId, name, typeId });

    return { data: new ProjectDto(data) };
  }
}
