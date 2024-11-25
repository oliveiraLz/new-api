import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleRepository } from "./role.repository";

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  create(input: CreateRoleDto) {
    return "This action adds a new role";
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  update(id: string, input: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
