import { Injectable } from '@nestjs/common';
import { InjectRepository as InjectEntity } from '@nestjs/typeorm';
import { Repository as Entity } from 'typeorm';

import { Repository } from '@libs/postgresql';

import { ProjectClientEntity } from '../entities';

@Injectable()
export class ProjectClientRepository extends Repository<ProjectClientEntity> {
  constructor(@InjectEntity(ProjectClientEntity) private readonly projectClientEntity: Entity<ProjectClientEntity>) {
    super(projectClientEntity, { baseClass: ProjectClientEntity });
  }
}
