import { View, ScrollView, StyleSheet } from "react-native";
import BottonBar from "./components/BottonBar";
import TopBar from "./components/TopBar";

export default function Settings({navigation, route}) {
    return (
        <View style={styles.container}>
            <TopBar />
            <ScrollView>
                <View>

                </View>
            </ScrollView>
            <BottonBar navigation={navigation} route={route} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
})