import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employees' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly _id!: string;

  @Column('varchar', { name: 'full_name', nullable: false })
  fullName: string;

  @Column('varchar', { nullable: false })
  phone: string;
}
