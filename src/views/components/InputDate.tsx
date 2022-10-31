import { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"


export default function InputDate({ setDate }: { setDate: (a: Date) => void }) {
    const [date, _setDate] = useState(new Date())
  
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
        />
        <TextInput
          onChangeText={handleMon}
          style={styles.inputsDob}
          placeholder="Mes"
          keyboardType="numeric"
          autoComplete="birthdate-month"
        />
        <TextInput
          onChangeText={handleYea}
          style={styles.inputsDob}
          placeholder="Año"
          keyboardType="numeric"
          autoComplete="birthdate-year"
        />
      </View>
    )
  }


const styles = StyleSheet.create({
    formDob: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    inputsDob: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginVertical: 8,
      borderColor: '#000',
      borderWidth: 1,
      fontFamily: 'Poppins',
      width: '30%',
      borderRadius: 3,
    },
  })
  