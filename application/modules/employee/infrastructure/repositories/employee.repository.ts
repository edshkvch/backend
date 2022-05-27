import { Injectable } from '@nestjs/common';
import { InjectRepository as InjectEntity } from '@nestjs/typeorm';
import { Repository as Entity } from 'typeorm';

import { Repository } from '@libs/postgresql';

import { EmployeeEntity } from '../entities';

@Injectable()
export class EmployeeRepository extends Repository<EmployeeEntity> {
  constructor(@InjectEntity(EmployeeEntity) private readonly employeeEntity: Entity<EmployeeEntity>) {
    super(employeeEntity, { baseClass: EmployeeEntity });
  }
}
