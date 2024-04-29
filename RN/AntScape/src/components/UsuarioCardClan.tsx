import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useContext } from 'react'
import { ClanType, User } from '../types/types'
import { Image } from 'react-native-elements'
import Globals from './Globals';
import { AppContext } from '../context/AppContextProvider';

type Props = {
    usu: User,
    clan: ClanType,
    navigation: any
}

const UsuarioCardClan = ({usu, navigation, clan}: Props) => {
    const {ruta} = Globals();
    const {user} = useContext(AppContext);

    return (
        <View style={{ height: 80, padding: 5, margin: 15, flexDirection: 'row'}}>
            <Image source={{uri: ruta + "v1/files/" + usu.img}} style={{height: "100%", width: 70, borderRadius: 100}} />
            <View style={{width: "61%"}}>
                <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center', marginBottom: 10}}>{usu.name}</Text>
                {(usu.id != clan.leader) ? 
                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center'}}>Miembro</Text> 
                : 
                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center'}}>Lider</Text>
                }
            </View>
            <View style={{width: "20%"}}>
                {(user.id == usu.id) ?
                    <></>
                :
                    <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => navigation.navigate("NuevoChat", {name: usu.name})} style={{justifyContent: 'center', alignItems: 'center', height: "100%", borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "#2196F3"}}>
                        <Text style={{color: "yellow", fontFamily: "MadimiOneRegular", fontSize: 18}}>Chat</Text>
                    </TouchableHighlight>
                }
            </View>
        </View>
    )
}

export default UsuarioCardClan

const styles = StyleSheet.create({})