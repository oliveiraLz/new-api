import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Base } from "../../../../common/base.entity";
import { Pessoa } from "../../pessoa/entities/pessoa.entity";

@Entity({ schema: "cadastro", name: "endereco" })
export class Endereco extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.id, { nullable: false })
  @JoinColumn({ name: "pessoa_id" })
  pessoa: Pessoa;

  @ApiProperty()
  @Column({ type: "varchar" })
  logradouro: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  numero: string;

  @ApiProperty()
  @Column({ type: "varchar", nullable: true })
  complemento: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  bairro: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  cidade: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 2 })
  estado: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  cep: string;

  @ApiProperty()
  @Column({ type: "varchar", nullable: true })
  referencia: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  zona: string;

  @ApiProperty()
  @Column({ type: "double precision", nullable: true })
  latitude: number;

  @ApiProperty()
  @Column({ type: "double precision", nullable: true })
  longitude: number;
}
