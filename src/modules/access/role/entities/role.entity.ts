import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Base } from "../../../../common/base.entity";
import { User } from "../../user/entities/user.entity";

@Entity({ schema: "acesso", name: "role" })
export class Role extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  name: string;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
