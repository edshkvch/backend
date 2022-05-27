import { Injectable } from '@nestjs/common';
import { InjectRepository as InjectEntity } from '@nestjs/typeorm';
import { Repository as Entity } from 'typeorm';

import { Repository } from '@libs/postgresql';

import { RoleEntity } from '../entities';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(@InjectEntity(RoleEntity) private readonly roleEntity: Entity<RoleEntity>) {
    super(roleEntity, { baseClass: RoleEntity });
  }
}
