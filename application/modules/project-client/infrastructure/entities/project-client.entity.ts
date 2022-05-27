import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'project_clients' })
export class ProjectClientEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly _id!: string;

  @Column('varchar', { nullable: false })
  email: string;

  @Column('varchar', { name: 'full_name', nullable: false })
  fullName: string;

  @Column('varchar', { nullable: false })
  organization: string;
}
