import { StyleSheet } from "react-native";

const chatStyles = StyleSheet.create({
    ////////////////////////////////////////////
    //Container
    ////////////////////////////////////////////
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },

    ////////////////////////////////////////////
    //UpperPart
    ////////////////////////////////////////////
    upperBar: {
        width: '100%',
        height: '7%',
        backgroundColor: "rgba(20, 40, 140, 1)",
        display: 'flex',
        flexDirection: 'row',
    },

    profilePicContainer: {
        width: '30%',
        height: '100%',
    },

    usernameContainer: {
        width: '70%',
        height: '100%',
        justifyContent: 'center',
    },

    profilePic: {
        margin: 5,
        marginLeft: 15,
        width: 50,
        height: 50,
        borderRadius: 80,
    },

    usernameText: {
        marginLeft: 40,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    ////////////////////////////////////////////
    //BottomPart
    ////////////////////////////////////////////
    messageContainer: {
        width: '100%',
        height: '93%',
        backgroundColor: "rgba(30, 70, 200, 1)"

    },

    messageInput: {
        width: '100%',
        height: '7%',
    },

});

export default chatStyles;