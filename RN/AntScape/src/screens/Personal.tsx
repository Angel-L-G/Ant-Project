import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import Rama from '../components/Rama';
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';
import { Nest, NestLevel } from '../components/types';
import Globals from '../components/Globals';

type Props = {
    navigation: any
}

const Personal = ({ navigation }: Props) => {
    const { ruta } = Globals();
    const { token, user } = useContext(AppContext);
    const [levels, setLevels] = useState<Array<NestLevel>>([]);
    const [lastLevel, setLastLevel] = useState<NestLevel>({} as NestLevel);
    const [eggs, setEggs] = useState(0);
    const eg = useRef(0);
    const [nests, setNests] = useState<Array<Nest>>([]);

    useEffect(() => {
        setEggs(user.eggs);
        eg.current = user.eggs;

        async function getOwnNests() {
            const response = await axios.get(ruta + "v2/nests/own/" + user.name, { headers: { "Authorization": "Bearer " + token } });

            setLevels(response.data[0].nestLevels);
            setLastLevel(response.data[0].nestLevels[response.data[0].nestLevels?.length - 1]);

            setNests(response.data);
        }

        getOwnNests();
    }, [])

    function abreviarNumero(valor: number): string {
        if (valor < 10000) {
            return valor.toString();
        } else if (valor < 1000000) {
            const parteDecimal = Math.floor((valor % 1000) / 10); // Extraer la parte decimal y redondear hacia abajo
            const parteEntera = Math.floor(valor / 1000);
            return `${parteEntera}.${parteDecimal.toString().padStart(2, '0')}K`;
        } else if (valor < 1000000000) {
            const parteDecimal = Math.floor((valor % 1000000) / 10000); // Extraer la parte decimal y redondear hacia abajo
            const parteEntera = Math.floor(valor / 1000000);
            return `${parteEntera}.${parteDecimal.toString().padStart(2, '0')}M`;
        } else if (valor < 1000000000000) {
            const parteDecimal = Math.floor((valor % 1000000000) / 10000000); // Extraer la parte decimal y redondear hacia abajo
            const parteEntera = Math.floor(valor / 1000000000);
            return `${parteEntera}.${parteDecimal.toString().padStart(2, '0')}B`;
        } else {
            const parteDecimal = Math.floor((valor % 1000000000000) / 10000000000); // Extraer la parte decimal y redondear hacia abajo
            const parteEntera = Math.floor(valor / 1000000000000);
            return `${parteEntera}.${parteDecimal.toString().padStart(2, '0')}T`;
        }
    }

    async function nuevaRama() {
        console.log(lastLevel);

        const coste = lastLevel?.multiplier * lastLevel?.cost + lastLevel.id * 100;
        const cantidadEggs = eggs;
        const cantidadEg = eg.current;

        const dineroRestante = Math.round(cantidadEg - coste);

        const body = {
            eggs: dineroRestante,
            goldenEggs: user.goldenEggs
        }

        const newMult = lastLevel.multiplier + 0.05;

        const nestlevel: NestLevel = {
            id: Number(lastLevel.id) + 1,
            cost: lastLevel.cost * newMult,
            id_nest: nests[0].id,
            name: "" + Number(lastLevel.id) + 1,
            level: 1,
            multiplier: newMult,
            production: lastLevel.production * newMult
        }

        if (eg.current > coste) {
            try {
                const responseN = await axios.post(ruta + "v2/nestlevels", nestlevel, { headers: { "Authorization": "Bearer " + token } });
                console.log(responseN.data);

                const responseNi = await axios.get(ruta + "v2/nests/own/" + user.name, { headers: { "Authorization": "Bearer " + token } });

                setLevels(responseNi.data[0].nestLevels);
                setLastLevel(responseNi.data[0].nestLevels[responseNi.data[0].nestLevels?.length - 1]);

                const response = await axios.put(ruta + "v2/users/updatemoney", body, { headers: { "Authorization": "Bearer " + token } });
                eg.current = dineroRestante;
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("No tienes huevos");
            console.log(eg.current);

        }
    }

    useEffect(() => {
        const intervalo = setInterval(() => {
            async function updateMoney() {
                const body = {
                    eggs: eg.current,
                    goldenEggs: user.goldenEggs
                }

                try {
                    const response = await axios.put(ruta + "v2/users/updatemoney", body, { headers: { "Authorization": "Bearer " + token } });

                } catch (error) {
                    console.log(error);
                }
            }
            updateMoney();
            console.log('Esta función se ejecutará cada 5 segundos');
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    async function ganarDinero(produccion: number) {
        let eggs1 = eg.current;

        if (lastLevel) {
            const dineroNuevo = Math.round((Number)(eggs1) + (Number)(produccion));

            updateEggs(dineroNuevo);
        }
    }

    function updateLevels(ramas: Array<NestLevel>) {
        setLevels(ramas);
    }

    function updateEggs(egg: number) {
        setEggs(egg);
        eg.current = egg;
        console.log(eg.current);
    }

    function goToProfile() {
        navigation.navigate("Profile");
    }

    return (
        <ImageBackground source={require('../assets/imgs/Muro.jpg')} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ width: "100%", height: "7%", backgroundColor: "rgb(28, 64, 169)" }}>

                </View>
                <View style={{ height: "93%", width: "100%" }}>
                    <View style={{ height: "30%", width: "100%" }}>
                        <Image source={require('../assets/imgs/Background.png')} style={{ height: "100%", width: "100%" }} />
                    </View>

                    <View style={{ height: "70%", width: "100%" }}>
                        <ScrollView>
                            <View>
                                <FlatList
                                    data={levels}
                                    renderItem={({ item }) =>
                                        <Rama lastLevel={lastLevel} updateEggs={updateEggs} updateLevels={updateLevels} actualLevel={item} ganarDinero={ganarDinero} eg={eg.current}/>
                                    }
                                    style={{}}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                                <TouchableHighlight onPress={() => nuevaRama()} style={{ justifyContent: "center", alignItems: 'center', backgroundColor: "rgb(28, 64, 169)", height: 80, width: 140, borderRadius: 30, borderWidth: 2, borderColor: "yellow" }}>
                                    <View>
                                        <Text style={{ color: "yellow", fontSize: 20 }}>Nueva Rama</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                            <Text style={{ color: "yellow", fontSize: 20 }}>{lastLevel?.multiplier * lastLevel?.cost + lastLevel?.id * 100}</Text>
                                            <Image source={require('../assets/imgs/FireAntEgg.webp')} style={{ width: 20, height: 30 }} />
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <View style={{ flex: 1, width: "100%", height: "7%", justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', backgroundColor: "rgba(28, 64, 169, 0.8)", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}>
                    <TouchableOpacity onPress={() => goToProfile()} style={{ width: "10%", height: "80%" }}>
                        <Image source={require('../assets/imgs/profile.png')} style={{ width: 50, height: "100%", borderRadius: 100 }} />
                    </TouchableOpacity>
                    <Image source={require('../assets/imgs/tablon.png')} style={{ width: "20%", height: "60%", borderRadius: 100 }} />
                    <View style={{ position: 'absolute', marginLeft: 92, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "20%", height: "60%", borderRadius: 100, flexDirection: 'row' }}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>{abreviarNumero(eggs)}</Text>
                        <Image source={require('../assets/imgs/FireAntEgg.webp')} style={{ width: "18%", height: "60%", borderRadius: 100, marginLeft: 5 }} />
                    </View>
                    <Image source={require('../assets/imgs/tablon.png')} style={{ width: "20%", height: "60%", borderRadius: 100 }} />
                    <View style={{ position: 'absolute', marginLeft: 226, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "20%", height: "60%", borderRadius: 100, flexDirection: 'row' }}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>{user.goldenEggs}</Text>
                        <Image source={require('../assets/imgs/GoldenAntEgg2.png')} style={{ width: "18%", height: "60%", borderRadius: 100, marginLeft: 5 }} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

export default Personal

const styles = StyleSheet.create({})