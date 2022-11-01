import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react'
import GlobalStateProvider, {
  useChatContext,
  useUserContext,
} from './src/views/components/GlobalStateProvider'
import LoadScreen from './src/views/Loading'
import Welcome from './src/views/Welcome'
import Login from './src/views/Login'
import SignIn from './src/views/Signin'
import Forum from './src/views/Forum'
import Chats from './src/views/Chats'
import Settings from './src/views/Settings'
import ProfesionalChats from './src/views/ProfesionalChats'
import ChatView from './src/views/ChatView'

const Stack = createNativeStackNavigator()

function AppWrapper() {
  const [loaded, setLoaded] = useState(false)
  const user = useUserContext()
  const chat = useChatContext()

  if (!loaded) {
    return <LoadScreen setLoad={setLoaded} />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        {user !== null ? (
          <>
            <Stack.Screen
              name="Forum"
              component={Forum}
              options={{ animation: 'fade' }}
            />
            {user.type === 'user' ? (
              <Stack.Screen
                name="Chats"
                component={Chats}
                options={{ animation: 'fade' }}
              />
            ) : (
              <Stack.Screen
                name="Chats"
                component={ProfesionalChats}
                options={{ animation: 'fade' }}
              />
            )}
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ animation: 'fade' }}
            />
            <Stack.Screen
              name="ChatView"
              component={ChatView}
              options={{ animation: 'fade' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <GlobalStateProvider>
      <AppWrapper />
    </GlobalStateProvider>
  )
}
