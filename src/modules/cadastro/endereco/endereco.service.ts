import { Injectable, NotFoundException } from "@nestjs/common";
import { EnderecoRepository } from "./endereco.repository";
import { CreateEnderecoDto } from "./dto/create-endereco.dto";
import { UpdateEnderecoDto } from "./dto/update-endereco.dto";

@Injectable()
export class EnderecoService {
  constructor(private readonly repository: EnderecoRepository) {}

  async create(input: CreateEnderecoDto) {
    return await this.repository.create(input);
  }
  async newEndereco(input: CreateEnderecoDto) {
    const endereco = await this.repository.create(input);
    return await this.repository.save(endereco);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async update(id: string, updateEnderecoDto: UpdateEnderecoDto) {
    await this.repository.update(id, updateEnderecoDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const endereco = await this.findOne(id);
    if (!endereco) {
      throw new NotFoundException("Endereço não encontrado");
    }
    return await this.repository.remove(endereco);
  }
}
