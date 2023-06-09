import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/utils/auth/role.enum';

@ArgsType()
export class UserArgs {
  @Field()
  email: string;
}

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  isAdmin: boolean;

  @Field()
  roles: Role[];

  @Field()
  credentialUuid: string;
}
