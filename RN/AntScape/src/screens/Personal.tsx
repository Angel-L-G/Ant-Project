import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import Rama from '../components/Rama';
import axios from 'axios';
import { AppContext } from '../components/AppContextProvider';

type Props = {}

const Personal = (props: Props) => {
    const ruta = "http://192.168.0.20:8080/api/";
    const {token} = useContext(AppContext);
    const [ramas, setRamas] = useState<Array<Number>>([]);
    const [eggs, setEggs] = useState(0);
    const [goldenEggs, setGoldenEggs] = useState(0);

    useEffect(() => {
        async function getYourself() {
            const response = await axios.get(ruta + "v2/users", {headers: { "Authorization": "Bearer " + token }});
            console.log(response.data);
            
            setEggs(response.data.eggs);
            setGoldenEggs(response.data.goldenEggs);
        }

        getYourself();
    }, [])

    function nuevaRama() {
        setRamas([...ramas, 0]);
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
                                data={ramas}
                                renderItem={({ item }) =>
                                    <Rama />
                                }
                                style={{}}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                            <TouchableHighlight onPress={() => nuevaRama()} style={{ justifyContent: "center", alignItems: 'center', backgroundColor: "rgb(28, 64, 169)", height: 80, width: 140, borderRadius: 30, borderWidth: 2, borderColor: "yellow" }}>
                                <View>
                                    <Text style={{ color: "yellow", fontSize: 20 }}>Nueva Rama</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                        <Text style={{ color: "yellow", fontSize: 20 }}>20ab</Text>
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
                        <Text style={{ color: "black", fontWeight: "bold" }}>{eggs}</Text>
                        <Image source={require('../img/FireAntEgg.webp')} style={{ width: "18%", height: "60%", borderRadius: 100, marginLeft: 5 }} />
                    </View>
                    <Image source={require('../img/tablon.png')} style={{ width: "16%", height: "60%", borderRadius: 100 }} />
                    <View style={{ position: 'absolute', marginLeft: 226, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "16%", height: "60%", borderRadius: 100, flexDirection: 'row' }}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>{goldenEggs}</Text>
                        <Image source={require('../img/GoldenAntEgg2.png')} style={{ width: "18%", height: "60%", borderRadius: 100, marginLeft: 5 }} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

export default Personal

const styles = StyleSheet.create({})