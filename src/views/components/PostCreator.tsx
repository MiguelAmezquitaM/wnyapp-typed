import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { Post } from '../../models/posts/Post'
import { postRepository } from '../../models/posts/CurrentPostRepository'
import { useTheme, useUserContext } from './GlobalStateProvider'

export default function PostCreator({ onCreate }) {
  const [post, setPost] = useState<Post>({
    content: '',
    owner: '',
    postId: '',
    reactions: [],
  })

  const user = useUserContext()

  const handlePostText = (text: string) => {
    setPost({ ...post, content: text })
  }

  const onPost = async () => {
    try {
      post.owner = user.username

      if (!post.owner)
        return alert(
          'Buenas dias señor hacker, o quizás debería decir... buenas noches?'
        )
      if (post.content.length < 4 || post.content.length > 900)
        return alert(
          'La publicacion debe tener al menos 4 caracteres, y no debe superar los 900'
        )

      await postRepository.createPost(post)
    } catch (err) {
      console.log(err)
      return alert('Ocurrió un error al publicar')
    }
    onCreate()
    alert('Publicación creada')
    setPost({ content: '', owner: '', postId: '', reactions: [] })
  }

  const [theme] = useTheme()
  const styles = genStyles(theme)

  const color = theme === 'dark' ? '#fff' : '#000'

  return (
    <View style={styles.createPostContainer}>
      <View style={styles.inputPostContainer}>
        <Image
          style={styles.writeIcon}
          source={require('../../../assets/images/pencil-icon.png')}
        />
        <TextInput
          value={post.content}
          onChangeText={handlePostText}
          style={styles.textInputPosts}
          placeholder="Type something"
          multiline={true}
          placeholderTextColor={color}
        />
      </View>
      <View style={styles.controllerInputPost}>
        <View style={styles.iconsInputPostContainer}>
          <View style={styles.iconInputPostContainer}>
            <Image
              style={styles.iconInputPost}
              source={require('../../../assets/images/camera-icon.png')}
            />
          </View>
          <View style={styles.iconInputPostContainer}>
            <Image
              style={styles.iconInputPost}
              source={require('../../../assets/images/document-icon.png')}
            />
          </View>
        </View>
        <View onTouchEnd={onPost} style={styles.buttonPost}>
          <Text style={styles.buttonPostText}>POST</Text>
        </View>
      </View>
    </View>
  )
}

const genStyles = (theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'light' ? '#fff' : '#1C1818'
  const backgroundColorContainer = theme === 'light' ? 'rgb(236, 236, 236)' : '#71FDFF44'
  const color = theme === 'light' ? '#000' : '#fff'
  const borderColor = theme === 'light' ? '#000' : '#000'
  const bgButton = theme === 'light' ? 'rgb(109, 156, 255)' : '#c6f5ff'

  return StyleSheet.create({
    createPostContainer: {
      backgroundColor: backgroundColorContainer,
      paddingHorizontal: 15,
      paddingTop: 15,
      paddingBottom: 10,
      width: '90%',
      borderWidth: 0.5,
      borderColor,
      marginBottom: 20,
    },
    inputPostContainer: {
      backgroundColor,
      padding: 10,
      minHeight: 100,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    writeIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    textInputPosts: {
      fontFamily: 'Poppins',
      color,
      flex: 1,
    },
    controllerInputPost: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    iconsInputPostContainer: {
      flexDirection: 'row',
    },
    iconInputPostContainer: {
      padding: 5,
      marginRight: 20,
      backgroundColor: '#c6f5ff',
      borderRadius: 50,
      borderWidth: 0.3,
      borderColor: '#000',
    },
    iconInputPost: {
      height: 25,
      width: 25,
    },
    buttonPost: {
      paddingVertical: 5,
      paddingHorizontal: 30,
      backgroundColor: bgButton,
      borderWidth: 1,
      borderColor: '#bbb',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonPostText: {
      color: '#111',
      fontFamily: 'Poppins',
    },
  })
}
