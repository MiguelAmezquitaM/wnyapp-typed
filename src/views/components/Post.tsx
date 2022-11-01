import { Image, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { userRepository } from '../../models/users/CurrentUserRepository'
import { Post as PostType } from '../../models/posts/Post'
import { postRepository } from '../../models/posts/CurrentPostRepository'
import { useTheme, useUserContext } from './GlobalStateProvider'

export default function Post({ postInfo }: { postInfo: PostType }) {
  const [showOptions, setShowOptions] = useState(false)
  const [likeCounter, setlikeCounter] = useState(0)
  const [visible, setvisible] = useState(false)
  const [like, setlike] = useState(false)
  const [behavior, setBehavior] = useState('')

  const userContext = useUserContext()

  const initialize = async () => {
    if (!Array.isArray(postInfo.reactions)) postInfo.reactions = []

    const user = await userRepository.getUser(postInfo.owner)
    setBehavior(user.type)
    setlikeCounter(postInfo.reactions.length)
    setlike(postInfo.reactions.includes(userContext.username))
    setvisible(true)
  }

  useEffect(() => {
    initialize()
  }, [])

  const handleDotts = () => {
    setShowOptions(!showOptions)
  }

  const deletePost = async () => {
    // Checar si el que lo está eliminando es el dueño de la publicación
    if (userContext.username !== postInfo.owner)
      return alert('No eres dueño de esta publicación')

    const isDeleted = postRepository.deletePost(postInfo.postId)

    if (isDeleted) alert('La publicación fue eliminada con exito')
    else return alert('Ocurrió un error al eliminar la publicación')

    setShowOptions(false)
    setvisible(false)
  }

  const toggleLike = async () => {
    try {
      const post = await postRepository.getPost(postInfo.postId)
      if (!Array.isArray(post.reactions)) post.reactions = []

      const indexUser = post.reactions.indexOf(userContext.username)
      if (indexUser === -1) {
        post.reactions.push(userContext.username)
      } else {
        post.reactions = post.reactions.filter(
          (r) => r !== userContext.username
        )
      }

      if (postRepository.updatePost(post)) {
        setlike(!like)
        setlikeCounter(post.reactions.length)
      }
    } catch (err) {
      return alert('ocurrió un error')
    }
  }

  const [theme] = useTheme()

  const styles = genStyles(theme)

  return (
    <View
      style={[styles.postContainer, { display: visible ? 'flex' : 'none' }]}
    >
      <View style={styles.postWrapper}>
        <View style={styles.postUserInfo}>
          <View style={styles.wrapperUserPhoto}>
            <Image
              style={styles.userPhoto}
              source={require('../../../assets/images/user-icon.png')}
            />
          </View>
          <View style={styles.wrapperUserName}>
            <Text style={styles.usernameText}>{postInfo.owner}</Text>
            <Text style={styles.behaviorText}>{behavior}</Text>
          </View>
        </View>
        <View onTouchEnd={handleDotts} style={styles.dottsWrapper}>
          <Text style={styles.dotts}>...</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPost}>{postInfo.content}</Text>
      </View>
      <View style={styles.interactionsContainer}>
        <View onTouchEnd={toggleLike} style={styles.interaction}>
          <Image
            style={styles.interactionIcon}
            source={
              like
                ? require('../../../assets/images/heart-red-icon.png')
                : require('../../../assets/images/heart-icon.png')
            }
          />
          <Text style={styles.reactionColor}>{likeCounter}</Text>
        </View>
      </View>

      {showOptions ? (
        <View style={styles.optionsPost}>
          <View
            onTouchEnd={() => {
              deletePost()
            }}
            style={styles.optionWrap}
          >
            <Text style={styles.textOptions}>Eliminar</Text>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}

const genStyles = (theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'light' ? '#fff' : '#71FDFF44'
  const color = theme === 'light' ? '#000' : '#fff'

  return StyleSheet.create({
    postContainer: {
      width: '90%',
      borderColor: '#222',
      borderWidth: 0.5,
      padding: 15,
      marginBottom: 20,
      backgroundColor,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.67,
      elevation: 5,
    },
    postWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    postUserInfo: {
      flexDirection: 'row',
    },
    wrapperUserPhoto: {
      borderRadius: 50,
    },
    userPhoto: {
      height: 50,
      width: 50,
    },
    wrapperUserName: {
      justifyContent: 'center',
      marginLeft: 10,
    },
    usernameText: {
      fontFamily: 'Poppins',
      fontSize: 14,
      color
    },
    behaviorText: {
      fontFamily: 'Poppins',
      fontSize: 10,
      color
    },
    dottsWrapper: {
      alignItems: 'flex-start',
    },
    dotts: {
      fontSize: 24,
      fontWeight: '800',
      color
    },
    textPost: {
      fontFamily: 'Poppins',
      fontSize: 12,
      color
    },
    interactionsContainer: {
      paddingTop: 10,
    },
    interaction: {
      flexDirection: 'row',
    },
    reactionColor: {
      color
    },
    interactionIcon: {
      height: 20,
      width: 20,
      marginRight: 5,
    },
    optionsPost: {
      position: 'absolute',
      backgroundColor: '#000',
      width: '40%',
      right: 0,
      top: 60,
      padding: 10,
      zIndex: 2,
    },
    optionWrap: {
      marginVertical: 5,
    },
    textOptions: {
      fontFamily: 'Poppins',
      flex: 1,
      color: '#fff'
    },
  })
}
