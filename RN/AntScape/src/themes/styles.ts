import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },

    BackgorundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    formContainer: {
        backgroundColor: "white",
        height: 350,
        width: 260,
        marginTop: 100,
        borderRadius: 20,
        //borderColor: "yellow",
        //borderWidth: 5,
        padding: 20,
        alignItems: "center"
    },

    formContainerRegister: {
        backgroundColor: "white",
        height: 400,
        width: 300,
        marginTop: 100,
        borderRadius: 20,
        borderColor: "yellow",
        borderWidth: 5,
        padding: 20,
        alignItems: "center"
    },

    innerFormContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },  

    formTitle: {
        marginTop: 100
    },

    formText: {
        fontSize: 20,
        color: 'yellow',
        fontFamily: "MadimiOneRegular",
        width: 100,
        marginRight: 20,
        textAlign: "left"
    },

    enlaceText: {
        fontSize: 15,
        textDecorationLine: 'underline',
        color: 'white',
    },

    button: {
        padding: 10,
        color: 'white',
        border: 'none',
        radius: 4,
        cursor: 'pointer',
        width: 120,
    },

    nestViewContainer: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        minHeight: 150,
        gap: 15
    },

    nestImage: {
        width: 200,
        height: 100,
    },

    netsButtons: {
        gap: 20,
        alignItems: 'center',
    },

    profileBar:{
        flexDirection: 'row',
        gap: 50,
        justifyContent: 'space-between',
        backgroundColor: "#377d72",
        width: '100%',
        height: 60,
    },

    profilePicture:{
        margin: 5,
        width: 50,
        height: 50,
        borderRadius: 80,
    },

    bigProfilePicture:{
        width: 150,
        height: 150,
        borderRadius: 80,
        marginTop: "3%"
    },

    mainConatiner:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#483a39',
    },

    title: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icono: {
        marginTop: 10,
        width: 50,
        height: 50,
    },

    messageContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        width: '85%',
        backgroundColor: '#c2bcbe',
        gap: 15,
    },

    messageText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },

    chatContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    friendsScrollConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        backgroundColor: '#11211e',
    },

    friendsText: {
        color: 'white',
    },

    chatInput:{
        width: '100%',
        backgroundColor: '#e9e1cc',
        gap: 15,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10%',
        backgroundColor: '#7f5f16'
    },

    subTitle: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header3: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textBody: {
        fontSize: 13,
        color: 'black',
    },

    textBodyContainer: {
        width: '80%',
        height: '10%',
    },

    crearBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#11211e'
    },

    friendProfileList: {
        flex: 1,
        width: "60%",
        height: "100%",
        backgroundColor: "#c2bcbe",
        marginTop: "3%",
        marginBottom: "3%"
    },

    gameTop: {
        paddingTop: "5%",
        height: 400,
        //height: "70%",
        width: "90%",
        backgroundColor: "black"    
    },
    
    gameBotom: {
        height: "25%",
        width: "90%",
        backgroundColor: "gray"
    },

    friendProfileItem: {
        width: "100%",
        color: "black",
        fontSize: 13,
    },
})

export default styles