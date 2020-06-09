import { Injectable } from '@nestjs/common'

import { User } from './models/user.model'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
  private readonly users: User[] = []

  getUserList(): User[] {
    return this.users
  }

  getUserById(id: number): User {
    const result = this.users.find(user => user.id === id)

    if (result) return result

    throw new Error(`User (id=${id}) does not exist`)
  }

  createUser(userdata: CreateUserInput): User {
    const id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1
    const result = { id, ...userdata, followers: new Set<number>(), following: new Set<number>() }

    this.users.push(result)
    return result
  }

  updateUser(id: number, userdata: UpdateUserInput): User {
    const index = this.users.findIndex(user => user.id === id)

    if (index === -1) {
      throw new Error(`User (id=${id}) does not exist`)
    }

    const { followers, following } = this.users[index]
    const result = { id, ...userdata, followers, following }

    this.users[index] = result
    return result
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id)

    if (index === -1) {
      throw new Error(`User (id=${id}) does not exist`)
    }

    this.users.splice(index, 1)
    return true
  }

  getFollowerList(id: number): User[] {
    const index = this.users.findIndex(user => user.id === id)

    if (index === -1) {
      throw new Error(`User (id=${id}) does not exist`)
    }

    const followerList = []

    this.users[index].followers.forEach(followerUserId =>
      followerList.push(this.getUserById(followerUserId))
    )

    return followerList
  }

  getFollowingList(id: number): User[] {
    const index = this.users.findIndex(user => user.id === id)

    if (index === -1) {
      throw new Error(`User (id=${id}) does not exist`)
    }

    const followingList = []

    this.users[index].following.forEach(followingUserId =>
      followingList.push(this.getUserById(followingUserId))
    )

    return followingList
  }

  addFollower(id: number, followUserId: number): User {
    if (id === followUserId) {
      throw new Error(`id and followUserId cannot be identical`)
    }

    const index = this.users.findIndex(user => user.id === id)
    const followUserIndex = this.users.findIndex(user => user.id === followUserId)

    if (index === -1) {
      throw new Error(`User (id=${id}) does not exist`)
    }

    if (followUserIndex === -1) {
      throw new Error(`User (id=${followUserId}) does not exist`)
    }

    this.users[index].followers.add(followUserId)
    this.users[followUserIndex].following.add(id)

    return this.users[followUserIndex]
  }
}
