import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [JwtModule.register({})],
  providers: [
    {
      provide: "AUTH_GUARD",
      useClass: AuthGuard,
    },
  ],
  exports: [
    {
      provide: "AUTH_GUARD",
      useClass: AuthGuard,
    },
  ],
})
export class GuardsModule {}
