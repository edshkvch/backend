import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectTypeEntity, ProjectTypeRepository } from './infrastructure';
import { ProjectTypeController } from './presentation';

@Module({
  controllers: [ProjectTypeController],
  imports: [TypeOrmModule.forFeature([ProjectTypeEntity])],
  providers: [ProjectTypeRepository],
})
export class ProjectTypeaModule {}
