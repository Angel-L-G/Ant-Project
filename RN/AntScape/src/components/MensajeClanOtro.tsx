import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Message } from '../types/chatTypes'
import { es } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'
import Globals from './Globals'
import { User } from '../types/types'
import { Image } from 'react-native-elements'

type Props = {
    mensaje: Message
}

const MensajeClanOtro = ({ mensaje }: Props) => {
    const { ruta } = Globals();

    return (
        <View style={{ alignSelf: 'flex-start' }}>
            <Text style={{ color: "black", marginTop: 10, marginLeft: 16, fontFamily: "MadimiOneRegular", fontSize: 16, textAlign: "left" }}>{mensaje.sentAt && formatDistanceToNow(new Date(mensaje.sentAt), { addSuffix: true, locale: es })}</Text>
            <View style={{flexDirection: "row"}}>
                <View style={styles.otherMessage}>
                    <Text style={{ ...styles.messageText, color: "black" }}>{mensaje.body}</Text>
                </View>
            </View>
        </View>
    )
}

export default MensajeClanOtro

const styles = StyleSheet.create({
    otherMessage: {
        borderBottomStartRadius: 0,
        alignSelf: 'flex-start',
        backgroundColor: '#00a8d6',
        borderRadius: 18,
        marginVertical: 6,
        marginHorizontal: 16,
        padding: 8,
        elevation: 5,
    },
    messageText: {
        fontSize: 14,
        fontFamily: "MadimiOneRegular",
    },
})