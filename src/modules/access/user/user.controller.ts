import { Controller, Get, Post, Body, Param, Delete, UseGuards, NotFoundException, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { AvailableRoles } from "src/enums/availableRoles.enum";
import { Roles } from "src/decorators/role.decorator";
import { IsPublic } from "src/decorators/is-public.decorator";

@Controller("user")
@ApiTags("User")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Criar um novo usuário" })
  @ApiResponse({ status: 201, description: "Usuário criado com sucesso", type: User })
  @ApiResponse({ status: 400, description: "Requisição inválida" })
  @ApiResponse({ status: 409, description: "Já existe um usuário com o email informado" })
  @Roles(AvailableRoles.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os usuários" })
  @ApiResponse({ status: 200, description: "Lista de usuários", type: [User] })
  @Roles(AvailableRoles.ADMIN, AvailableRoles.RH_READ) // ADMIN e RH_READ podem listar usuários. Exemplo de múltiplas roles
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Obter um usuário pelo ID" })
  @ApiResponse({ status: 200, description: "Usuário encontrado", type: User })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  async findOne(@Param("id") id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualizar um usuário" })
  @ApiResponse({ status: 200, description: "Usuário atualizado com sucesso", type: User })
  @ApiResponse({ status: 400, description: "Requisição inválida" })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  @Roles(AvailableRoles.ADMIN, AvailableRoles.RH_WRITE) // ADMIN e RH_WRITE podem atualizar.
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover um usuário" })
  @ApiResponse({ status: 200, description: "Usuário removido com sucesso" })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  @Roles(AvailableRoles.ADMIN) // Só ADMIN pode remover
  async remove(@Param("id") id: string) {
    await this.userService.remove(id);
  }

  @Get("email/:email") // Rota exemplo - buscar por email
  @ApiOperation({ summary: "Buscar um usuário pelo email" })
  @ApiResponse({ status: 200, description: "Usuário encontrado", type: User })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  @IsPublic() // Rota pública, sem autenticação
  async findByEmail(@Param("email") email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }

    return user;
  }
}
