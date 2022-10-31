import { StyleSheet, View } from 'react-native'
import ButtonB from './ButtonB'

export default function BottonBar({ navigation, route }) {
  return (
    <View style={styles.bottonBarContainer}>
      <View style={styles.secBottonBarContainer}>
        <ButtonB
          onPress={() => navigation.navigate('Chats')}
          active={route.name === 'Chats'}
          sourceImg={require('../../../assets/images/chats.png')}
        />
        <ButtonB
          onPress={() => navigation.navigate('Forum')}
          active={route.name === 'Forum'}
          sourceImg={require('../../../assets/images/forum.png')}
        />
        <ButtonB
          onPress={() => navigation.navigate('Settings')}
          active={route.name === 'Settings'}
          sourceImg={require('../../../assets/images/settings.png')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottonBarContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    // backgroundColor: '#000'
  },
  secBottonBarContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
})
