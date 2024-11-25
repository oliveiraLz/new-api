import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AvailableRoles } from "../enums/availableRoles.enum";
import { IS_PUBLIC_KEY } from "../decorators/is-public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Token não encontrado");
    }

    try {
      const payload = this.jwtService.verify(token) as { userId: string; username: string; roles: AvailableRoles[] };
      request.user = payload;

      const requiredRoles = this.reflector.get<AvailableRoles[]>("roles", context.getHandler());
      if (requiredRoles) {
        const hasRole = requiredRoles.some((role) => payload.roles.includes(role));
        if (!hasRole) {
          throw new UnauthorizedException("Você não tem permissão para acessar esta rota");
        }
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException("Token inválido");
    }
  }
}
