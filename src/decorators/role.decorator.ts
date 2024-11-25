import { SetMetadata } from "@nestjs/common";
import { AvailableRoles } from "../enums/availableRoles.enum";

export const Roles = (...roles: AvailableRoles[]) => SetMetadata("roles", roles);
