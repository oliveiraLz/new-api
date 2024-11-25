import { Controller, Post, Body, Param, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/LoginDto.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";
import { AvailableRoles } from "../../../enums/availableRoles.enum";
import { AuthGuard } from "../../../guards/auth.guard";
import { IsPublic } from "../../../decorators/is-public.decorator";
import { Roles } from "../../../decorators/role.decorator";

@Controller("auth")
@ApiTags("Auth")
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @IsPublic()
  @ApiOperation({ summary: "Realiza login e retorna o token de acesso" })
  @ApiResponse({ status: 200, description: "Login realizado com sucesso" })
  @ApiResponse({ status: 401, description: "Email ou senha inválidos" })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("update-password/:userId")
  @Roles(AvailableRoles.RH_WRITE)
  @ApiOperation({ summary: "Atualiza a senha de um usuário específico" })
  @ApiResponse({ status: 200, description: "Senha atualizada com sucesso" })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  @ApiResponse({ status: 401, description: "Usuário não autorizado" })
  async updatePassword(@Param("userId") userId: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(userId, updatePasswordDto);
  }

  // @Post("forget-password")
  // @UseGuards(PublicGuard)
  // @ApiOperation({ summary: "Envia um token de recuperação de senha para o email" })
  // @ApiResponse({ status: 200, description: "Token de recuperação enviado" })
  // @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  // async forgetPassword(@Body("email") email: string) {
  //   return this.authService.forget(email);
  // }

  // @Post("reset-password")
  // @UseGuards(CustomAuthGuard) // Verifica se o usuário está autenticado
  // @ApiOperation({ summary: "Redefine a senha de um usuário com um token de recuperação" })
  // @ApiResponse({ status: 200, description: "Senha alterada com sucesso" })
  // @ApiResponse({ status: 401, description: "Token inválido ou expirado" })
  // @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  // async resetPassword(@Body() updatePasswordDto: UpdatePasswordDto, @Query("token") token: string) {
  //   return this.authService.reset(updatePasswordDto, token);
  // }
}
