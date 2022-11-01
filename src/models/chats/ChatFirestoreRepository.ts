import { addDoc, arrayUnion, collection, deleteDoc, doc, FirestoreDataConverter, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { fireDB } from "../../Database";
import { Chat, Message } from "./Chat";
import { ChatRepository } from "./ChatRepository";

type Queued = { who: string }

const ChatConverter: FirestoreDataConverter<Chat> = {
    toFirestore: function ({ messages, participants }) {
        return { chatId: '', messages, participants }
    },
    fromFirestore: function (snapshot): Chat {
        const { messages, participants } = snapshot.data()
        return { chatId: snapshot.id, messages, participants }
    }
}

const QueuedConverted: FirestoreDataConverter<Queued> = {
    toFirestore: function ({ who }) {
        return { who }
    },
    fromFirestore: function (snapshot) {
        const data = snapshot.data()
        return { who: data.who }
    }
}

export class ChatFirestoreRepository implements ChatRepository {
    suscribeToChat(chatId: string, fun: (chat: Chat) => void) {
        const docRef = doc(fireDB, 'chats', chatId).withConverter(ChatConverter)

        const unSub = onSnapshot(docRef, (snap) => {
            fun(snap.data())
        })

        return unSub
    }
    async accept(who: string): Promise<void> {
        const docsSnap = await getDocs(collection(fireDB, 'queue').withConverter(QueuedConverted))

        // Check if already exitst
        const toAccept = docsSnap.docs.find(doc => doc.data().who === who)

        await deleteDoc(toAccept.ref)
    }

    async queue(): Promise<{ who: string; }[]> {
        const docsSnap = await getDocs(collection(fireDB, 'queue').withConverter(QueuedConverted))
        return docsSnap.docs.map(doc => doc.data())
    }

    async request(who: string): Promise<boolean> {
        const docsSnap = await getDocs(collection(fireDB, 'queue'))

        // Check if already exitst
        for (let i in docsSnap.docs) {
            if (docsSnap.docs[i].data().who === who) return false
        }

        await addDoc(collection(fireDB, 'queue'), { who })
        return true
    }

    async chatsOf(who: string): Promise<Chat[]> {
        try {
            const chatsSnap = await getDocs(collection(fireDB, 'chats').withConverter(ChatConverter))
            const chatsOfWhoSnap = chatsSnap.docs.filter((doc) => doc.data().participants.indexOf(who) !== -1)
            const chatsOfWho = chatsOfWhoSnap.map(doc => doc.data())
            return chatsOfWho
        } catch (err) {
            console.log(err)
        }
    }

    async getChats() {
        try {
            const chatsSnap = await getDocs(collection(fireDB, 'chats').withConverter(ChatConverter))
            const chats = chatsSnap.docs.map(doc => doc.data())
            return chats
        } catch (err) {
            console.log(err)
        }
    }
    async createChat(user1: string, user2: string): Promise<Chat> {
        const q = query(collection(fireDB, 'chats').withConverter(ChatConverter), where('participants', 'array-contains', [user1, user2]))
        const chatsSnap = await getDocs(q)

        if (!chatsSnap.empty) {
            return chatsSnap.docs[0].data()
        }

        const chat: Chat = { participants: [user1, user2], messages: [], chatId: '' }
        const result = await addDoc(collection(fireDB, 'chats'), chat)
        return {...chat, chatId: result.id }
    }
    async sendMessage(owner: string, content: string, chatId: string): Promise<void> {
        const message: Message = { content, owner }
        const docRef = doc(fireDB, 'chats', chatId).withConverter(ChatConverter)
        await updateDoc(docRef, { messages: arrayUnion(message) })
    }
    async getMessages(chatId: string): Promise<Chat> {
        try {
            const chatSnap = await getDoc(doc(fireDB, 'chats', chatId).withConverter(ChatConverter))
            if (chatSnap.exists()) return chatSnap.data()
        } catch (err) { console.log(err) }
        return null
    }
}