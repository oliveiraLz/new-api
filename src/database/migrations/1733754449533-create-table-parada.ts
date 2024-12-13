import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableParada1733754449533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE transporte.parada (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        rota_id UUID NOT NULL,
        nome VARCHAR NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now(),
        deleted_at TIMESTAMP,
        CONSTRAINT pk_parada PRIMARY KEY (id),
        CONSTRAINT fk_parada_rota FOREIGN KEY (rota_id) REFERENCES transporte.rota (id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS transporte.parada;
    `);
  }
}
