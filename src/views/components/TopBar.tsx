import { Image, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { useSessionContext, useTheme } from './GlobalStateProvider'
import LogoType from './Logotype'

function Options({ setShowOptions }) {
  const sessionContext = useSessionContext()
  const closeSesion = async () => {
    await sessionContext.signOut()
  }
  const [theme] = useTheme()
  const styles = genStyles(theme)

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
  const [theme] = useTheme()
  const styles = genStyles(theme)
  return (
    <>
      <View style={styles.barContainer}>
        <View style={styles.barsIconContainer}>
          <View onTouchEnd={() => setShowOptions(!showOptions)}>
            <Image
              style={styles.bars}
              source={require('../../../assets/images/bars-blue.webp')}
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
const genStyles = (theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'light' ? '#fff' : '#1C1818'
  const color = theme === 'light' ? '#000' : '#fff'

  return StyleSheet.create({
    SideOptionsContainer: {
      position: 'absolute',
      backgroundColor,
      width: '100%',
      height: '100%',
      paddingTop: 80,
      paddingHorizontal: 20,
      zIndex: 3,
    },
    backButton: {
      marginBottom: 30,
    },
    backButtonText: {
      textDecorationLine: 'underline',
      color
    },
    SideOption: {
      paddingVertical: 40,
      paddingHorizontal: 30,
      marginBottom: 30,
      borderWidth: 0.5,
      borderColor: '#999',
    },
    SideOptionText: {
      color,
      fontFamily: 'Poppins',
    },
    SideOptionSignOut: {
      backgroundColor: '#F8A6A6'
    },
    barContainer: {
      backgroundColor,
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
      width: 50,
      height: 50,
      marginRight: 10,
      color
    },
    lighttext: {
      fontFamily: 'Poppins',
      fontWeight: '200',
      fontSize: 11,
      color
    },
    logoStyle: {
      height: 60,
      width: 60,
    },
  })
}
