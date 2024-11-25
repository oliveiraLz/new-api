import { Injectable, NotFoundException } from "@nestjs/common";
import { PessoaRepository } from "./pessoa.repository";
import { CreatePessoaDto } from "./dto/create-pessoa.dto";
import { UpdatePessoaDto } from "./dto/update-pessoa.dto";

@Injectable()
export class PessoaService {
  constructor(private readonly repository: PessoaRepository) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const pessoa = await this.repository.create(createPessoaDto);
    return await this.repository.save(pessoa);
  }

  async newPessoa(input: CreatePessoaDto) {
    const pessoa = await this.create(input);
    return await this.repository.save(pessoa);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async update(id: string, updatePessoaDto: UpdatePessoaDto) {
    await this.repository.update(id, updatePessoaDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const pessoa = await this.findOne(id);
    if (!pessoa) {
      throw new NotFoundException("Pessoa não encontrada.");
    }
    return await this.repository.remove(pessoa);
  }
}
