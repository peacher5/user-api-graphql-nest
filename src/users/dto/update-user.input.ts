import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}
