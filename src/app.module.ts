import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { CredentialModule } from './credential/credential.module';

@Module({
  imports: [
    CredentialModule,
    MongooseModule.forRoot(
      'mongodb+srv://nestuserexample:kc4iqltV2GG4L9Pu@nestexample.ivpc7xx.mongodb.net',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
