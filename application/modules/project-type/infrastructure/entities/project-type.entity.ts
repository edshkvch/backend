import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'project_types' })
export class ProjectTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly _id!: string;

  @Column('varchar', { nullable: false })
  name: string;
}
