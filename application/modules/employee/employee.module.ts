import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeEntity, EmployeeRepository } from './infrastructure';
import { EmployeeController } from './presentation';

@Module({
  controllers: [EmployeeController],
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  providers: [EmployeeRepository],
})
export class EmployeeModule {}
