import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { hashPassword } from "src/utils/hashPassword";

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findUserByUsername(userName: string): Promise<User> {
    return await this.repository.findUserByUsername(userName);
  }

  async findOne(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.findAll();
  }

  async remove(id: string): Promise<void> {
    const user = await this.repository.findOne(id);
    if (user) {
      await this.repository.remove(user);
    } else {
      throw new NotFoundException(`Usuário com id: ${id} não encontrado.`);
    }
  }

  async update(id: string, input: UpdateUserDto): Promise<void> {
    const user = await this.repository.findOne(id);
    if (user) {
      await this.repository.update(id, input);
    } else {
      throw new NotFoundException(`Usuário com id: ${id} não encontrado.`);
    }
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findByEmail(email);
  }

  async create(input: CreateUserDto): Promise<User> {
    const existingUser = await this.repository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException(`Já existe um usuário com o email: ${input.email}`);
    }

    const user = await this.repository.createUser(input);
    user.password = await hashPassword(input.password);
    return await this.repository.save(user);
  }
}
