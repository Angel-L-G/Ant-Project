import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React, { useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Globals from '../components/Globals';
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';

type Props = {
    navigation: any
}

const CrearClan = ({navigation}: Props) => {
    const {ruta} = Globals();
    const {token} = useContext(AppContext);

    async function crearClan() {
        try {
            const body = {
                guild_name: "Prueba"
            }
            const response = await axios.post(ruta + "v2/guilds/createguild", body, { headers: { "Authorization": "Bearer " + token } });
            console.log(response.data);
            navigation.navigate("Social", {tab: 2});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}>
            <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
                <View style={{width: "85%", height: "85%", backgroundColor: "white", borderRadius: 25, borderWidth: 5, borderColor: "yellow", alignItems: 'center'}}>
                    <TouchableHighlight onPress={() => crearClan()} style={{backgroundColor: "red"}}>
                        <Text>Crear Clan</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </LinearGradient>
    )
}

export default CrearClan

const styles = StyleSheet.create({})