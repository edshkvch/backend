import { MigrationInterface, QueryRunner } from 'typeorm';

export class projectsEmployees1650755840796 implements MigrationInterface {
  public async down(): Promise<void> {
    return;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists projects_employees (
        employee_id              uuid not null,
        project_id               uuid not null,
        primary key (project_id, employee_id),
        foreign key (project_id) references user_projects(_id) on delete cascade,
        foreign key (employee_id) references employees(_id)
      );
    `);
  }
}
