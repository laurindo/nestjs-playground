import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Role } from 'src/utils/auth/role.enum';

@ObjectType({ description: 'CredentialModel' })
export class CredentialModel {
  @Field()
  uuid?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  accessToken: string;

  @Field()
  isAdmin: boolean;

  @Field((type) => [Role])
  roles: Role[];
}

@InputType()
export class CredentialModelInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  isAdmin: boolean;

  @Field((type) => [Role])
  roles: Role[];
}
