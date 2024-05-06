import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';


type Props = {
    navigation: any,
    icono: string,
    colorIcono: string,
    colorFondo: string
}

const ShieldClanCard = ({navigation, colorFondo, colorIcono, icono}: Props) => {

    return (
        <View style={{backgroundColor: colorFondo, padding: "10%", marginBottom: "20%", borderRadius: 50}}>
            <Icon name={icono} size={50} color={colorIcono}></Icon>
        </View>
    )
}

export default ShieldClanCard

const styles = StyleSheet.create({})