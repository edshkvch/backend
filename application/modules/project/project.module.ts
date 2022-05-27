import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectEntity, ProjectRepository } from './infrastructure';
import { ProjectController } from './presentation';

@Module({
  controllers: [ProjectController],
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectRepository],
})
export class ProjectModule {}
