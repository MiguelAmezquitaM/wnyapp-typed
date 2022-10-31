import { FirebaseRepository } from "./FirebaseRepository";
import { PostRepository } from "./PostRepository";

export const postRepository: PostRepository = new FirebaseRepository()