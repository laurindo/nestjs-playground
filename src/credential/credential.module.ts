import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { CredentialResolver } from './credential.resolver';
import { Credential, CredentialSchema } from './credential.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Credential.name, schema: CredentialSchema },
    ]),
  ],
  controllers: [CredentialController],
  providers: [CredentialService, CredentialResolver],
})
export class CredentialModule {}
