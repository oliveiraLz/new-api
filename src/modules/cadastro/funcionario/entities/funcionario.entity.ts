import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Base } from "src/common/base.entity";
import { Pessoa } from "../../pessoa/entities/pessoa.entity";

@Entity({ schema: "cadastro", name: "funcionario" })
export class Funcionario extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.id, { nullable: false })
  @JoinColumn({ name: "pessoa_id" })
  pessoa: Pessoa;

  @ApiProperty()
  @Column({ type: "varchar" })
  matricula: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  status: string;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
