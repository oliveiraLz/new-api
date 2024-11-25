import { AvailableRoles } from "../../../../enums/availableRoles.enum";

export class TokenPayloadDTO {
  iss: string;
  sub: string;
  isSuper: boolean;
  id: string;
  name: string;
  email: string;
  roles: AvailableRoles[];
  tenant: string;
  exp?: number;
  iat?: number;
}
