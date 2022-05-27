import { Injectable } from '@nestjs/common';
import { InjectRepository as InjectEntity } from '@nestjs/typeorm';
import { Repository as Entity } from 'typeorm';

import { removeUndefinedValue, Repository } from '@libs/postgresql';

import { UserEntity } from '../entities';

import { AddRoleToUserParameters, GetUserRolesByUserIdParameters, UpdateUserByIdParameters } from './user-repository.type';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@InjectEntity(UserEntity) private readonly userEntity: Entity<UserEntity>) {
    super(userEntity, { baseClass: UserEntity });
  }

  public async addRoleToUser({ roleId, userId }: AddRoleToUserParameters) {
    await this.userEntity.createQueryBuilder().relation(UserEntity, 'roles').of({ _id: userId }).add({ _id: roleId });

    return this.findOne({ _id: userId });
  }

  public async getUserRolesByUserId({ userId }: GetUserRolesByUserIdParameters) {
    return this.userEntity.createQueryBuilder().relation(UserEntity, 'roles').of({ _id: userId }).loadMany();
  }

  public async updateUserById({ email, fullName, userId, userName }: UpdateUserByIdParameters) {
    await this.updateOne(
      { _id: userId },
      removeUndefinedValue({
        email,
        fullName,
        userName,
      }),
    );

    return this.findOne({ email });
  }
}
