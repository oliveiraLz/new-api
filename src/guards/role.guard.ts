import { Injectable, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AvailableRoles } from "../enums/availableRoles.enum";

@Injectable()
export class RoleGuard {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<AvailableRoles[]>("roles", context.getHandler());

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ForbiddenException("Token não encontrado");
    }

    const payload = this.jwtService.verify(token);

    if (!payload || !payload.roles) {
      throw new ForbiddenException("Roles não encontradas no token");
    }

    const hasRole = requiredRoles.some((role) => payload.roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException("Você não tem permissão para acessar esta rota");
    }

    return true;
  }
}
