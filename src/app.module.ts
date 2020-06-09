import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import * as depthLimit from 'graphql-depth-limit'

import { UsersModule } from './users/users.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      validationRules: [depthLimit(3)]
    }),
    UsersModule
  ]
})
export class AppModule {}
