import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EmployeeEntity } from '../../../employee/infrastructure';
import { ProjectClientEntity } from '../../../project-client/infrastructure';
import { ProjectTypeEntity } from '../../../project-type/infrastructure';
import { UserEntity } from '../../../user/infrastructure';

@Entity({ name: 'user_projects' })
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly _id!: string;

  @Column('varchar', { nullable: false })
  address: string;

  @JoinColumn({ name: 'client_id', referencedColumnName: '_id' })
  @ManyToOne(() => ProjectClientEntity, { eager: true })
  client?: ProjectClientEntity;

  @Column('uuid', { name: 'client_id', nullable: true })
  clientId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => EmployeeEntity, { eager: true })
  @JoinTable({
    inverseJoinColumn: { name: 'employee_id', referencedColumnName: '_id' },
    joinColumn: { name: 'project_id', referencedColumnName: '_id' },
    name: 'projects_employees',
  })
  employees: EmployeeEntity[];

  @Column('varchar', { nullable: false })
  name: string;

  @JoinColumn({ name: 'type_id', referencedColumnName: '_id' })
  @ManyToOne(() => ProjectTypeEntity, { eager: true })
  type?: ProjectTypeEntity;

  @Column('uuid', { name: 'type_id', nullable: true })
  typeId: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @JoinColumn({ name: 'user_id', referencedColumnName: '_id' })
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.projects)
  user?: UserEntity[];

  @Column('uuid', { name: 'user_id', nullable: false })
  userId: string;
}
