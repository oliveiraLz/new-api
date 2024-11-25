import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablePessoa1732282722778 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE cadastro.pessoa
          ADD COLUMN endereco_ativo uuid,
          ADD CONSTRAINT fk_pessoa_endereco_ativo FOREIGN KEY (endereco_ativo) REFERENCES cadastro.endereco (id) ON DELETE SET NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE cadastro.pessoa
          DROP CONSTRAINT fk_pessoa_endereco_ativo,
          DROP COLUMN endereco_ativo;
        `);
  }
}
