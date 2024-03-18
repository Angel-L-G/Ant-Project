import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import Rama from '../components/Rama';
import axios from 'axios';
import { AppContext } from '../components/AppContextProvider';
import { Nest, NestLevel } from '../components/types';
import Globals from '../components/Globals';

const Personal = (props: any) => {
    const {ruta} = Globals();
    const {token, user} = useContext(AppContext);
    const [levels, setLevels] = useState<Array<NestLevel>>([]);
    const [lastLevel, setLastLevel] = useState<NestLevel>({} as NestLevel);
    const [eggs, setEggs] = useState(0);
    const [nests, setNests] = useState<Array<Nest>>([]);

    useEffect(() => {
        console.log(user);
        console.log(eggs);

        setEggs(user.eggs);

        async function getOwnNests() {
            const response = await axios.get(ruta + "v2/nests/own/" + user.id, {headers: { "Authorization": "Bearer " + token }});
            console.log(response.data[0]);

            setLevels(response.data[0].nestLevels);
            setLastLevel(response.data[0].nestLevels[response.data[0].nestLevels?.length - 1]);
            console.log(levels[levels?.length - 1]);
            

            setNests(response.data);
        }

        getOwnNests();
    }, [])

    async function nuevaRama() {
        const coste = lastLevel?.multiplier * lastLevel?.cost + lastLevel.id * 100;
        const eggs = user.eggs;

        const dineroRestante = Math.round(eggs - coste);

        const body = {
            eggs: dineroRestante,
            goldenEggs: user.goldenEggs
        }

        const newMult = lastLevel.multiplier + 0.05;

        const nestlevel: NestLevel = {
            id: 0,
            cost: lastLevel.cost * newMult,
            id_nest: nests[0].id,
            name: "string",
            level: lastLevel.id + 1,
            multiplier: newMult,
            production: lastLevel.production * newMult
        }

        if (eggs > coste) {
            try {
                const responseN = await axios.post(ruta + "v2/nestlevels", nestlevel, {headers: { "Authorization": "Bearer " + token }});
                console.log(responseN.data);

                const responseNi = await axios.get(ruta + "v2/nests/" + user.id, {headers: { "Authorization": "Bearer " + token }});
                console.log("hola" + responseNi.data);

                setLevels(responseNi.data.nestLevels);
                setLastLevel(responseNi.data.nestLevels[responseNi.data.nestLevels?.length - 1]);

                const response = await axios.put(ruta + "v2/users/updatemoney", body, {headers: { "Authorization": "Bearer " + token }});
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        } else {

        }

        
    }

    function updateEggs(egg: number) {
        setEggs(egg);
        console.log(eggs);
        
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
                        <ScrollView>
                            <View>
                                <FlatList
                                    data={levels}
                                    renderItem={({ item }) =>
                                        <Rama lastLevel={item} updateEggs={updateEggs}/>
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
                        </ScrollView>
                    </View>
                </View>

                <View style={{ flex: 1, width: "100%", height: "7%", justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', backgroundColor: "rgba(28, 64, 169, 0.8)", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}>
                    <Image source={require('../img/profile.png')} style={{ width: "10%", height: "70%", borderRadius: 100 }} />
                    <Image source={require('../img/tablon.png')} style={{ width: "16%", height: "60%", borderRadius: 100 }} />
                    <View style={{ position: 'absolute', marginLeft: 101, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "16%", height: "60%", borderRadius: 100, flexDirection: 'row' }}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>{eggs}</Text>
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