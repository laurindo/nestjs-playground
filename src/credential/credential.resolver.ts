import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { CredentialService } from './credential.service';
import { CredentialModel, CredentialModelInput } from './credential.model';

@Resolver((of) => CredentialModel)
export class CredentialResolver {
  constructor(private credentialService: CredentialService) {}

  @Query((returns) => CredentialModel)
  async findOneById(@Args('uuid') uuid: string): Promise<CredentialModel> {
    const credential = await this.credentialService.findOneById(uuid);
    return credential;
  }

  @Mutation((returns) => CredentialModel)
  async create(@Args('credentialData') credentialData: CredentialModelInput) {
    return this.credentialService.create(credentialData);
  }
}
