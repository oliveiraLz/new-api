import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../user/entities/user.entity";
import { UserRepository } from "../user/user.repository";
import { TokenPayloadDTO } from "./dto/TokenPayload.dto";
import { LoginDto } from "./dto/LoginDto.dto";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userRepository: UserRepository) {}

  async createToken(user: User) {
    const payload = {
      id: user.id,
      name: user.pessoa.nome,
      email: user.email,
      roles: user.roles,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: "7d",
        subject: String(user.id),
        issuer: "auth",
        audience: "access",
      }),
    };
  }

  checkToken(token: string): TokenPayloadDTO {
    try {
      return this.jwtService.verify<TokenPayloadDTO>(token, {
        audience: "access",
        issuer: "auth",
      });
    } catch (e) {
      throw new UnauthorizedException("Token inválido ou expirado.");
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Email e/ou senha incorretos.");
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException("E-mail não encontrado.");
    }

    const token = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: "1d",
        subject: String(user.id),
        issuer: "forget",
        audience: "password-recovery",
      }
    );

    // Aqui *TALVEZ* eu faça o método de reset de senha enviando pro email do cara o token
    // await this.mailService.sendRecoveryEmail(user.email, token);

    return { message: "E-mail de recuperação enviado com sucesso.", token };
  }

  async updatePassword(userId: string, input: UpdatePasswordDto) {
    const user = await this.userRepository.findOne(userId);
    const hashedPassword = await bcrypt.hash(input.password, 10);
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async reset(password: UpdatePasswordDto, token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: "password-recovery",
        issuer: "forget",
      });

      const user = await this.userRepository.findOne(data.id);
      if (!user) {
        throw new NotFoundException("Usuário não encontrado.");
      }

      await this.updatePassword(user.id, password);

      return { message: "Senha alterada com sucesso." };
    } catch (e) {
      throw new UnauthorizedException("Token inválido ou expirado.");
    }
  }
}
