import { MigrationInterface, QueryRunner } from 'typeorm';

export class projectsTypes1650724112695 implements MigrationInterface {
  public async down(): Promise<void> {
    return;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists project_types (
        _id                      uuid default uuid_generate_v4(),
        name                     varchar not null,
        primary key (_id)
      );
    `);
  }
}
