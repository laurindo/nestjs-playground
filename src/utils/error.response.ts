import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'Error Response' })
export class ErrorResponse {
  @Field()
  error: boolean;

  @Field()
  message: string;
}
