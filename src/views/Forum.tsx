import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { postRepository } from '../models/posts/CurrentPostRepository'
import PostCreator from './components/PostCreator'
import BottonBar from './components/BottonBar'
import TopBar from './components/TopBar'
import Post from './components/Post'
import { Post as PostType } from '../models/posts/Post'
import { useTheme } from './components/GlobalStateProvider'

export default function Forum({ navigation, route }) {
  const [posts, setPosts] = useState<PostType[]>([])

  const fetchPosts = async () => {
    const posts = await postRepository.getPosts()
    setPosts(posts)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const [theme] = useTheme()
  const styles = genStyles(theme)

  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.forumContainer}
      >
        <PostCreator onCreate={fetchPosts} />

        {posts?.map((post, index) => (
          <Post postInfo={post} key={index} />
        ))}
      </ScrollView>
      <BottonBar navigation={navigation} route={route} />
    </View>
  )
}

const genStyles = (theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'light' ? '#fff' : '#1C1818'

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor,
    },
    forumContainer: {
      alignItems: 'center',
    },
  })
}
