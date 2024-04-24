import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native';
import React, { useContext, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Globals from '../components/Globals';
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';

type Props = {
    navigation: any
}

const CrearClan = ({navigation}: Props) => {
    const {ruta} = Globals();
    const {token, setUser, user} = useContext(AppContext);
    const [descripcion, setDescripcion] = useState('');
    const [nombre, setNombre] = useState('');

    async function crearClan() {
        try {
            const params = {
                guildName: nombre,
                guildDescription: descripcion,
            }
            const response = await axios.post(ruta + "v2/guilds", null, { params: params, headers: { "Authorization": "Bearer " + token } });
            console.log(response.data);
            setUser({...user, id_guild: response.data.id});

            try {
                
            } catch (error) {
                
            }

            navigation.navigate("Social", {tab: 2});
        } catch (error) {
            console.log(error);
        }
    }

    function volver() {
        navigation.goBack();
    }

    return (
        <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}>
            <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
                <View style={{width: "85%", height: "85%", backgroundColor: "white", borderRadius: 25, borderWidth: 5, borderColor: "yellow", alignItems: 'center'}}>
                    <View style={{height: "40%", backgroundColor: "red", width: "100%"}}>

                    </View>

                    <View style={{height: "45%", width: "100%", backgroundColor: "blue"}}>
                    
                        <TextInput
                            multiline
                            numberOfLines={4} 
                            onChangeText={setDescripcion}
                            value={descripcion}
                            style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, fontSize: 16, textAlignVertical: 'top',}}
                            placeholder="Descripción del Clan..."
                        />

                        <TextInput
                            onChangeText={setNombre}
                            value={nombre}
                            style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, fontSize: 16, marginTop: 10}}
                            placeholder="Nombre del Clan..."
                        />
                    </View>

                    <TouchableHighlight onPress={() => crearClan()} style={{backgroundColor: "red", marginTop: 42}}>
                        <Text>Crear Clan</Text>
                    </TouchableHighlight>

                    <View style={{position: 'absolute'}}>
                        <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{width: 40, height: 40, borderRadius: 100, bottom: "50%", left: "430%"}}>
                            <TouchableHighlight underlayColor={"rgba(20, 40, 140, 1)"} onPress={volver} style={{width: 40, height: 40, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)"}}>
                                <Text style={{fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 26}}>X</Text>
                            </TouchableHighlight>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default CrearClan

const styles = StyleSheet.create({})