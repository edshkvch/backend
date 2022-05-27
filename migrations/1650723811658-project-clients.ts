import { MigrationInterface, QueryRunner } from 'typeorm';

export class projectsClients1650723811658 implements MigrationInterface {
  public async down(): Promise<void> {
    return;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists project_clients (
        _id                      uuid default uuid_generate_v4(),
        email                    varchar not null,
        full_name                timestamptz not null default (now() at time zone 'utc'),
        organization             varchar not null,
        primary key (_id)
      );
    `);
  }
}
