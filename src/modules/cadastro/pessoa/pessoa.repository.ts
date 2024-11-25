import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Pessoa } from "./entities/pessoa.entity";
import { CreatePessoaDto } from "./dto/create-pessoa.dto";
import { UpdatePessoaDto } from "./dto/update-pessoa.dto";

@Injectable()
export class PessoaRepository {
  constructor(
    @Inject("PESSOA_REPOSITORY")
    private repository: Repository<Pessoa>
  ) {}

  async create(input: CreatePessoaDto) {
    return this.repository.create(input);
  }

  async save(pessoa: Pessoa) {
    return await this.repository.save(pessoa);
  }

  async findOne(id: string) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findAll() {
    return await this.repository.find();
  }

  async update(id: string, input: UpdatePessoaDto) {
    return await this.repository.update(id, input);
  }

  async remove(pessoa: Pessoa) {
    return await this.repository.remove(pessoa);
  }
}
