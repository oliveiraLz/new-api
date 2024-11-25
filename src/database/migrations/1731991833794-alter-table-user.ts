import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUser1731991833794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE acesso.user
      ADD COLUMN pessoa_id uuid NOT NULL,
      ADD CONSTRAINT fk_user_pessoa FOREIGN KEY (pessoa_id) REFERENCES cadastro.pessoa (id) ON DELETE CASCADE,
      DROP COLUMN name;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE acesso.user
      ADD COLUMN name VARCHAR NOT NULL,
      DROP COLUMN pessoa_id,
      DROP CONSTRAINT fk_user_pessoa;
    `);
  }
}
