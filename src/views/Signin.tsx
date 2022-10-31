import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { userRepository } from '../models/users/CurrentUserRepository'
import Logotype from './components/Logotype'
import { session } from '../Session'
import { useSessionContext } from './components/SessionProvider'

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
        />
        <TextInput
          onChangeText={handlePassword}
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="Contraseña"
        />
        <Text onPress={onSend} style={styles.button}>
          Entrar
        </Text>

        {route.params.type === 'Paciente' ? (
          <Text style={styles.text}>
            ¿No tienes una cuenta?{' '}
            <Text
              onPress={() =>
                navigation.navigate('Login', { type: route.params.type })
              }
            >
              Registrate
            </Text>{' '}
          </Text>
        ) : (
          ''
        )}

        <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 24,
    margin: 10,
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
    borderColor: '#000',
    borderWidth: 1,
    width: '100%',
    fontFamily: 'Poppins',
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
  },
})
