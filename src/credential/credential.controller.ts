import { Controller, Get, Query } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { Role } from 'src/utils/auth/role.enum';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  // Browser request: http://localhost:3000/credential/something?email=demo@test.com
  @Get('something')
  async findByEmail(
    @Query('email') email: string,
    @Query('password') password: string, // this is just a test,
    @Query('isAdmin') isAdmin: boolean,
    @Query('roles') roles: Role[],
  ): Promise<any> {
    console.log('email', email);
    const result = await this.credentialService.signin({
      email,
      password,
      isAdmin,
      roles,
    });
    console.log(result);
    return result ? result : { error: 'user not found' };
  }
}
