import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePessoa1731991462183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE SCHEMA IF NOT EXISTS cadastro;

          CREATE TABLE cadastro.pessoa (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            nome VARCHAR NOT NULL,
            cpf VARCHAR(11) NOT NULL UNIQUE,
            telefone VARCHAR NOT NULL,
            rg VARCHAR(20) NOT NULL,
            dt_nascimento DATE NOT NULL,
            foto TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            updated_at TIMESTAMP NOT NULL DEFAULT now(),
            deleted_at TIMESTAMP,
            CONSTRAINT pk_pessoa PRIMARY KEY (id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE cadastro.pessoa;`);
  }
}
