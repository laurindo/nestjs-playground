import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType({ description: 'CredentialModel' })
export class CredentialModel {
  @Field({ nullable: true })
  uuid?: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password?: string;
}

@InputType()
export class CredentialModelInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
