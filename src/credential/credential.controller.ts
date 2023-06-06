import { Controller, Get, Query } from '@nestjs/common';
import { CredentialService } from './credential.service';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  // Browser request: http://localhost:3000/credential/something?email=demo@test.com
  @Get('something')
  async findByEmail(
    @Query('email') email: string,
    @Query('password') password: string, // this is just a test
  ): Promise<any> {
    console.log('email', email);
    const result = await this.credentialService.signin({ email, password });
    console.log(result);
    return result ? result : { error: 'user not found' };
  }
}
