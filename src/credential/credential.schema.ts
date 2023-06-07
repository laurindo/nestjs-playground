import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CredentialDocument = HydratedDocument<Credential>;

@Schema()
export class Credential {
  @Prop()
  uuid: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  accessToken: string;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);
