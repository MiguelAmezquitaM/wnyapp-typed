
import { Text, View, Image, StyleSheet } from "react-native"
import Logotype from "./components/Logotype"

export default function Welcome({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Logotype style={styles.logotype} />
            </View>
            <View style={styles.form}>
                <Text style={styles.qtext}> Seleccione su tipo de usuario </Text>
                <View style={styles.optionContainer}>
                    <View onTouchEnd={() => navigation.navigate('SignIn', { type: 'Paciente' })} style={styles.option}>
                        <Image style={styles.imageOption} source={require('../../assets/images/paciente.png')} />
                        <Text style={styles.text}> Paciente </Text>
                    </View>
                    <View onTouchEnd={() => navigation.navigate('SignIn', { type: 'Profesional' })} style={styles.option}>
                        <Image style={styles.imageOption} source={require('../../assets/images/profesional.png')} />
                        <Text style={styles.text}>Profesional</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        marginTop: 130,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    optionContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    option: {
        alignItems: 'center',
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
        flex: 1
    },
    imageOption: {
        width: 100,
        height: 110,
    },
    logotype: {
        width: 200,
        height: 200
    },
    text: {
        fontSize: 14,
        padding: 5,
        fontFamily: 'Poppins'
    },
    qtext: {
        fontSize: 15,
        fontWeight: "600",
        fontFamily: 'Poppins'
    }
})