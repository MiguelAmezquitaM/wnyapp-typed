import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const USERNAME_KEY = 'username'
const USERTYPE_KEY = 'usertype'

class Session {

    async signIn(username: string, usertype: string) {
        await useAsyncStorage(USERNAME_KEY).setItem(username)
        await useAsyncStorage(USERTYPE_KEY).setItem(usertype)
    }

    async signOut() {
        try {
            await useAsyncStorage(USERNAME_KEY).removeItem()
            await useAsyncStorage(USERTYPE_KEY).removeItem()
        } catch (err) { console.log(err) }
    }

    async signedIn() {
        let signedIn = true
        signedIn = signedIn && await useAsyncStorage(USERNAME_KEY).getItem() !== null
        signedIn = signedIn && await useAsyncStorage(USERTYPE_KEY).getItem() !== null
        return signedIn
    }

    async getSession() {
        try {
            let res = {
                username: await useAsyncStorage(USERNAME_KEY).getItem(),
                usertype: await useAsyncStorage(USERTYPE_KEY).getItem()
            }
            return res
        } catch (err) {
            return null
        }
    }
}

const session = new Session()

export { session }