import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/utils/auth/role.enum';

export class CredentialCreateDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  roles: Role[];
}
