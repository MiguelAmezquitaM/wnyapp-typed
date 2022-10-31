import { createContext, useContext, useEffect, useState } from 'react'
import { Chat } from '../../models/chats/Chat'
import { userRepository } from '../../models/users/CurrentUserRepository'
import { User } from '../../models/users/User'
import { session } from '../../Session'

const UserContext = createContext<User>(null)
const SessionContext = createContext<{
  signIn: (un: string, ut: string) => Promise<void>
  signOut: () => Promise<void>
}>(null)
const ChatContext = createContext<Chat>(null)
const ChatMannager = createContext<(chat: Chat) => void>(null)

export const useUserContext = () => {
  return useContext(UserContext)
}

export const useSessionContext = () => {
  return useContext(SessionContext)
}

export const useChatContext = () => {
  return useContext(ChatContext)
}

export const useChatMannager = () => {
  return useContext(ChatMannager)
}

export default function SessionProvider({ children }) {
  const [user, setUser] = useState<User>(null)
  const [chat, setChat] = useState<Chat>(null)

  useEffect(() => {
    getSession()
  }, [])

  const getSession = async () => {
    try {
      const user = await session.getSession()
      if (!user) return
      await loadUser(user.username)
    } catch (err) {
      console.log(err)
    }
  }

  const loadUser = async (username: string) => {
    const user = await userRepository.getUser(username)
    setUser(user)
  }

  const sessionContext = {
    signIn: async (username: string, usertype: string) => {
      await session.signIn(username, usertype)
      await loadUser(username)
    },
    signOut: async () => {
      await session.signOut()
      setUser(null)
    },
  }

  return (
    <UserContext.Provider value={user}>
      <SessionContext.Provider value={sessionContext}>
        <ChatContext.Provider value={chat}>
          <ChatMannager.Provider value={setChat}>
            {children || null}
          </ChatMannager.Provider>
        </ChatContext.Provider>
      </SessionContext.Provider>
    </UserContext.Provider>
  )
}
