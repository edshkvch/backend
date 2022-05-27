import { Injectable } from '@nestjs/common';
import { InjectRepository as InjectEntity } from '@nestjs/typeorm';
import { Repository as Entity } from 'typeorm';

import { Repository } from '@libs/postgresql';

import { ProjectEntity } from '../entities';

@Injectable()
export class ProjectRepository extends Repository<ProjectEntity> {
  constructor(@InjectEntity(ProjectEntity) private readonly projectEntity: Entity<ProjectEntity>) {
    super(projectEntity, { baseClass: ProjectEntity });
  }

  public async addEmployeeToProject({ employeeId, projectId }) {
    await this.projectEntity
      .createQueryBuilder()
      .relation(ProjectEntity, 'employees')
      .of({ _id: projectId })
      .add({ _id: employeeId });

    return this.findOne({ _id: projectId });
  }

  public async removeEmployeeFromProject({ employeeId, projectId }) {
    await this.projectEntity
      .createQueryBuilder()
      .relation(ProjectEntity, 'employees')
      .of({ _id: projectId })
      .remove({ _id: employeeId });
  }
}
