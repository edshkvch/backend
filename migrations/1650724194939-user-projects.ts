import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersProjects1650724194939 implements MigrationInterface {
  public async down(): Promise<void> {
    return;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists user_projects (
        _id                      uuid default uuid_generate_v4(),
        address                  varchar not null,
        client_id                uuid,
        created_at               timestamptz not null default (now() at time zone 'utc'),
        name                     varchar not null,
        type_id                  uuid,
        updated_at               timestamptz not null default (now() at time zone 'utc'),
        user_id                  uuid not null,
        primary key (_id),
        foreign key (client_id) references project_clients(_id),
        foreign key (type_id) references project_types(_id),
        foreign key (user_id) references users(_id) on delete cascade
      );
    `);

    await queryRunner.query(`
      create trigger trigger_user_project_updated_at_timestamp
      before update on user_projects
      for each row
      execute procedure trigger_updated_at_timestamp();
    `);
  }
}
