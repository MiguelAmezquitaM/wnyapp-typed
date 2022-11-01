import { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import { Chat } from '../models/chats/Chat'
import { chatRepository } from '../models/chats/CurrentChatRepository'
import BottonBar from './components/BottonBar'
import {
  useChatMannager,
  useTheme,
  useUserContext,
} from './components/GlobalStateProvider'
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

  const [theme] = useTheme()
  const styles = genStyles(theme)

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
        <View style={styles.solitarButton} onTouchEnd={solicitar}>
          <Text style={styles.solicitarTexto}> Solicitar </Text>
        </View>
      </ScrollView>
      <BottonBar navigation={navigation} route={route} />
    </View>
  )
}

const genStyles = (theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'light' ? '#fff' : '#1C1818'
  const borderColor = theme === 'light' ? '#000' : '#fff'
  const color = theme === 'light' ? '#000' : '#fff'

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      position: 'relative',
    },
    chatContainer: {
      width: '100%',
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor,
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
      color
    },
    ChatsContainerProps: {
      width: '90%',
    },
    ChatsContentContainer: {
      alignItems: 'center',
    },
    solitarButton: {
      backgroundColor: '#E67E22',
      width: 90,
      height: 90,
      borderRadius: 60,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    solicitarTexto: {
      fontFamily: 'Poppins',
      color: '#fff'
    }
  })
}
