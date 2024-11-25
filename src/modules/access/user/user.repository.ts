import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

export class UserRepository {
  constructor(
    @Inject("USER_REPOSITORY")
    private repository: Repository<User>
  ) {}

  async createUser(input: CreateUserDto) {
    return this.repository.create(input);
  }

  async findUserByUsername(nome: string) {
    return await this.repository.findOne({ where: { pessoa: { nome: nome } }, relations: { pessoa: true } });
  }

  async findOne(id: string) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findAll() {
    return await this.repository.find();
  }

  async remove(user: User) {
    return await this.repository.softRemove(user);
  }

  async update(id: string, input: UpdateUserDto) {
    return await this.repository.update(id, input);
  }

  async save(user: User) {
    return await this.repository.save(user);
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email: email } });
  }
}
