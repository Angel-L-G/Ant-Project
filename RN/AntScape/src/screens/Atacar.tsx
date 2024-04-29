import { StyleSheet, Text, TouchableOpacity, View, TouchableHighlight, Touchable, Modal, Alert, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Globals from '../components/Globals'
import { AppContext } from '../context/AppContextProvider'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { ClanType } from '../types/types'
import { Icon, Image } from 'react-native-elements'
import { FlatList } from 'react-native';
import { set } from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, "Atacar">;

const Atacar = ({ navigation, route }: Props) => {
    const clan = route.params.clan;
    const { ruta } = Globals();
    const { token, user } = useContext(AppContext);
    const [enemigo, setEnemigo] = useState<ClanType>({} as ClanType);
    const [ultimasTiradas, setUltimasTiradas] = useState<Array<number>>([]);
    const [sumaTotal, setSumaTotal] = useState<number>(0);
    const [rangoInferior, setRangoInferior] = useState<number>(0);
    const [rangoSuperior, setRangoSuperior] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [victoria, setVictoria] = useState(false);

    useEffect(() => {
        async function buscarOponente() {
            try {
                const response = await axios.get(ruta + "v2/guilds/" + clan.id + "/seekChallenger", { headers: { "Authorization": "Bearer " + token } });
                console.log(response.data);
                setEnemigo(response.data);
                let [inferior, superior] = response.data.defenseRange.split("-");
                setRangoSuperior(superior);
                setRangoInferior(inferior);
            } catch (error) {
                console.log(error);
            }
        }

        buscarOponente();
    }, [])

    function apostar() {
        const dadoAleatorio = Math.floor(Math.random() * 6) + 1;
        setSumaTotal(sumaTotal + dadoAleatorio);

        if (ultimasTiradas.length < 4) {
            setUltimasTiradas([...ultimasTiradas, dadoAleatorio]);
        } else {
            const nuevasTiradas = ultimasTiradas.slice(1);
            setUltimasTiradas([...nuevasTiradas, dadoAleatorio]);
        }

        console.log(dadoAleatorio);
        console.log(ultimasTiradas);
    }

    async function comprobarResultados() {
        try {
            const params = {
                attackNumber: sumaTotal,
            }
            const response = await axios.put(ruta + "v2/guilds/" + clan.id + "/attack/" + enemigo.id, null, { params: params, headers: { Authorization: "Bearer " + token } });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

        setModalVisible(true);
    }

    function salir() {
        setModalVisible(false);
        setSumaTotal(0);
        setUltimasTiradas([]);
    }

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
            <View style={{ width: "100%", height: "7%", backgroundColor: "rgb(28, 64, 169)", justifyContent: "space-around", alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1 }}>
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
            <View style={{ width: "100%", height: "82%", alignItems: "center" }}>
                <View style={{ position: "absolute", width: "62%", height: "18%", alignItems: "center" }}>
                    <View style={{ width: "70%", justifyContent: 'center', alignItems: "center", marginVertical: "3%", borderRadius: 25, backgroundColor: "rgba(20, 40, 140, 1)", elevation: 6 }}>
                        <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>Rango enemigo</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>{rangoInferior} </Text>
                            <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>- {rangoSuperior}</Text>
                        </View>
                    </View>

                    <View style={{ width: "100%", justifyContent: 'center', alignItems: "center", marginTop: "2%", borderRadius: 25, backgroundColor: "rgba(20, 40, 140, 1)", elevation: 6 }}>
                        <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", textAlign: 'center' }}>Posible Rango de Victoria</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>{Number(rangoInferior) - 2} </Text>
                            <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>- {Number(rangoSuperior) + 2}</Text>
                        </View>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1.25 }}
                            style={stylesModal.modalView}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => salir()} style={{ width: 40, height: 40, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                        <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 26 }}>X</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </Modal>
            </View>
            <View style={{ width: "100%", height: "11%" }}>
                <View style={{ flexDirection: "row", width: "100%", height: "100%" }}>
                    <View style={{ width: "37.5%", height: "100%" }}>
                        <View style={{ height: "100%", width: "100%" }}>
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", textAlign: 'center' }}>Total: {sumaTotal}</Text>
                            </View>
                            <FlatList
                                data={ultimasTiradas}
                                renderItem={({ item }) =>
                                    <View style={{ marginHorizontal: "2%", width: "21%", height: 30, backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: 100, borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>{item}</Text>
                                    </View>
                                }
                                style={{ width: "100%", height: "100%" }}
                                numColumns={4}
                            />
                        </View>
                    </View>
                    <View style={{ width: "25%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
                        <TouchableHighlight underlayColor={"orange"} onPress={() => apostar()} style={{ height: "80%", width: "74%", backgroundColor: "yellow", borderRadius: 100, alignItems: 'center', justifyContent: "center", borderWidth: 2 }}>
                            <Icon name="dice" size={40} color={"black"}></Icon>
                        </TouchableHighlight>
                    </View>
                    <View style={{ width: "37.5%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        {(sumaTotal < rangoInferior) ?
                            <TouchableHighlight underlayColor={"rgb(24, 50, 150)"} onPress={() => ToastAndroid.show("Sigue tirando, todavía no estás dentro del rango enemigo", ToastAndroid.LONG)} style={{ width: 100, height: 30, backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 20, justifyContent: "center", alignContent: 'center', marginBottom: 10 }}>
                                <Text style={{ textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow" }}>Terminar</Text>
                            </TouchableHighlight>
                            :
                            <TouchableHighlight underlayColor={"rgb(24, 50, 150)"} onPress={() => comprobarResultados()} style={{ width: 100, height: 30, backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 20, justifyContent: "center", alignContent: 'center', marginBottom: 10 }}>
                                <Text style={{ textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow" }}>Terminar</Text>
                            </TouchableHighlight>
                        }
                        <TouchableHighlight underlayColor={"rgb(24, 50, 150)"} onPress={() => navigation.goBack()} style={{ width: 100, height: 30, backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 20, justifyContent: "center", alignContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow" }}>Cancelar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Atacar

const stylesModal = StyleSheet.create({
    modalView: {
        backgroundColor: '#00a8d6',
        borderRadius: 20,
        padding: 30,
        elevation: 15,
        height: "auto",
        width: 320
    },
})