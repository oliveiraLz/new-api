import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFuncionarioParada1733754462467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE transporte.funcionario_parada (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        funcionario_id UUID NOT NULL,
        parada_id UUID NOT NULL,
        horario_previsto TIME NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT pk_funcionario_parada PRIMARY KEY (id),
        CONSTRAINT fk_funcionario_parada_funcionario FOREIGN KEY (funcionario_id) REFERENCES cadastro.funcionario (id) ON DELETE CASCADE,
        CONSTRAINT fk_funcionario_parada_parada FOREIGN KEY (parada_id) REFERENCES transporte.parada (id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS transporte.funcionario_parada;
    `);
  }
}
