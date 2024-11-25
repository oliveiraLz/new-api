import { Module } from "@nestjs/common";
import { FuncionarioService } from "./funcionario.service";
import { FuncionarioController } from "./funcionario.controller";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "src/modules/access/auth/auth.module";
import { FuncionarioRepository } from "./funcionario.repository";
import { FuncionarioProviders } from "./funcionario.providers";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [FuncionarioController],
  providers: [...FuncionarioProviders, FuncionarioService, FuncionarioRepository],
  exports: [FuncionarioRepository],
})
export class FuncionarioModule {}
