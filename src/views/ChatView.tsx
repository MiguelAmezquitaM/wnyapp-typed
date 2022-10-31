import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { Message } from '../models/chats/Chat'
import { chatRepository } from '../models/chats/CurrentChatRepository'
import { useChatContext, useUserContext } from './components/SessionProvider'

export default function ChatView() {
  const chat = useChatContext()
  const user = useUserContext()
  const [content, setContent] = useState('')
  const [messages, setMessages] = useState<Message[]>(chat.messages)

  useFocusEffect(
    useCallback(() => {
      fetchMessages()
      const interval = setInterval(async () => {
        await fetchMessages()
      }, 5000)

      return () => {
        clearInterval(interval)
        chat.messages = messages
      }
    }, [])
  )

  const fetchMessages = async () => {
    console.log('Fetching messages')
    const updatedChat = await chatRepository.getMessages(chat.chatId)
    console.log('Messages: ', updatedChat.messages)
    setMessages(updatedChat.messages)
  }

  const sendMessage = async () => {
    const message = content.trim()
    setContent('')
    if (!message.length) return
    chatRepository.sendMessage(user.username, message, chat.chatId)
  }

  const other =
    chat.participants[0] !== user.username
      ? chat.participants[0]
      : chat.participants[1]

  const position = (user: string): StyleProp<ViewStyle> => {
    return {
      flexDirection: user === other ? 'row' : 'row-reverse',
    }
  }

  const borders = (user: string): StyleProp<ViewStyle> => {
    return {
      borderTopLeftRadius: user !== other ? 15 : 0,
      borderTopRightRadius: user === other ? 15 : 0,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    }
  }

  const scrollview = useRef<ScrollView>()

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Image
          style={styles.userIcon}
          source={require('../../assets/images/user-icon.png')}
        />
        <Text style={styles.suptext}>{other}</Text>
      </View>
      <ScrollView
        ref={scrollview}
        showsVerticalScrollIndicator={false}
        style={styles.scrollStyles}
        contentContainerStyle={styles.contentContainerScroll}
        onContentSizeChange={() => {
          scrollview.current.scrollToEnd({ animated: true })
        }}
      >
        {messages.map((message, i) => (
          <View style={position(message.owner)} key={i}>
            <View style={[styles.messageContainer, borders(message.owner)]} key={i}>
              <Text style={styles.messageContent}>{message.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.messageInputContainer}>
        <TextInput
          onChangeText={setContent}
          style={styles.messageInput}
          value={content}
          placeholder="Escribe un mensaje"
          onPressOut={() => {
            scrollview.current.scrollToEnd({ animated: true })
          }}
        />
        <View onTouchEnd={() => sendMessage()} style={styles.sendbutton}>
          <Text style={styles.sendtext}>Enviar</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '2%',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  topbar: {
    marginTop: '12%',
    marginBottom: '2%',
    backgroundColor: '#2e5d60',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  userIcon: {
    height: 50,
    width: 50,
    marginRight: 25,
  },
  suptext: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#fff',
  },
  messageInputContainer: {
    position: 'absolute',
    bottom: '3%',
    left: '2%',
    right: '2%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0000'
  },
  messageInput: {
    fontFamily: 'Poppins',
    fontSize: 13,
    flex: 1,
    borderWidth: 1,
    borderColor: '#777',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 5,
    borderTopLeftRadius: 15,
    backgroundColor: '#fff'
  },
  sendbutton: {
    backgroundColor: '#2e5d60',
    height: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomRightRadius: 15,
  },
  sendtext: {
    color: '#fff',
    fontFamily: 'Poppins',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 20,
    paddingVertical: 15,
    backgroundColor: '#444',
  },
  messageContent: {
    fontFamily: 'Poppins',
    color: '#fff',
  },
  contentContainerScroll: {
    paddingBottom: 75
  },
  scrollStyles: {
    flex: 1,
  },
})
