import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1650722777753 implements MigrationInterface {
  public async down(): Promise<void> {
    return;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists users (
        _id                      uuid default uuid_generate_v4(),
        created_at               timestamptz not null default (now() at time zone 'utc'),
        email                    varchar not null,
        full_name                varchar not null,
        password                 varchar,
        updated_at               timestamptz not null default (now() at time zone 'utc'),
        user_name                varchar not null,
        primary key (_id),
        unique(email)
      );
    `);

    await queryRunner.query(`create index index_users_email on users (email);`);

    await queryRunner.query(`
      create trigger trigger_user_updated_at_timestamp
      before update on users
      for each row
      execute procedure trigger_updated_at_timestamp();
    `);
  }
}
