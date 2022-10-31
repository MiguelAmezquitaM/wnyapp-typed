import { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import LogoType from './Logotype'
import { useSessionContext } from './SessionProvider'

function Options({ setShowOptions }) {
  const sessionContext = useSessionContext()
  const closeSesion = async () => {
    await sessionContext.signOut()
  }

  return (
    <View style={styles.SideOptionsContainer}>
      <View onTouchEnd={() => setShowOptions(false)} style={styles.backButton}>
        <Text style={styles.backButtonText}>Volver</Text>
      </View>
      <View style={styles.SideOption}>
        <Text style={styles.SideOptionText}>Ver perfil</Text>
      </View>
      <View style={styles.SideOption}>
        <Text style={styles.SideOptionText}>Configuración</Text>
      </View>
      <View
        onTouchEnd={closeSesion}
        style={[styles.SideOption, styles.SideOptionSignOut]}
      >
        <Text style={styles.SideOptionText}>Cerrar sesión</Text>
      </View>
    </View>
  )
}

export default function TopBar() {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <>
      <View style={styles.barContainer}>
        <View style={styles.barsIconContainer}>
          <View onTouchEnd={() => setShowOptions(!showOptions)}>
            <Image
              style={styles.bars}
              source={require('../../../assets/images/bars.png')}
            />
          </View>
          <Text style={styles.lighttext}>Busca personas o publicaciones</Text>
        </View>
        <LogoType style={styles.logoStyle} />
      </View>
      {showOptions ? <Options setShowOptions={setShowOptions} /> : <></>}
    </>
  )
}

const styles = StyleSheet.create({
  SideOptionsContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 3,
  },
  backButton: {
    marginBottom: 30,
  },
  backButtonText: {
    textDecorationLine: 'underline',
  },
  SideOption: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    marginBottom: 30,
    borderWidth: 0.5,
    borderColor: '#999',
  },
  SideOptionText: {
    color: '#000',
    fontFamily: 'Poppins',
  },
  SideOptionSignOut: {
    backgroundColor: '#ffadad',
  },
  barContainer: {
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barsIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bars: {
    width: 30,
    height: 45,
    marginRight: 10,
  },
  lighttext: {
    fontFamily: 'Poppins',
    fontWeight: '200',
    fontSize: 11,
  },
  logoStyle: {
    height: 60,
    width: 60,
  },
})
