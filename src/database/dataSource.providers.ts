import { DataSource } from "typeorm";

export const dataSourceProviders = [
  {
    provide: "DATA_SOURCE_INJECTION",
    useFactory: (dataSource: DataSource) => dataSource,
    inject: ["DATA_SOURCE"],
  },
];
