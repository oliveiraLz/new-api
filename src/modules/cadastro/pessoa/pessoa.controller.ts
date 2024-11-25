import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";
import { PessoaService } from "./pessoa.service";
import { CreatePessoaDto } from "./dto/create-pessoa.dto";
import { UpdatePessoaDto } from "./dto/update-pessoa.dto";

@ApiTags("Pessoa")
@Controller("pessoa")
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  @ApiOperation({ summary: "Cria uma nova pessoa" })
  @ApiBody({ type: CreatePessoaDto })
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoaService.newPessoa(createPessoaDto);
  }

  @Get()
  @ApiOperation({ summary: "Lista todas as pessoas" })
  findAll() {
    return this.pessoaService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Busca uma pessoa pelo ID" })
  @ApiParam({ name: "id", description: "ID da pessoa" })
  findOne(@Param("id") id: string) {
    return this.pessoaService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualiza uma pessoa pelo ID" })
  @ApiParam({ name: "id", description: "ID da pessoa" })
  @ApiBody({ type: UpdatePessoaDto })
  update(@Param("id") id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaService.update(id, updatePessoaDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove uma pessoa pelo ID" })
  @ApiParam({ name: "id", description: "ID da pessoa" })
  remove(@Param("id") id: string) {
    return this.pessoaService.remove(id);
  }
}
