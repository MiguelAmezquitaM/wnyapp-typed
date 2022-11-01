import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { userRepository } from '../models/users/CurrentUserRepository'
import Logotype from './components/Logotype'
import { useSessionContext, useTheme } from './components/GlobalStateProvider'

export default function SignIn({ navigation, route }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const sessionContext = useSessionContext()

  const handleUsername = (username: string) => {
    setCredentials({ ...credentials, username: username.trim() })
  }

  const handlePassword = (password: string) => {
    setCredentials({ ...credentials, password: password.trim() })
  }

  const onSend = async () => {
    try {
      const user = await userRepository.getUser(credentials.username)

      if (route.params.type === 'Paciente' && user.type !== 'user')
        return alert('No estas autorizado')

      // Comprobar si el usuario existe
      if (user === null) return alert('Este usuario no existe')

      // Comprobando si las contraseñas coinciden
      if (user.password !== credentials.password)
        return alert('Contraseña incorrecta')

      await sessionContext.signIn(user.username, user.type)
    } catch (err) {
      alert('Ocurrio un error')
      console.log(err)
      console.log(route)
    }
  }

  const [theme] = useTheme()
  const styles = genStyles(theme)

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Logotype style={styles.logo} />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          onChangeText={handleUsername}
          style={styles.inputs}
          placeholder="Nombre de usuario"
          placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
        />
        <TextInput
          onChangeText={handlePassword}
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="Contraseña"
          placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
        />
        <Text onPress={onSend} style={styles.button}>
          Entrar
        </Text>

        {route.params.type === 'Paciente' ? (
          <Text style={styles.text}>
            ¿No tienes una cuenta?{' '}
            <Text
              style={{ fontWeight: '700' }}
              onPress={() =>
                navigation.navigate('Login', { type: route.params.type })
              }
            >
              Registrate
            </Text>
          </Text>
        ) : null}

        <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
      </View>
    </View>
  )
}

const genStyles = (theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'light' ? '#fff' : '#111'
  const color = theme === 'light' ? '#000' : '#fff'
  const borderColor = theme === 'light' ? '#000' : '#fff'

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
    },
    logo: {
      width: 200,
      height: 200,
    },
    title: {
      fontFamily: 'Poppins',
      fontSize: 24,
      margin: 10,
      color,
    },
    form: {
      flex: 1,
      alignItems: 'center',
      width: '75%',
    },
    inputs: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 8,
      borderColor,
      borderWidth: 1,
      width: '100%',
      fontFamily: 'Poppins',
      textShadowColor: color,
      backgroundColor,
      color,
    },
    button: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      margin: 20,
      backgroundColor: '#151c38',
      fontFamily: 'Poppins',
      color: '#fff',
    },
    text: {
      fontFamily: 'Poppins',
      color,
    },
  })
}
