import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRole1731971566006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE acesso.role (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now(),
        deleted_at TIMESTAMP,
        CONSTRAINT pk_role PRIMARY KEY (id),
        CONSTRAINT uq_role_name UNIQUE (name)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE acesso.role;`);
  }
}
