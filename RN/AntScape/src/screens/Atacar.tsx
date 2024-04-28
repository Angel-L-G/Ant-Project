import { StyleSheet, Text, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Globals from '../components/Globals'
import { AppContext } from '../context/AppContextProvider'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { ClanType } from '../types/types'
import { Icon, Image } from 'react-native-elements'
import { FlatList } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, "Atacar">;

const Atacar = ({ navigation, route }: Props) => {
    const clan = route.params.clan;
    const { ruta } = Globals();
    const { token, user } = useContext(AppContext);
    const [enemigo, setEnemigo] = useState<ClanType>({} as ClanType);
    const [ultimasTiradas, setUltimasTiradas] = useState<Array<number>>([]);

    useEffect(() => {
        async function buscarOponente() {
            try {
                const response = await axios.get(ruta + "v2/guilds/" + clan.id + "/seekChallenger", { headers: { "Authorization": "Bearer " + token } });
                console.log(response.data);
                setEnemigo(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        buscarOponente();
    }, [])

    function apostar() {
        const dadoAleatorio = Math.floor(Math.random() * 6) + 1;

        if (ultimasTiradas.length < 4) {
            setUltimasTiradas([...ultimasTiradas, dadoAleatorio]);
        } else {
            const nuevasTiradas = ultimasTiradas.slice(1);
            setUltimasTiradas([...nuevasTiradas, dadoAleatorio]);
        }

        console.log(dadoAleatorio);
        console.log(ultimasTiradas);
        
    }

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
            <View style={{ width: "100%", height: "7%", backgroundColor: "rgb(28, 64, 169)", justifyContent: "space-around", alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ width: "11%", height: "80%" }}>
                    <Image source={{ uri: ruta + "v1/files/" + user.img }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                </View>
                <View>
                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>{clan.name}</Text>
                </View>
                <View style={{ width: "20%", height: "60%" }}>
                    <Image source={require('../assets/imgs/tablon.png')} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                </View>
                <View style={{ position: 'absolute', marginLeft: 253, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0, 0, 0, 0.6)", width: "20%", height: "60%", borderRadius: 100, flexDirection: 'row' }}>
                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>{clan.trophys}</Text>
                    <View style={{ width: "18%", height: "60%", marginLeft: 5 }}>
                        <Image source={require('../assets/imgs/Trophy.png')} style={{ width: "100%", height: "100%" }} />
                    </View>
                </View>
            </View>
            <View style={{ width: "100%", height: "82%" }}>

            </View>
            <View style={{ width: "100%", height: "11%" }}>
                <View style={{ flexDirection: "row", width: "100%", height: "100%" }}>
                    <View style={{ width: "37.5%", height: "100%", backgroundColor: "red" }}>
                        <View style={{backgroundColor: "purple", height: "100%", width: "100%"}}>
                            <FlatList
                                data={ultimasTiradas}
                                renderItem={({ item }) =>
                                    <View style={{marginHorizontal: "2%", width: "21%", backgroundColor: "red"}}>
                                        <Text>{item}</Text>
                                    </View>
                                }
                                style={{}}
                                numColumns={4}
                            />
                        </View>
                    </View>
                    <View style={{ width: "25%", height: "100%", backgroundColor: "blue", alignItems: 'center', justifyContent: "center" }}>
                        <TouchableHighlight onPress={() => apostar()} style={{ height: "80%", width: "74%", backgroundColor: "yellow", borderRadius: 100, alignItems: 'center', justifyContent: "center" }}>
                            <Icon name="dice" size={40} color={"black"}></Icon>
                        </TouchableHighlight>
                    </View>
                    <View style={{ width: "37.5%", height: "100%", backgroundColor: "green" }}>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default Atacar

const styles = StyleSheet.create({})