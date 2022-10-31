import { User, UserRepository } from "./User";
import { doc, getDoc, setDoc, FirestoreDataConverter, DocumentData } from 'firebase/firestore'
import { fireDB } from "../../Database";

const userConverter: FirestoreDataConverter<User> = {
    fromFirestore(snapshot, options?) {
        const { username, password, email, dob, type } = snapshot.data()
        const user: User = { username, password, email, dob, type }
        return user
    },
    toFirestore({ username, password, dob, email, type }: User): DocumentData {
        return { username, password, dob, email, type }
    }
}

export class FirebaseRepository implements UserRepository {
    async getUser(username: string): Promise<User> {
        const docRef = doc(fireDB, "users", username).withConverter(userConverter);
        const snapDoc = await getDoc(docRef);

        if (snapDoc.exists()) return snapDoc.data();
        return null;
    }

    async createUser(user: User): Promise<void> {
        // Get user to check if already exists
        const docRef = doc(fireDB, "users", user.username);
        const snapDoc = await getDoc(docRef);

        if (snapDoc.exists()) {
            throw new Error("Nombre de usuario ya está en uso");
        }

        // Save in database
        await setDoc(docRef, user);
    }

    async updateUser(user: User): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}

