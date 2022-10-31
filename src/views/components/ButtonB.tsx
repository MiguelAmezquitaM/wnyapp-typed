import { Image, StyleSheet, View } from "react-native"


export default function ButtonB({ active, sourceImg, onPress }) {
    const _styles = active ? styles.selectedButom : styles.optionBotonContainer

    return (
        <View onTouchEnd={onPress} style={_styles}>
            <Image style={styles.butonImage} source={sourceImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    selectedButom: {
        top: -12,
        padding: 15,
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        backgroundColor: '#48C9B0',
        transform: [{ scale: 1.3 }, { translateY: -10 }]
    },
    optionBotonContainer: {
        top: -12,
        padding: 15,
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        backgroundColor: '#E67E22'
    },
    butonImage: {
        aspectRatio: 1,
        height: 25,
    }
})