import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(() => [User])
  followers: Set<number>

  @Field(() => [User])
  following: Set<number>
}
