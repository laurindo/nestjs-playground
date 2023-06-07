import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { CredentialService } from './credential.service';
import { CredentialModel, CredentialModelInput } from './credential.model';
import { AuthGuard } from 'src/utils/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
@Resolver(() => CredentialModel)
export class CredentialResolver {
  constructor(private credentialService: CredentialService) {}

  @UseGuards(AuthGuard)
  @Query(() => CredentialModel)
  async findLoggedUser(@Context() context: any): Promise<CredentialModel> {
    const { req } = context;
    const credential = await this.credentialService.findByEmail(
      req?.user?.email,
    );
    return credential;
  }

  @Query(() => CredentialModel)
  async signin(@Args('credentialData') credentialData: CredentialModelInput) {
    const credential = await this.credentialService.signin(credentialData);
    return credential;
  }

  @Mutation(() => CredentialModel)
  async signup(@Args('credentialData') credentialData: CredentialModelInput) {
    return this.credentialService.signup(credentialData);
  }
}
