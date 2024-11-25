import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";
import { FuncionarioService } from "./funcionario.service";
import { CreateFuncionarioDto } from "./dto/create-funcionario.dto";
import { UpdateFuncionarioDto } from "./dto/update-funcionario.dto";

@ApiTags("Funcionário")
@Controller("funcionario")
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  @ApiOperation({ summary: "Cria um novo funcionário" })
  @ApiBody({ type: CreateFuncionarioDto })
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.newFuncionario(createFuncionarioDto);
  }

  @Get()
  @ApiOperation({ summary: "Lista todos os funcionários" })
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Busca um funcionário pelo ID" })
  @ApiParam({ name: "id", description: "ID do funcionário" })
  findOne(@Param("id") id: string) {
    return this.funcionarioService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualiza um funcionário pelo ID" })
  @ApiParam({ name: "id", description: "ID do funcionário" })
  @ApiBody({ type: UpdateFuncionarioDto })
  update(@Param("id") id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.funcionarioService.update(id, updateFuncionarioDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove um funcionário pelo ID" })
  @ApiParam({ name: "id", description: "ID do funcionário" })
  remove(@Param("id") id: string) {
    return this.funcionarioService.remove(id);
  }
}
