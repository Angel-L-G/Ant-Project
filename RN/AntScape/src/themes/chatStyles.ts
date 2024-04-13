import { StyleSheet } from "react-native";

const chatStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },

    upperBar: {
        width: '100%',
        height: '10%',
        backgroundColor: "rgba(20, 40, 140, 1)"

    },

    messageContainer: {
        width: '100%',
        height: '90%',
        backgroundColor: "rgba(30, 70, 200, 1)"

    }
});

export default chatStyles;