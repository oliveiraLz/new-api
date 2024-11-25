import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";
import { EnderecoService } from "./endereco.service";
import { CreateEnderecoDto } from "./dto/create-endereco.dto";
import { UpdateEnderecoDto } from "./dto/update-endereco.dto";

@ApiTags("Endereço")
@Controller("endereco")
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  @ApiOperation({ summary: "Cria um novo endereço" })
  @ApiBody({ type: CreateEnderecoDto })
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecoService.create(createEnderecoDto);
  }

  @Get()
  @ApiOperation({ summary: "Lista todos os endereços" })
  findAll() {
    return this.enderecoService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Busca um endereço pelo ID" })
  @ApiParam({ name: "id", description: "ID do endereço" })
  findOne(@Param("id") id: string) {
    return this.enderecoService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualiza um endereço pelo ID" })
  @ApiParam({ name: "id", description: "ID do endereço" })
  @ApiBody({ type: UpdateEnderecoDto })
  update(@Param("id") id: string, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.enderecoService.update(id, updateEnderecoDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove um endereço pelo ID" })
  @ApiParam({ name: "id", description: "ID do endereço" })
  remove(@Param("id") id: string) {
    return this.enderecoService.remove(id);
  }
}
