import { Controller, Get, Query } from '@nestjs/common';
import { CredentialService } from './credential.service';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  // Browser request: http://localhost:3000/credential/something?email=demo@test.com
  @Get('something')
  async findByEmail(@Query('email') email: string): Promise<any> {
    console.log('email', email);
    const result = await this.credentialService.findOneByEmail(email);
    console.log(result);
    return result ? result : { error: 'user not found' };
  }
}
