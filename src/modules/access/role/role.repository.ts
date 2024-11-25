import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";

export class RoleRepository {
  constructor(
    @Inject("ROLE_REPOSITORY")
    private repository: Repository<Role>
  ) {}
}
