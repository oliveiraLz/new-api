import { DataSource } from "typeorm";
import { Funcionario } from "./entities/funcionario.entity";

export const FuncionarioProviders = [
  {
    provide: "FUNCIONARIO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Funcionario),
    inject: ["DATA_SOURCE"],
  },
];
