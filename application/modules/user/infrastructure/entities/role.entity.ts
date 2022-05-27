import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '@libs/auth';

import { UserEntity } from './user.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly _id!: string;

  @Column('varchar', { nullable: false, unique: true })
  role: Role;

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.roles)
  users?: UserEntity[];
}
