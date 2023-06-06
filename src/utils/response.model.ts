import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'Success Response' })
export class Response {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
