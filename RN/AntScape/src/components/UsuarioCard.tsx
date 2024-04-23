import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { User } from '../types/types'
import { Image } from 'react-native-elements'
import Globals from './Globals';

type Props = {
    user: User,
    navigation: any
}

const UsuarioCard = ({user, navigation}: Props) => {
    const {ruta} = Globals();

    return (
        <View style={{ height: 80, padding: 5, margin: 15, flexDirection: 'row'}}>
            <Image source={{uri: ruta + "v1/files/" + user.img}} style={{height: "100%", width: 70, borderRadius: 100}} />
            <View style={{width: "61%"}}>
                <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center', marginBottom: 10}}>{user.name}</Text>
                {(user.id_guild == null) ? 
                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center'}}>Sin Clan</Text> 
                : 
                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center'}}>Con Clan</Text>
                }
            </View>
            <View style={{width: "20%"}}>
                <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => navigation.navigate("NuevoChat", {idOtherUser: user.id, nameOtherUser: user.name})} style={{justifyContent: 'center', alignItems: 'center', height: "100%", borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "#2196F3"}}>
                    <Text style={{color: "yellow", fontFamily: "MadimiOneRegular", fontSize: 18}}>Chat</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default UsuarioCard

const styles = StyleSheet.create({})