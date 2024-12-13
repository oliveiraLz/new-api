import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRota1733754440090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS transporte;

      CREATE TABLE transporte.rota (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        nome VARCHAR NOT NULL,
        ativo BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now(),
        deleted_at TIMESTAMP,
        CONSTRAINT pk_rota PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS transporte.rota;
    `);
  }
}
