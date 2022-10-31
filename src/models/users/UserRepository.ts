import type { User } from "./User"

export interface UserRepository {
    getUser(username: string): Promise<User>
    createUser(user: User): Promise<void>
    updateUser(user: User): Promise<boolean>
}
