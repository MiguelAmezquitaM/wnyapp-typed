import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useTheme } from './GlobalStateProvider'

export default function InputDate({ setDate }: { setDate: (a: Date) => void }) {
  const [theme] = useTheme()
  const [date, _setDate] = useState(new Date())

  const styles = genStyles(theme)

  const color = theme === 'dark' ? '#fff' : '#000'

  const handleDay = (day: string) => {
    _setDate((prev) => {
      prev.setDate(Number(day))
      return prev
    })
    setDate(date)
  }
  const handleMon = (mon: string) => {
    _setDate((prev) => {
      prev.setMonth(Number(mon) - 1)
      return prev
    })
    setDate(date)
  }
  const handleYea = (yea: string) => {
    _setDate((prev) => {
      prev.setFullYear(Number(yea))
      return prev
    })
    setDate(date)
  }

  return (
    <View style={styles.formDob}>
      <TextInput
        onChangeText={handleDay}
        style={styles.inputsDob}
        placeholder="Dia"
        keyboardType="numeric"
        autoComplete="birthdate-day"
        placeholderTextColor={color}
      />
      <TextInput
        onChangeText={handleMon}
        style={styles.inputsDob}
        placeholder="Mes"
        keyboardType="numeric"
        autoComplete="birthdate-month"
        placeholderTextColor={color}
      />
      <TextInput
        onChangeText={handleYea}
        style={styles.inputsDob}
        placeholder="Año"
        keyboardType="numeric"
        autoComplete="birthdate-year"
        placeholderTextColor={color}
      />
    </View>
  )
}

const genStyles = (theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'light' ? '#fff' : '#111'
  const color = theme === 'light' ? '#000' : '#fff'
  const borderColor = theme === 'light' ? '#000' : '#fff'
  const buttonColor = theme === 'light' ? '#fff' : '#000'

  return StyleSheet.create({
    formDob: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    inputsDob: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginVertical: 8,
      borderColor,
      color,
      borderWidth: 1,
      fontFamily: 'Poppins',
      width: '30%',
      borderRadius: 3,
    },
  })
}
