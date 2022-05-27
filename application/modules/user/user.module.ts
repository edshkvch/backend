import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity, RoleRepository, UserEntity, UserRepository } from './infrastructure';
import { UserController } from './presentation';

@Module({
  controllers: [UserController],
  exports: [RoleRepository, UserRepository],
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  providers: [RoleRepository, UserRepository],
})
export class UserModule {}
