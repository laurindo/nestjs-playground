import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/utils/auth/role.enum';

export type CredentialDocument = HydratedDocument<Credential>;

@Schema()
export class Credential {
  @Prop()
  uuid: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  isAdmin: boolean;

  @Prop({ required: true })
  roles: Role[];
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);
