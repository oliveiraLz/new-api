import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../role/entities/role.entity";
import { Base } from "../../../../common/base.entity";
import { Pessoa } from "../../../../modules/cadastro/pessoa/entities/pessoa.entity";

@Entity({ schema: "acesso", name: "user" })
export class User extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  email: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  password: string;

  @ApiProperty()
  @Column({ type: "boolean", default: false })
  is_super: boolean;

  @ManyToOne(() => Pessoa, { nullable: false })
  @JoinColumn({ name: "pessoa_id" })
  pessoa: Pessoa;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: "user_roles",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  roles: Role[];
}
