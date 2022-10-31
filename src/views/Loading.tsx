import { Text, View, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'

import Logo from './components/Logotype'

export default function LoadScreen({ setLoad }) {
  const [loadProgress, setLoadProgress] = useState(0)
  const [dots, setDots] = useState('.')

  const [fontsLoaded, error] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
  })

  if (error) alert('Ocurrió un error cargando las fuentes')

  useEffect(() => {
    // Operaciones para cuando cargue
    if (loadProgress >= 100 && fontsLoaded) {
      setLoad(true)
    }
  }, [loadProgress, fontsLoaded])

  useEffect(() => {
    setTimeout(() => {
      setLoadProgress(loadProgress + 10)
      setDots(dots === '...' ? '' : dots + '.')
    }, 200)
  }, [dots, loadProgress])

  return (
    <View style={styles.loadScreenContainer}>
      <Logo style={styles.logotype} />
      <Text style={styles.text}>{dots}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logotype: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 24,
    padding: 20,
    // fontFamily: 'Poppins',
  },
})
