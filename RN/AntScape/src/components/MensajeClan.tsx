import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Message } from '../types/chatTypes'
import { es } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

type Props = {
    mensaje: Message
}

const MensajeClan = ({mensaje}: Props) => {
    return (
        <View style={{ alignSelf: 'flex-end' }}>
            <Text style={{ color: "black", marginTop: 10, marginRight: 16, fontFamily: "MadimiOneRegular", fontSize: 16 }}>{mensaje.sentAt && formatDistanceToNow(new Date(mensaje.sentAt), { addSuffix: true, locale: es })}</Text>
            <View style={styles.myMessage}>
                <Text style={{ ...styles.messageText, color: "black" }}>{mensaje.body}</Text>
            </View>
        </View>
    )
}

export default MensajeClan

const styles = StyleSheet.create({
    myMessage: {
        borderBottomEndRadius: 0,
        alignSelf: 'flex-end',
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