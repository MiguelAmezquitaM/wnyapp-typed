import { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native'
import BottonBar from './components/BottonBar'
import { useTheme } from './components/GlobalStateProvider'
import TopBar from './components/TopBar'

export default function Settings({ navigation, route }) {
  const [theme, setTheme] = useTheme()
  const [themeIcon, setThemeIcon] = useState(null)

  const icons = {
    light: require('../../assets/images/light-mode.webp'),
    dark: require('../../assets/images/dark-mode.png'),
  }

  useEffect(() => {
    setThemeIcon(icons[theme])
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const styles = genStyles(theme)

  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Configuración</Text>
        <View style={styles.configContainer}>
          <Text style={styles.text}>Tema</Text>
          <View onTouchEnd={toggleTheme}>
            <Image style={styles.iconConfig} source={themeIcon} />
          </View>
        </View>
      </ScrollView>
      <BottonBar navigation={navigation} route={route} />
    </View>
  )
}

const genStyles = (theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'light' ? '#fff' : '#1C1818'
  const color = theme === 'light' ? '#000' : '#fff'

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor,
    },
    scrollContainer: {
      paddingHorizontal: '5%',
    },
    title: {
      fontFamily: 'Poppins',
      fontSize: 36,
      fontWeight: '700',
      marginBottom: 25,
      color
    },
    configContainer: {
      padding: 15,
      borderWidth: 0.5,
      borderColor: '#555',
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      fontFamily: 'Poppins',
      fontSize: 20,
      fontWeight: '500',
    },
    iconConfig: {
      width: 40,
      height: 40,
    },
  })
}
