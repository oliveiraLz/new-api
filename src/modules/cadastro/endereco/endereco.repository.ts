import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Endereco } from "./entities/endereco.entity";
import { CreateEnderecoDto } from "./dto/create-endereco.dto";
import { UpdateEnderecoDto } from "./dto/update-endereco.dto";

@Injectable()
export class EnderecoRepository {
  constructor(
    @Inject("ENDERECO_REPOSITORY")
    private repository: Repository<Endereco>
  ) {}

  async create(input: CreateEnderecoDto) {
    return this.repository.create(input);
  }

  async save(endereco: Endereco) {
    return await this.repository.save(endereco);
  }

  async findOne(id: string) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findAll() {
    return await this.repository.find();
  }

  async update(id: string, input: UpdateEnderecoDto) {
    return await this.repository.update(id, input);
  }

  async remove(endereco: Endereco) {
    return await this.repository.remove(endereco);
  }
}
