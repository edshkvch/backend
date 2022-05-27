import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectClientEntity, ProjectClientRepository } from './infrastructure';
import { ProjectClientController } from './presentation';

@Module({
  controllers: [ProjectClientController],
  imports: [TypeOrmModule.forFeature([ProjectClientEntity])],
  providers: [ProjectClientRepository],
})
export class ProjectClientModule {}
