import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/access/auth/auth.module";
import { UserModule } from "./modules/access/user/user.module";
import { PessoaModule } from "./modules/cadastro/pessoa/pessoa.module";
import { EnderecoModule } from "./modules/cadastro/endereco/endereco.module";
import { FuncionarioModule } from './modules/cadastro/funcionario/funcionario.module';
@Module({
  imports: [UserModule, AuthModule, PessoaModule, EnderecoModule, FuncionarioModule],
})
export class AppModule {}
