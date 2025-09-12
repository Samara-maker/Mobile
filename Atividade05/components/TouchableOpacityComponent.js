import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native-web";

export default function TouchableOpacityComponent({ text, onPress, hexColor = '#c71414ff', hexTextColor = 'white' }) {
    return (

        <TouchableOpacity style={[styles.button, { backgroundColor: hexColor }]} onPress={onPress} activeOpacity={0.8}>
            <Text style={[styles.buttonText, { color: hexTextColor }]}>{text}</Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});