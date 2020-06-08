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
    const result = { id, ...userdata, followers: [] }

    this.users.push(result)
    return result
  }

  updateUser(id: number, userdata: UpdateUserInput): User {
    const index = this.users.findIndex(user => user.id === id)

    if (index === -1) {
      throw new Error(`User (id=${id}) does not exist`)
    }

    const { followers } = this.users[index]
    const result = { id, ...userdata, followers }

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
}
