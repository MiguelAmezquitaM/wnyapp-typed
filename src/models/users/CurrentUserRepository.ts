import { FirebaseRepository } from "./FirebaseRepository";
import { UserRepository } from "./UserRepository";

export const userRepository: UserRepository = new FirebaseRepository()