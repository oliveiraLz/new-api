import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Funcionario } from "./entities/funcionario.entity";
import { CreateFuncionarioDto } from "./dto/create-funcionario.dto";
import { UpdateFuncionarioDto } from "./dto/update-funcionario.dto";

@Injectable()
export class FuncionarioRepository {
  constructor(
    @Inject("FUNCIONARIO_REPOSITORY")
    private repository: Repository<Funcionario>
  ) {}

  async create(input: CreateFuncionarioDto) {
    return this.repository.create(input);
  }

  async save(funcionario: Funcionario) {
    return await this.repository.save(funcionario);
  }

  async findOne(id: string) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findAll() {
    return await this.repository.find();
  }

  async update(id: string, input: UpdateFuncionarioDto) {
    return await this.repository.update(id, input);
  }

  async remove(funcionario: Funcionario) {
    return await this.repository.remove(funcionario);
  }
}
