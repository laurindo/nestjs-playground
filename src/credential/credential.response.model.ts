import { ObjectType, Field } from '@nestjs/graphql';
import { ErrorResponse } from '../utils/error.response';

@ObjectType({ description: 'Credential Model Response' })
export class CredentialModelResponse {
  @Field({ nullable: true })
  error: ErrorResponse;

  @Field({ nullable: true })
  success: boolean;
}
