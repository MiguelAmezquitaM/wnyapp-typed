import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useSessionContext, useTheme } from './components/GlobalStateProvider'
import { userRepository } from '../models/users/CurrentUserRepository'
import { User } from '../models/users/User'
import InputDate from './components/InputDate'
import Logotype from './components/Logotype'

export default function Login({ navigation, router }) {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [dob, setDob] = useState<Date>(null)

  const [confirmPassword, setConfirmPassword] = useState<string>()

  const session = useSessionContext()

  // will be called when user try send his data
  const onSend = async () => {
    // Puts all data in a object
    const userInfo: User = {
      username: username.trim(),
      password: password.trim(),
      email: email.trim(),
      dob,
      type: 'user',
    }

    // Check if the data is valid
    if (!checkFields(userInfo, confirmPassword)) return

    // Save on database
    try {
      await userRepository.createUser(userInfo)
    } catch (err) {
      return alert(err)
    }

    session.signIn(userInfo.username, userInfo.type)
    return alert('Usuario creado con exito')
  }

  return (
    <LoginView
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      setDob={setDob}
      onSend={onSend}
    />
  )
}

function LoginView(props: LoginViewProps) {
  const [theme] = useTheme()
  const styles = genStyles(theme)

  const color = theme === 'dark' ? '#fff' : '#000'

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerform}>
        <Logotype style={styles.logo} />
        <Text style={styles.title}>Regístrate</Text>
        <TextInput
          onChangeText={props.setUsername}
          textContentType="name"
          style={styles.inputs}
          placeholder="Nombre de usuario"
          placeholderTextColor={color}
        />
        <TextInput
          onChangeText={props.setEmail}
          textContentType="emailAddress"
          style={styles.inputs}
          placeholder="Correo electrónico"
          placeholderTextColor={color}
        />
        <View style={{ width: '75%', marginTop: 5 }}>
          <Text style={styles.dobtext}>Fecha de nacimiento</Text>
          <InputDate setDate={props.setDob} />
        </View>
        <TextInput
          onChangeText={props.setPassword}
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="Contraseña"
          placeholderTextColor={color}
        />
        <TextInput
          onChangeText={props.setConfirmPassword}
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="Repetir Contraseña"
          placeholderTextColor={color}
        />
        <Text onPress={props.onSend} style={styles.button}>
          Registrarse
        </Text>
      </ScrollView>
    </View>
  )
}

// -------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------

function checkFields(user: User, confirmPassword: string): boolean {
  const MIN_LENGTH = 4
  if (
    user.username.length < MIN_LENGTH ||
    user.password.length < MIN_LENGTH ||
    user.email.length < MIN_LENGTH ||
    user.dob === null
  ) {
    alert('Debe llenar todos los campos con al menos 4 caracteres')
    return false
  }

  if (user.password !== confirmPassword) {
    alert('Las contraseñas no coinciden')
    return false
  }
  return true
}

// -------------------------------------------
// TYPES
// -------------------------------------------

type LoginViewProps = {
  setUsername: (d: string) => void
  setEmail: (d: string) => void
  setPassword: (d: string) => void
  setConfirmPassword: (d: string) => void
  setDob: (d: Date) => void
  onSend: () => Promise<void>
}

// -------------------------------------------
// STYLES
// -------------------------------------------

const genStyles = (theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'light' ? '#fff' : '#111'
  const color = theme === 'light' ? '#000' : '#fff'
  const borderColor = theme === 'light' ? '#000' : '#fff'

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor
    },
    contentContainerform: {
      alignItems: 'center',
    },
    logo: {
      width: 200,
      height: 200,
      marginTop: 40,
      marginBottom: 30,
    },
    title: {
      fontFamily: 'Poppins',
      fontSize: 24,
      margin: 10,
      color
    },
    inputs: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginVertical: 8,
      borderWidth: 1,
      width: '75%',
      fontFamily: 'Poppins',
      borderRadius: 3,
      borderColor,
      backgroundColor,
      color
    },
    dobtext: {
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: '600',
      color
    },
    button: {
      borderRadius: 30,
      paddingHorizontal: 30,
      paddingVertical: 15,
      marginTop: 20,
      marginBottom: 40,
      backgroundColor: '#151c38',
      fontFamily: 'Poppins',
      color: '#fff',
    },
  })
}
