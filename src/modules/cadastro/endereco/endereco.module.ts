import { Module } from "@nestjs/common";
import { EnderecoService } from "./endereco.service";
import { EnderecoController } from "./endereco.controller";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "src/modules/access/auth/auth.module";
import { EnderecoProviders } from "./endereco.providers";
import { EnderecoRepository } from "./endereco.repository";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [EnderecoController],
  providers: [...EnderecoProviders, EnderecoService, EnderecoRepository],
  exports: [EnderecoRepository],
})
export class EnderecoModule {}
