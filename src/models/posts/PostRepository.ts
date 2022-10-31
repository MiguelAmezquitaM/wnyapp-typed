import { Post } from "./Post";

export interface PostRepository {
    getPost(id: string): Promise<Post | null>
    getPosts(): Promise<Post[]>
    createPost(post: Post): Promise<void>
    updatePost(post: Post): Promise<boolean>
    deletePost(postId: string): Promise<boolean>
}