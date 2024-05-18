import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ClanType, User } from '../types/types'
import { Image } from 'react-native-elements'
import Globals from './Globals';
import { AppContext } from '../context/AppContextProvider';
import axios from 'axios';

type Props = {
    usu: User,
    navigation: any
}

const UsuarioCard = ({ usu, navigation }: Props) => {
    const { ruta } = Globals();
    const { user, token } = useContext(AppContext);
    const [clan, setClan] = useState<ClanType>({} as ClanType);
    const [bloqueado, setBloqueado] = useState(false);

    useEffect(() => {
        async function getClan() {
            try {
                const response = await axios.get(ruta + "v2/users/me/guild", { headers: { "Authorization": "Bearer " + token } });
                console.log(response.data);
                setClan(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getClan();

        async function verificarBloqueo() {
            try {
                const response = await axios.get(ruta + "v2/users/" + user.id + "/bloqued", { headers: { "Authorization": "Bearer " + token } });
                console.log(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].id == usu.id) {
                        setBloqueado(true);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        verificarBloqueo();
    }, [])

    return (
        <View style={{ height: 80, padding: 5, margin: 15, flexDirection: 'row' }}>
            <Image source={{ uri: ruta + "v1/files/" + usu.img }} style={{ height: "100%", width: 70, borderRadius: 100 }} />
            <View style={{ width: "61%" }}>
                <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center', marginBottom: 10 }}>{usu.name}</Text>
                {(clan == null) ?
                    <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center' }}>Sin Clan</Text>
                    :
                    <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center' }}>{clan.name}</Text>
                }
            </View>
            <View style={{ width: "20%" }}>
                {(user.id == usu.id || bloqueado) ?
                    <></>
                    :
                    <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => navigation.navigate("NuevoChat", { idOtherUser: usu.id, nameOtherUser: usu.name })} style={{ justifyContent: 'center', alignItems: 'center', height: "100%", borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "#2196F3" }}>
                        <Text style={{ color: "yellow", fontFamily: "MadimiOneRegular", fontSize: 18 }}>Chat</Text>
                    </TouchableHighlight>
                }
            </View>
        </View>
    )
}

export default UsuarioCard

const styles = StyleSheet.create({})