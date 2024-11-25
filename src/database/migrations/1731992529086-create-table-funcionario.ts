import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFuncionario1731992529086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE cadastro.funcionario (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        pessoa_id UUID NOT NULL,
        matricula VARCHAR NOT NULL UNIQUE,
        status VARCHAR NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now(),
        deleted_at TIMESTAMP,
        CONSTRAINT pk_funcionario PRIMARY KEY (id),
        CONSTRAINT fk_funcionario_pessoa FOREIGN KEY (pessoa_id) REFERENCES cadastro.pessoa (id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE funcionario;`);
  }
}
