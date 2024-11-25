import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { RoleRepository } from "./role.repository";
import { DatabaseModule } from "src/database/database.module";
import { RoleProviders } from "./role.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [...RoleProviders, RoleService, RoleRepository],
  exports: [RoleRepository],
})
export class RoleModule {}
