import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ClanType } from '../types/types'
import { Image } from 'react-native-elements'
import Globals from './Globals'
import { AppContext } from '../context/AppContextProvider'

type Props = {
    clan: ClanType,
    navigation: any
}

const ClanCard = ({clan, navigation}: Props) => {
    const {ruta} = Globals();
    const {user} = useContext(AppContext);

    return (
        <View style={{ height: 80, padding: 5, margin: 15, flexDirection: 'row'}}>
            <Image source={{uri: ruta + "v1/files/" + user.img}} style={{height: "100%", width: 70, borderRadius: 100}} />
            <View style={{width: "56%", marginLeft: "5%", height: "100%", marginTop: -10}}>
                <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center', marginBottom: 5, textDecorationLine: 'underline'}}>{clan.name}</Text>
                <Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", textAlign: 'center', marginBottom: 10}} numberOfLines={2} ellipsizeMode='tail'>{clan.description}</Text>
            </View>
            <View style={{justifyContent: 'center', marginLeft: 15}}>
                <Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", textAlign: 'center', marginBottom: 10}}>{clan.quantity} / 40</Text>
            </View>
        </View>
    )
}

export default ClanCard

const styles = StyleSheet.create({})