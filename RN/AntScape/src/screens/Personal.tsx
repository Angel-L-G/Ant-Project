import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import Rama from '../components/Rama';
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';
import { Nest, NestLevel } from '../types/types';
import Globals from '../components/Globals';
import NavBarBotton from '../components/NavBarBotton';
import NavBarTop from '../components/NavBarTop';

type Props = {
    navigation: any
}

const Personal = ({ navigation }: Props) => {
    const { ruta } = Globals();
    const { token, user, totalEggsContext, goldenEggsContext, eggsContext, setEggsContext, setTotalEggsContext, setGoldenEggsContext } = useContext(AppContext);
    const [levels, setLevels] = useState<Array<NestLevel>>([]);
    const [lastLevel, setLastLevel] = useState<NestLevel>({} as NestLevel);
    const [eggs, setEggs] = useState(0);
    const eg = useRef(0);
    const totalEggs = useRef(0);
    const [nests, setNests] = useState<Array<Nest>>([]);

    useEffect(() => {
        setEggs(user.eggs);
        eg.current = user.eggs;
        totalEggs.current = user.totalMoneyGenerated;
        setEggsContext(user.eggs);
        setTotalEggsContext(user.totalMoneyGenerated);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaa" + user.goldenEggs);

        setGoldenEggsContext(user.goldenEggs);

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

        const coste = Math.round(lastLevel?.multiplier ** levels.length * 100);
        const cantidadEg = eg.current;

        const dineroRestante = Math.round(cantidadEg - coste);

        const body = {
            eggs: dineroRestante
        }

        const newMult = lastLevel.multiplier + 0.2;

        const nestlevel: NestLevel = {
            id: 0,
            cost: 10 * newMult,
            id_nest: nests[0].id,
            name: "" + Number(levels.length + 1),
            level: 1,
            multiplier: newMult,
            production: 2 * newMult
        }

        console.log("Current" + eg.current);
        console.log(eg.current > coste);

        if (eg.current > coste) {
            try {
                const responseN = await axios.post(ruta + "v2/nestlevels", nestlevel, { headers: { "Authorization": "Bearer " + token } });
                console.log(responseN.data);

                const responseNi = await axios.get(ruta + "v2/nests/own/" + user.name, { headers: { "Authorization": "Bearer " + token } });

                setLevels(responseNi.data[0].nestLevels);
                setLastLevel(responseNi.data[0].nestLevels[responseNi.data[0].nestLevels?.length - 1]);

                const response = await axios.put(ruta + "v2/users/update/eggs", body, { headers: { "Authorization": "Bearer " + token } });
                eg.current = dineroRestante;
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("No tienes huevos");
            console.log(eg.current);
            ToastAndroid.show("Huevos insuficientes", ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        const intervalo = setInterval(() => {
            async function updateMoney() {
                console.log(goldenEggsContext);

                console.log(totalEggs.current);

                console.log(eggsContext);

                try {
                    const response = await axios.put(ruta + "v2/users/update/eggs", eg.current + "", { headers: { "Authorization": "Bearer " + token, "Content-Type": "text/plain" } });

                } catch (error) {
                    console.log(error);
                }

                try {
                    const response = await axios.put(ruta + "v2/users/update/totalmoney", totalEggs.current + "", { headers: { "Authorization": "Bearer " + token, "Content-Type": "text/plain" } });

                } catch (error) {
                    
                }
            }
            updateMoney();
            console.log('Esta función se ejecutará cada 5 segundos');
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    async function ganarDinero(produccion: number) {

        let eggs1 = eg.current;

        let eggs2 = totalEggs.current;

        if (lastLevel) {
            const dineroNuevo = Math.round((Number)(eggs1) + (Number)(produccion));

            updateEggs(dineroNuevo);
        }

        if (produccion > 0) {
            const dineroNuevo = Math.round((Number)(eggs2) + (Number)(produccion));

            setTotalEggsContext(dineroNuevo);
            totalEggs.current = dineroNuevo;
        }
    }

    function updateLevels(ramas: Array<NestLevel>) {
        setLevels(ramas);
    }

    function updateEggs(egg: number) {
        setEggs(egg);
        eg.current = egg;
        setEggsContext(eg.current);
    }

    return (
        <ImageBackground source={require('../assets/imgs/Muro.jpg')} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <NavBarTop navigation={navigation} />

                <View style={{ height: "93%", width: "100%" }}>
                    <View style={{ height: "30%", width: "100%" }}>
                        <Image source={require('../assets/imgs/Background.png')} style={{ height: "100%", width: "100%" }} />
                    </View>

                    <View style={{ height: "63%", width: "100%" }}>
                        <ScrollView>
                            <View>
                                <FlatList
                                    data={levels}
                                    renderItem={({ item }) =>
                                        <Rama lastLevel={lastLevel} updateEggs={updateEggs} updateLevels={updateLevels} actualLevel={item} ganarDinero={ganarDinero} eg={eg.current} />
                                    }
                                    style={{}}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30, marginBottom: 30 }}>
                                <TouchableHighlight underlayColor={'rgb(10, 40, 142)'} onPress={() => nuevaRama()} style={{ justifyContent: "center", alignItems: 'center', backgroundColor: "rgb(28, 64, 169)", height: 80, width: 140, borderRadius: 30, borderWidth: 2, borderColor: "yellow" }}>
                                    <View>
                                        <Text style={{ color: "yellow", fontSize: 20 }}>Nueva Rama</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                            <Text style={{ color: "yellow", fontSize: 20 }}>{abreviarNumero(Math.round(lastLevel?.multiplier ** levels.length * 100))}</Text>
                                            <Image source={require('../assets/imgs/FireAntEgg.webp')} style={{ width: 20, height: 30 }} />
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </ScrollView>
                    </View>

                    <NavBarBotton navigation={navigation} icon='personal' />
                </View>
            </View>
        </ImageBackground>
    );
}

export default Personal

const styles = StyleSheet.create({})
