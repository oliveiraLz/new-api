import { Injectable, NotFoundException } from "@nestjs/common";
import { FuncionarioRepository } from "./funcionario.repository";
import { CreateFuncionarioDto } from "./dto/create-funcionario.dto";
import { UpdateFuncionarioDto } from "./dto/update-funcionario.dto";

@Injectable()
export class FuncionarioService {
  constructor(private readonly repository: FuncionarioRepository) {}

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const funcionario = await this.repository.create(createFuncionarioDto);
    return await this.repository.save(funcionario);
  }

  async newFuncionario(input: CreateFuncionarioDto) {
    const funcionario = await this.create(input);
    return await this.repository.save(funcionario);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async update(id: string, updateFuncionarioDto: UpdateFuncionarioDto) {
    await this.repository.update(id, updateFuncionarioDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const funcionario = await this.findOne(id);
    if (!funcionario) {
      throw new NotFoundException("Funcionário não encontrado");
    }
    return await this.repository.remove(funcionario);
  }
}
