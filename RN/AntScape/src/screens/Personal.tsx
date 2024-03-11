import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import Rama from '../components/Rama';
import axios from 'axios';
import { AppContext } from '../components/AppContextProvider';
import { NestLevel } from '../components/types';

type Props = {}

const Personal = (props: Props) => {
    //const ruta = "http://192.168.0.20:8080/api/";
    //const ruta = "http://172.16.141.33:8080/api/";
    const ruta = "http://192.168.1.9:8080/api/";

    const {token, user} = useContext(AppContext);
    const [levels, setLevels] = useState<Array<NestLevel>>([]);
    const [lastLevel, setLastLevel] = useState<NestLevel>({} as NestLevel);

    useEffect(() => {
        async function getLevels() {
            const response = await axios.get(ruta + "v2/nests/" + user.id, {headers: { "Authorization": "Bearer " + token }});
            console.log(response.data);

            setLevels(response.data.nestLevels);
            setLastLevel(response.data.nestLevels[response.data.nestLevels?.length - 1]);
            console.log(levels[levels?.length - 1]);
            
        }
 
        getLevels();
    }, [])

    async function nuevaRama() {
        const coste = lastLevel?.multiplier * lastLevel?.cost + lastLevel.id * 100;
        const eggs = user.eggs;

        const dineroRestante = eggs - coste;

        const body = {
            eggs: eggs,
            goldenEggs: user.goldenEggs
        }

        if (user.eggs > eggs) {
            try {
                const response = await axios.put(ruta + "v2/users/updatemoney", body);
            } catch (error) {
                console.log(error);
            }
        } else {

        }

        
    }
 
    return (
        <ImageBackground source={require('../img/Muro.jpg')} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ width: "100%", height: "7%", backgroundColor: "rgb(28, 64, 169)" }}>

                </View>
                <View style={{ height: "93%", width: "100%" }}>
                    <View style={{ height: "30%", width: "100%" }}>
                        <Image source={require('../img/Background.png')} style={{ height: "100%", width: "100%" }} />
                    </View>

                    <View style={{ height: "70%", width: "100%" }}>
                        <View>
                            <FlatList
                                data={levels}
                                renderItem={({ item }) =>
                                    <Rama lastLevel={item}/>
                                }
                                style={{}}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                            <TouchableHighlight onPress={() => nuevaRama()} style={{ justifyContent: "center", alignItems: 'center', backgroundColor: "rgb(28, 64, 169)", height: 80, width: 140, borderRadius: 30, borderWidth: 2, borderColor: "yellow" }}>
                                <View>
                                    <Text style={{ color: "yellow", fontSize: 20 }}>Nueva Rama</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                        <Text style={{ color: "yellow", fontSize: 20 }}>{lastLevel?.multiplier * lastLevel?.cost + lastLevel.id * 100}</Text>
                                        <Image source={require('../img/FireAntEgg.webp')} style={{ width: 20, height: 30 }} />
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, width: "100%", height: "7%", justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', backgroundColor: "rgba(28, 64, 169, 0.8)", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}>
                    <Image source={require('../img/profile.png')} style={{ width: "10%", height: "70%", borderRadius: 100 }} />
                    <Image source={require('../img/tablon.png')} style={{ width: "16%", height: "60%", borderRadius: 100 }} />
                    <View style={{ position: 'absolute', marginLeft: 101, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "16%", height: "60%", borderRadius: 100, flexDirection: 'row' }}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>{user.eggs}</Text>
                        <Image source={require('../img/FireAntEgg.webp')} style={{ width: "18%", height: "60%", borderRadius: 100, marginLeft: 5 }} />
                    </View>
                    <Image source={require('../img/tablon.png')} style={{ width: "16%", height: "60%", borderRadius: 100 }} />
                    <View style={{ position: 'absolute', marginLeft: 226, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "16%", height: "60%", borderRadius: 100, flexDirection: 'row' }}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>{user.goldenEggs}</Text>
                        <Image source={require('../img/GoldenAntEgg2.png')} style={{ width: "18%", height: "60%", borderRadius: 100, marginLeft: 5 }} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

export default Personal

const styles = StyleSheet.create({})