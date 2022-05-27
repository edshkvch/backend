import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProjectEntity } from '../../../project/infrastructure';

import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly _id!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column('varchar', { nullable: false })
  email: string;

  @Column('varchar', { name: 'full_name', nullable: false })
  fullName: string;

  @Column('varchar', { nullable: false })
  password: string;

  @OneToMany(() => ProjectEntity, (project: ProjectEntity) => project.user, {
    cascade: true,
    eager: true,
  })
  projects: ProjectEntity[];

  @ManyToMany(() => RoleEntity, { eager: true })
  @JoinTable({
    inverseJoinColumn: { name: 'role_id', referencedColumnName: '_id' },
    joinColumn: { name: 'user_id', referencedColumnName: '_id' },
    name: 'users_roles',
  })
  roles: RoleEntity[];

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'user_name', nullable: false })
  userName: string;
}
