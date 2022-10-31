import { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import { Chat } from '../models/chats/Chat'
import { chatRepository } from '../models/chats/CurrentChatRepository'
import BottonBar from './components/BottonBar'
import { useChatMannager, useUserContext } from './components/SessionProvider'
import TopBar from './components/TopBar'

export default function Chats({ navigation, route }) {
  const user = useUserContext()
  const chatMan = useChatMannager()
  const [chats, setChats] = useState<Chat[]>([])

  const fetchChats = async () => {
    const chats = await chatRepository.chatsOf(user.username)
    setChats(chats)
  }

  const openChat = (chat: Chat) => {
    // open chat screen with current chat
    chatMan(chat)
    navigation.navigate('ChatView')
  }

  useEffect(() => {
    fetchChats()
  }, [])

  const solicitar = async () => {
    try {
      if (await chatRepository.request(user.username))
        alert('Agregado a la cola con éxito...')
      else alert('Ya ha solicitado, por favor espere su respuesta')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView
        style={styles.ChatsContainerProps}
        contentContainerStyle={styles.ChatsContentContainer}
        >
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
        <View onTouchEnd={solicitar}>
          <Text> Solicitar </Text>
        </View>
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
  ChatsContainerProps: {
    width: '90%',
  },
  ChatsContentContainer: {
    alignItems: 'center',
  },
})
