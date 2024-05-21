import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Message } from '../types/chatTypes'
import { es } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import { Image } from 'react-native-elements'
import Globals from './Globals'
import { AppContext } from '../context/AppContextProvider'

type Props = {
    mensaje: Message
}

const MensajeClan = ({mensaje}: Props) => {
    const { ruta } = Globals();
    const { user } = useContext(AppContext);

    return (
        <View style={{ alignSelf: 'flex-end' }}>
            <Text style={{ color: "black", marginTop: 10, marginLeft: 16, fontFamily: "MadimiOneRegular", fontSize: 16 }}>{mensaje.sentAt && formatDistanceToNow(new Date(mensaje.sentAt), { addSuffix: true, locale: es })}</Text>
            <View style={{flexDirection: "row"}}>
                <View style={styles.myMessage}>
                    <Text style={{ ...styles.messageText, color: "black" }}>{mensaje.body}</Text>
                </View>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Image source={{ uri: ruta + "v1/files/" + user.img }} style={{ width: 30, height: 30, borderRadius: 100, borderColor: "black", borderWidth: 1 }} />
                    <Text style={{color: "yellow"}}>{user.name}</Text>
                </View>
            </View>
        </View>
    )
}

export default MensajeClan

const styles = StyleSheet.create({
    myMessage: {
        borderBottomEndRadius: 0,
        backgroundColor: '#D68200',
        borderRadius: 18,
        marginVertical: 6,
        marginHorizontal: 16,
        padding: 8,
        elevation: 5,
        maxWidth: '60%',
    },
    messageText: {
        fontSize: 14,
        fontFamily: "MadimiOneRegular",
    },
})