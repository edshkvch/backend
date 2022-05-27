import { Injectable } from '@nestjs/common';
import { InjectRepository as InjectEntity } from '@nestjs/typeorm';
import { Repository as Entity } from 'typeorm';

import { Repository } from '@libs/postgresql';

import { ProjectTypeEntity } from '../entities';

@Injectable()
export class ProjectTypeRepository extends Repository<ProjectTypeEntity> {
  constructor(@InjectEntity(ProjectTypeEntity) private readonly projectTypeEntity: Entity<ProjectTypeEntity>) {
    super(projectTypeEntity, { baseClass: ProjectTypeEntity });
  }
}
