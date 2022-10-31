
type UserTypes = 'user' | 'Psicologo' | 'Psiquiatra'

export type User = {
    username: string
    password: string
    email: string
    type: UserTypes
    dob: Date
}

export interface UserRepository {
    getUser(username: string): Promise<User>
    createUser(user: User): Promise<void>
    updateUser(user: User): Promise<boolean>
}