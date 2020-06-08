import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server-express'
import { User } from './models/user.model'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.getUserList()
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    try {
      return this.userService.getUserById(id)
    } catch (e) {
      throw new UserInputError(e.message)
    }
  }

  @Mutation(() => User)
  async createUser(@Args('userData') userData: CreateUserInput): Promise<User> {
    return this.userService.createUser(userData)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('userData') userData: UpdateUserInput
  ): Promise<User> {
    try {
      return this.userService.updateUser(id, userData)
    } catch (e) {
      throw new UserInputError(e.message)
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    try {
      return this.userService.deleteUser(id)
    } catch (e) {
      throw new UserInputError(e.message)
    }
  }
}
