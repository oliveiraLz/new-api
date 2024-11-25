import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePreferencias1731992545386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE cadastro.preferencias (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        funcionario_id UUID NOT NULL,
        horario_preferencial_embarque TIME NOT NULL,
        horario_embarque_empresa TIME NOT NULL,
        observacoes TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now(),
        deleted_at TIMESTAMP,
        CONSTRAINT pk_preferencias PRIMARY KEY (id),
        CONSTRAINT fk_preferencias_funcionario FOREIGN KEY (funcionario_id) REFERENCES cadastro.funcionario (id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE preferencias;`);
  }
}
