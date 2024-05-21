import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Message } from '../types/chatTypes'
import { es } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import { Image } from 'react-native-elements'
import Globals from './Globals'
import { AppContext } from '../context/AppContextProvider'

type Props = {
    mensaje: Message
}

const MensajeClan = ({ mensaje }: Props) => {

    return (
        <View style={{ alignSelf: 'flex-end' }}>
            <Text style={{ color: "black", marginTop: 10, marginLeft: 16, fontFamily: "MadimiOneRegular", fontSize: 16, textAlign: "right" }}>{mensaje.sentAt && formatDistanceToNow(new Date(mensaje.sentAt), { addSuffix: true, locale: es })}</Text>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                <View style={styles.myMessage}>
                    <Text style={{ ...styles.messageText, color: "black" }}>{mensaje.body}</Text>
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
        maxWidth: '80%',
        alignSelf: "flex-end"
    },
    messageText: {
        fontSize: 14,
        fontFamily: "MadimiOneRegular",
    },
})