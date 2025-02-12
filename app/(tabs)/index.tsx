import { View, Text, StyleSheet } from "react-native"
import { Link } from "expo-router";


export default function Home() {


    return (
        <View>
            <Text
            style={styles.text}>
                IVAN DAVE D. LIMBOY
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'darkblue', 
        fontSize: 100, 
        fontWeight: '600',
    },
});