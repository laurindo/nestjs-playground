import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User Model' })
export class UserModel {
  @Field()
  uuid: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  avatar?: string;

  @Field()
  credentialUuid: string;
}
