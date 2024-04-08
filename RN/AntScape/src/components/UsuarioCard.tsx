import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { User } from './types'
import { Image } from 'react-native-elements'
import Globals from './Globals';

type Props = {
    user: User
}

const UsuarioCard = ({user}: Props) => {
    const {ruta} = Globals();

    return (
        <View style={{ height: 80, padding: 5, margin: 15, flexDirection: 'row'}}>
            <Image source={{uri: ruta + "v1/files/" + user.img}} style={{height: "100%", width: 70, borderRadius: 100}} />
            <View style={{width: "61%"}}>
                <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center', marginBottom: 10}}>{user.name}</Text>
                {(user.id_guild == null) ? 
                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center'}}>Sin Guild</Text> 
                : 
                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center'}}>Con Guild</Text>
                }
            </View>
        </View>
    )
}

export default UsuarioCard

const styles = StyleSheet.create({})