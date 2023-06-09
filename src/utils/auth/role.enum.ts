import { registerEnumType } from '@nestjs/graphql';

// More Details: https://docs.nestjs.com/security/authorization
export enum Role {
  User = 'user',
  Admin = 'admin',
}

// https://docs.nestjs.com/graphql/unions-and-enums
// Since we need to export Role[] in our CredentialModelInput, tThis is important to avoid error on nestjs
registerEnumType(Role, {
  name: 'Role',
  description: 'The supported roles.',
});
