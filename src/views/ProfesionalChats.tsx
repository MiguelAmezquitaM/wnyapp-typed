import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { chatRepository } from '../models/chats/CurrentChatRepository'
import { useChatMannager, useUserContext } from './components/SessionProvider'
import BottonBar from './components/BottonBar'
import TopBar from './components/TopBar'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Chat } from '../models/chats/Chat'

export default function ProfesionalChats() {
  const route = useRoute()
  const navigation = useNavigation()

  const user = useUserContext()
  const chatMan = useChatMannager()
  const [queue, setQueue] = useState<{ who: string }[]>([])
  const [chats, setChats] = useState<Chat[]>([])

  const fetchChats = async () => {
    const queue = await chatRepository.queue()
    const chats = await chatRepository.chatsOf(user.username)
    setQueue(queue)
    setChats(chats)
  }

  const accept = async (username: string) => {
    chatRepository.accept(username)
    await fetchChats()
    const chat = await chatRepository.createChat(user.username, username)
    openChat(chat)
  }

  const openChat = (chat: Chat) => {
    // open chat screen with current chat
    chatMan(chat)
    navigation.navigate('ChatView')
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView
        style={styles.queueContainerProps}
        contentContainerStyle={styles.queueContainer}
      >
        <Text style={styles.subtitle}>Cola de pacientes</Text>
        {queue.length === 0 ? (
          <Text style={styles.text}>No hay nadie esperando</Text>
        ) : null}
        {queue.map((chat, i) => {
          const chatname = chat.who
          return (
            <View
              onTouchEnd={() => accept(chat.who)}
              style={styles.chatContainer}
              key={i}
            >
              <Image
                style={styles.userIcon}
                source={require('../../assets/images/user-icon.png')}
              />
              <Text style={styles.text}>{chatname}</Text>
            </View>
          )
        })}

        <Text style={styles.subtitle}>Chats antiguos</Text>
        {chats.map((chat, i) => {
          const chatname =
            chat.participants[0] !== user.username
              ? chat.participants[0]
              : chat.participants[1]
          return (
            <View
              onTouchEnd={() => openChat(chat)}
              style={styles.chatContainer}
              key={i}
            >
              <Image
                style={styles.userIcon}
                source={require('../../assets/images/user-icon.png')}
              />
              <Text style={styles.text}>{chatname}</Text>
            </View>
          )
        })}
      </ScrollView>
      <BottonBar navigation={navigation} route={route} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  queueContainer: {
    alignItems: 'center',
  },
  queueContainerProps: {
    width: '90%',
  },
  chatContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0006',
    marginBottom: 5,
  },
  userIcon: {
    height: 60,
    width: 60,
    aspectRatio: 1,
    marginRight: 15,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 20,
    color: '#555',
  },
})
