import { ProjectEmployeeDto } from '../../../employee/presentation/dtos';
import { ProjectClientDto } from '../../../project-client/presentation/dtos';
import { ProjectTypeDto } from '../../../project-type/presentation/dtos';

export class ProjectDto {
  readonly _id!: string;
  address: string;
  client?: ProjectClientDto;
  createdAt: Date;
  employees: ProjectEmployeeDto[];
  name: string;
  type?: ProjectTypeDto;
  updatedAt: Date;
  userId: string;

  constructor({ _id, address, client, createdAt, employees, name, type, updatedAt }: ProjectDto) {
    this._id = _id;
    this.address = address;
    this.client = client;
    this.createdAt = createdAt;
    this.employees = employees;
    this.name = name;
    this.type = type;
    this.updatedAt = updatedAt;
  }
}
