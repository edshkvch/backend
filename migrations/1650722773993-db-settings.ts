import { MigrationInterface, QueryRunner } from 'typeorm';

export class dbSettings1650722773993 implements MigrationInterface {
  public async down(): Promise<void> {
    return;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create extension if not exists "uuid-ossp";`);
    await queryRunner.query(`
      create or replace function trigger_updated_at_timestamp()
      returns trigger as $$
      begin
        new.updated_at = (now() at time zone 'utc');
        return new;
      end;
      $$ language plpgsql; 
    `);
  }
}
