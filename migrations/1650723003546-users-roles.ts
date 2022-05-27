import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersRoles1650723003546 implements MigrationInterface {
  public async down(): Promise<void> {
    return;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists roles (
        _id                      uuid default uuid_generate_v4(),
        role                     varchar not null,
        unique(role),
        primary key (_id)
      );
    `);

    await queryRunner.query(`insert into roles (role) values ('user'), ('admin');`);

    await queryRunner.query(`
      create table if not exists users_roles (
        role_id                  uuid not null,
        user_id                  uuid not null,
        primary key (user_id, role_id),
        foreign key (user_id) references users(_id) on delete cascade,
        foreign key (role_id) references roles(_id)
      );
    `);
  }
}
