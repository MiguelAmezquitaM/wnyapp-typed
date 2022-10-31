import { addDoc, collection, deleteDoc, doc, DocumentData, FirestoreDataConverter, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { fireDB } from "../../Database";
import { Post } from "./Post";
import { PostRepository } from "./PostRepository";

const PostConverter: FirestoreDataConverter<Post> = {
    fromFirestore(snapshot) {
        const { owner, content, postId, reactions } = snapshot.data()
        const post: Post = { owner, content, postId: snapshot.id, reactions }
        return post
    },
    toFirestore({ owner, content, postId, reactions }: Post): DocumentData {
        return { owner, content, postId, reactions }
    }
}

export class FirebaseRepository implements PostRepository {
    async getPosts() {
        const q = collection(fireDB, 'posts').withConverter(PostConverter)
        const postsSnap = await getDocs(q)
        const posts = postsSnap.docs.map((post) => post.data())
        return posts
    }
    async getPost(postId: string) {
        try {
            const docRef = doc(fireDB, 'posts', postId).withConverter(PostConverter)
            const postSnap = await getDoc(docRef)
            if (!postSnap.exists()) return null
            return postSnap.data()
        } catch (err) {
            return null
        }
    }
    async createPost(post: Post) {
        try {
            await addDoc(collection(fireDB, 'posts'), post)
        } catch (err) {
            throw new Error("No se ha podido crear la publicacion")
        }
    }
    async updatePost(post: Post) {
        try {
            await setDoc(doc(fireDB, 'posts', post.postId), post)
        } catch (err) {
            return false
        }
        return true
    }
    async deletePost(postId: string) {
        try {
            await deleteDoc(doc(fireDB, 'posts', postId))
        } catch (err) {
            return false
        }
        return true
    }
}