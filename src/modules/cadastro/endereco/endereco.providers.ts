import { DataSource } from "typeorm";
import { Endereco } from "./entities/endereco.entity";

export const EnderecoProviders = [
  {
    provide: "ENDERECO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Endereco),
    inject: ["DATA_SOURCE"],
  },
];
