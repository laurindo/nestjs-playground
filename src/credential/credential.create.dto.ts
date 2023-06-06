import { ApiProperty } from '@nestjs/swagger';

export class CredentialCreateDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
