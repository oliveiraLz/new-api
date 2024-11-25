import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Base } from "../../../../common/base.entity";

@Entity({ schema: "cadastro", name: "pessoa" })
export class Pessoa extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  nome: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 11 })
  cpf: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  telefone: string;

  @ApiProperty()
  @Column({ type: "varchar", length: 20 })
  rg: string;

  @ApiProperty()
  @Column({ type: "date" })
  dt_nascimento: Date;

  @ApiProperty()
  @Column({ type: "text", nullable: true })
  foto: string;
}
