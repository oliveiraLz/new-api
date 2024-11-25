import { Module } from "@nestjs/common";
import { PessoaService } from "./pessoa.service";
import { PessoaController } from "./pessoa.controller";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "src/modules/access/auth/auth.module";
import { PessoaProviders } from "./pessoa.providers";
import { PessoaRepository } from "./pessoa.repository";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [PessoaController],
  providers: [...PessoaProviders, PessoaService, PessoaRepository],
  exports: [PessoaRepository],
})
export class PessoaModule {}
