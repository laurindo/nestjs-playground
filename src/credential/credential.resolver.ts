import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { CredentialService } from './credential.service';
import { CredentialModel, CredentialModelInput } from './credential.model';

@Resolver(() => CredentialModel)
export class CredentialResolver {
  constructor(private credentialService: CredentialService) {}

  @Query(() => CredentialModel)
  async findOneById(@Args('uuid') uuid: string): Promise<CredentialModel> {
    const credential = await this.credentialService.findOneById(uuid);
    return credential;
  }

  @Query(() => CredentialModel)
  async findByOneEmail(@Args('email') email: string): Promise<CredentialModel> {
    const credential = await this.credentialService.findOneByEmail(email);
    return credential;
  }

  @Mutation(() => CredentialModel)
  async create(@Args('credentialData') credentialData: CredentialModelInput) {
    return this.credentialService.create(credentialData);
  }
}
