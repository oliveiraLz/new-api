import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableEndereco1731991481430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE cadastro.endereco (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            pessoa_id uuid NOT NULL,
            logradouro VARCHAR NOT NULL,
            numero VARCHAR NOT NULL,
            complemento VARCHAR,
            bairro VARCHAR NOT NULL,
            cidade VARCHAR NOT NULL,
            estado VARCHAR(2) NOT NULL,
            cep VARCHAR NOT NULL,
            referencia VARCHAR NULL,
            zona VARCHAR NOT NULL,
            -- latitude DOUBLE PRECISION,
            -- longitude DOUBLE PRECISION,
            ativo BOOLEAN,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            updated_at TIMESTAMP NOT NULL DEFAULT now(),
            deleted_at TIMESTAMP NULL,
            CONSTRAINT pk_endereco PRIMARY KEY (id),
            CONSTRAINT fk_endereco_pessoa FOREIGN KEY (pessoa_id) REFERENCES cadastro.pessoa (id) ON DELETE CASCADE
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE acesso.endereco;`);
  }
}
