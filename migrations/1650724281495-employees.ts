import { MigrationInterface, QueryRunner } from 'typeorm';

export class projectsEmployees1650724281495 implements MigrationInterface {
  public async down(): Promise<void> {
    return;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists employees (
        _id                      uuid default uuid_generate_v4(),
        full_name                varchar not null,
        phone                    varchar not null,
        primary key (_id)
      );
    `);
  }
}
