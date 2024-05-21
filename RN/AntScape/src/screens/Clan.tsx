import { StyleSheet, Text, View, TouchableHighlight, Touchable, Modal, Alert, ToastAndroid, ImageBackground, TextInput, FlatList, LogBox } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBotton from '../components/NavBarBotton'
import Globals from '../components/Globals'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'
import { ClanType, GuildLevel } from '../types/types'
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import UseChat from '../hooks/UseChat';
import UseChatHistory from '../hooks/UseChatHistory';
import { Chat } from '../types/chatTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useFocusEffect } from '@react-navigation/native';
import MensajeClan from '../components/MensajeClan';
import MensajeClanOtro from '../components/MensajeClanOtro';

type Props = NativeStackScreenProps<RootStackParamList, "Clan">;

const Clan = ({ navigation, route }: Props) => {
    LogBox.ignoreAllLogs();
    const { ruta } = Globals();
    const { token, user, goldenEggsContext, setGoldenEggsContext } = useContext(AppContext);
    const [clan, setClan] = useState<ClanType>({} as ClanType);
    const [tieneClan, setTieneClan] = useState(false);
    const [clanId, setClanId] = useState(0);
    const [modalConstruccionUno, setModalConstruccionUno] = useState(false);
    const [guildLevelUno, setGuildLevelUno] = useState<GuildLevel>({} as GuildLevel);
    const [modalConstruccionDos, setModalConstruccionDos] = useState(false);
    const [guildLevelDos, setGuildLevelDos] = useState<GuildLevel>({} as GuildLevel);
    const [modalConstruccionTres, setModalConstruccionTres] = useState(false);
    const [guildLevelTres, setGuildLevelTres] = useState<GuildLevel>({} as GuildLevel);
    const [momentoDeAtaque, setMomentoDeAtaque] = useState("");
    const [modalDefensaVisible, setModalDefensaVisible] = useState(false);
    const [rangoDefensa, setRangoDefensa] = useState<Array<number>>([]);
    const [rangoInferior, setRangoInferior] = useState(0);
    const [rangoSuperior, setRangoSuperior] = useState(0);
    const [nuevoNumeroDeDefensa, setNuevoNumeroDeDefensa] = useState(0);

    const { sendGroupMessage, conectado, conectar, chatActual, historico, setHistorico } = UseChat();
    const { saveMessages, findGuildChat } = UseChatHistory();
    const [modalChatVisible, setModalChatVisible] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        conectar();
    }, []);

    useEffect(() => {
        if (conectado == true) {
            const fetchData = async () => {
                const chatGremio: Chat | undefined = await findGuildChat(user.id_guild ?? -1);

                chatActual.current = chatGremio;

                if (chatGremio?.messages != null) {
                    const mensajesInvertidos = chatGremio.messages.slice().reverse();
                    setHistorico(mensajesInvertidos);
                } else {
                    setHistorico([]);
                }

                setLoading(false);
            }

            fetchData();
        } else {
            console.log("Fallo de conexion");
        }
    }, [conectado]);

    useFocusEffect(
        useCallback(() => {

            const obtenerEstadoAsyncStorage = async () => {
                try {
                    const estadoPuedeAtacar = await AsyncStorage.getItem(`puedeAtacar${user.id}`);

                    const tiempoDeAtaque = await AsyncStorage.getItem(`momentoDeAtaque${user.id}`);

                    if (tiempoDeAtaque !== null) {
                        setMomentoDeAtaque(tiempoDeAtaque);
                    }
                } catch (error) {
                    console.log('Error al obtener el estado desde AsyncStorage:', error);
                }
            };

            obtenerEstadoAsyncStorage();

            async function carga() {

                try {
                    const response = await axios.get(ruta + "v2/users/me/guild", { headers: { "Authorization": "Bearer " + token } });

                    if (response.data != "") {

                        let [inferior, superior] = response.data.defenseRange.split("-");
                        let arr: Array<number> = [];
                        for (let i = inferior; i <= superior; i++) {
                            arr.push(i);
                        }
                        setRangoDefensa(arr);
                        setRangoInferior(inferior);
                        setRangoSuperior(superior);

                        setClan(response.data);
                        setClanId(response.data.id);
                        setTieneClan(true);
                        setNuevoNumeroDeDefensa(response.data.defenseNumber);
                    } else {
                        setTieneClan(false);
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            carga();

            return () => {

            };
        }, [])
    );

    function sendMessage() {
        saveMessages(chatActual.current?.id as number, mensaje);
        sendGroupMessage(mensaje);
    }

    function abrirModalUno() {
        getGuild();

        setModalConstruccionUno(true);
    }

    function abrirModalDos() {
        getGuild();

        setModalConstruccionDos(true);
    }

    function abrirModalTres() {
        getGuild();

        setModalConstruccionTres(true);
    }

    async function getGuild() {
        try {
            const response = await axios.get(ruta + "v2/guilds/" + clanId, { headers: { "Authorization": "Bearer " + token } });
            setGuildLevelUno(response.data.guildLevels[0]);
            setGuildLevelDos(response.data.guildLevels[1]);
            setGuildLevelTres(response.data.guildLevels[2]);
        } catch (error) {
            console.log(error);
        }
    }

    async function levelUpConstruction(guildLevel: GuildLevel) {
        if (goldenEggsContext >= guildLevel.cost) {
            if (guildLevel.name == "Barracks") {
                try {
                    const response = await axios.put(ruta + "v2/guilds/" + clanId + "/levelUp/" + guildLevel.name, {}, { headers: { "Authorization": "Bearer " + token } });
                    getGuild();
                    user.goldenEggs = goldenEggsContext - guildLevel.cost;
                    setGoldenEggsContext(goldenEggsContext - guildLevel.cost);
                } catch (error) {
                    console.log(error);
                }
            } else if (guildLevel.name == "Defenses") {
                try {
                    const response = await axios.put(ruta + "v2/guilds/" + clanId + "/levelUp/" + guildLevel.name, {}, { headers: { "Authorization": "Bearer " + token } });
                    getGuild();
                    user.goldenEggs = goldenEggsContext - guildLevel.cost;
                    setGoldenEggsContext(goldenEggsContext - guildLevel.cost);
                    const params = {
                        newDefenseRange: (Number(rangoInferior) + 1) + "-" + (Number(rangoSuperior) + 1)
                    }
                    const response2 = await axios.put(ruta + "v2/guilds/" + clan.id + "/defenserange", null, { params: params, headers: { Authorization: "Bearer " + token } });
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const response = await axios.put(ruta + "v2/guilds/" + clanId + "/levelUp/" + guildLevel.name, {}, { headers: { "Authorization": "Bearer " + token } });
                    getGuild();
                    user.goldenEggs = goldenEggsContext - guildLevel.cost;
                    setGoldenEggsContext(goldenEggsContext - guildLevel.cost);
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            ToastAndroid.show("No tienes suficientes huevos dorados", ToastAndroid.LONG);
        }
    }

    async function irAAtacar() {
        const currentTime = new Date().getTime();
        const disabledTime = parseInt(momentoDeAtaque);
        const remainingTime = 3600000 - (currentTime - disabledTime);
        let puede = false;

        if (remainingTime <= 0 || isNaN(disabledTime)) {
            puede = true;

            await AsyncStorage.setItem(`puedeAtacar${user.id}`, "true");
            await AsyncStorage.removeItem(`momentoDeAtaque${user.id}`);
        }

        if (remainingTime <= 0 && puede || isNaN(disabledTime) && puede) {
            await AsyncStorage.setItem(`puedeAtacar${user.id}`, 'false');
            await AsyncStorage.setItem(`momentoDeAtaque${user.id}`, String(new Date().getTime()));
            setMomentoDeAtaque(String(new Date().getTime()));

            navigation.navigate("Atacar", { clan: clan });
        } else {
            const minutos = Math.floor((remainingTime / (1000 * 60)) % 60);
            const segundos = Math.floor((remainingTime / 1000) % 60);

            ToastAndroid.show("Debes esperar " + minutos + " minutos y " + segundos + " segundos para volver a atacar", ToastAndroid.LONG)
        }
    }

    async function abrirModalDefensa() {
        try {
            const response = await axios.get(ruta + "v2/users/me/guild", { headers: { "Authorization": "Bearer " + token } });
            let [inferior, superior] = response.data.defenseRange.split("-");
            let arr: Array<number> = [];
            for (let i = inferior; i <= superior; i++) {
                arr.push(i);
            }
            setRangoDefensa(arr);
            setRangoInferior(inferior);
            setRangoSuperior(superior);

            setNuevoNumeroDeDefensa(response.data.defenseNumber);
        } catch (error) {
            console.log(error);
        }

        setModalDefensaVisible(true);
    }

    async function cambiarNumeroDeDefensa() {
        try {
            const params = {
                newDefenseNumber: nuevoNumeroDeDefensa
            }
            const response = await axios.put(ruta + "v2/guilds/" + clan.id + "/defensenumber", null, { params: params, headers: { Authorization: "Bearer " + token } });
            ToastAndroid.show("Ahora el número de defensa es " + nuevoNumeroDeDefensa, ToastAndroid.SHORT);
            setModalDefensaVisible(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function abrirChat() {
        setModalChatVisible(true);
        
    }

    return (
        <View style={{ width: "100%", height: "100%" }}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                {(tieneClan) ?
                    <View style={{ height: "93%", width: "100%" }}>

                        <ImageBackground source={require('../assets/imgs/Fondo.jpg')} style={{ flex: 1 }}>

                            <View style={{ height: "33%", width: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                                <TouchableHighlight underlayColor={"transparent"} onPress={() => abrirModalUno()} style={{ width: "40%", height: "70%", justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: "100%", height: "100%" }}>
                                        <Image source={require('../assets/imgs/Entrance.png')} style={{ width: "100%", height: "100%" }} />
                                        <View style={{ position: "absolute", width: "100%", height: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                            <View style={{ backgroundColor: "yellow", justifyContent: "flex-end", alignItems: "center", borderRadius: 100, bottom: 10, right: 10 }}>
                                                <Icon name="chevron-up" size={40} color={"black"} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={{ height: "34%", width: "100%", justifyContent: "center" }}>
                                <TouchableHighlight underlayColor={"transparent"} onPress={() => abrirModalDos()} style={{ width: "40%", height: "70%", justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: "100%", height: "100%" }}>
                                        <Image source={require('../assets/imgs/Attack.png')} style={{ width: "100%", height: "100%" }} />
                                        <View style={{ position: "absolute", width: "100%", height: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                            <View style={{ backgroundColor: "yellow", justifyContent: "flex-end", alignItems: "center", borderRadius: 100, bottom: 10, right: 10 }}>
                                                <Icon name="chevron-up" size={40} color={"black"} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={{ height: "33%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <TouchableHighlight underlayColor={"transparent"} onPress={() => abrirModalTres()} style={{ width: "40%", height: "70%", justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: "100%", height: "100%" }}>
                                        <Image source={require('../assets/imgs/FoodStorage.png')} style={{ width: "100%", height: "100%" }} />
                                        <View style={{ position: "absolute", width: "100%", height: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                            <View style={{ backgroundColor: "yellow", justifyContent: "flex-end", alignItems: "center", borderRadius: 100, bottom: 10, right: 10 }}>
                                                <Icon name="chevron-up" size={40} color={"black"} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </ImageBackground>

                        <View style={{ position: "absolute", width: "20%", height: "15%", bottom: 0, right: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableHighlight underlayColor={"orange"} onPress={() => irAAtacar()} style={{ width: 70, height: 70, backgroundColor: "yellow", borderRadius: 100, elevation: 10, justifyContent: 'center' }}>
                                <Image source={require('../assets/imgs/sword.png')} style={{ width: "70%", height: "80%", marginLeft: 10, marginTop: 5 }} />
                            </TouchableHighlight>
                        </View>

                        <View style={{ width: "100%", position: 'absolute', flexDirection: "row", justifyContent: "space-around" }}>
                            <View style={{ top: 10 }}>
                                <TouchableHighlight underlayColor={"rgb(24, 50, 150)"} onPress={() => navigation.navigate("ClanProfile", { clan: clan })} style={{ width: 100, height: 30, backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 20, justifyContent: "center", alignContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow" }}>Ver Clan</Text>
                                </TouchableHighlight>
                            </View>

                            <View style={{ top: 10 }}>
                                <View style={{ width: 140, height: 30, backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 20, justifyContent: "center", alignContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow" }} numberOfLines={1} ellipsizeMode='tail'>{clan.name}</Text>
                                </View>
                            </View>

                            <View style={{ top: 10 }}>
                                <View style={{ width: 80, height: 30, backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 20, justifyContent: "center", alignContent: 'center', flexDirection: "row" }}>
                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>{clan.trophys}</Text>
                                    <View style={{ width: "18%", height: "60%", marginLeft: 5, alignSelf: 'center' }}>
                                        <Image source={require('../assets/imgs/Trophy.png')} style={{ width: "100%", height: "100%" }} />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {(clan.leader == user.id) ?
                            <TouchableHighlight onPress={() => abrirModalDefensa()} style={{ width: "25%", position: 'absolute', flexDirection: "row", justifyContent: "space-around", backgroundColor: "rgba(20, 40, 140, 1)", top: 50, left: 15, borderRadius: 20 }}>
                                <Text style={{ color: "yellow", fontSize: 18, fontFamily: "MadimiOneRegular", textAlign: 'center' }}>Modificar Defensa</Text>
                            </TouchableHighlight>
                            :
                            <></>
                        }

                        {(modalChatVisible) ?
                            <></>
                            :
                            <View style={{ position: 'absolute', height: "8%", width: "9%", backgroundColor: "rgba(40, 60, 160, 1)", right: 0, top: "46%" }}>
                                <TouchableHighlight underlayColor={"rgba(60, 80, 180, 1)"} onPress={() => abrirChat()} style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }}>
                                    <Icon name="chevron-back" size={50} color={"yellow"} style={{ right: 8 }}></Icon>
                                </TouchableHighlight>
                            </View>
                        }
                    </View>
                    :
                    <View style={{ height: "93%", width: "100%" }}>
                        <View style={{ alignItems: 'center', marginTop: 180 }}>
                            <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 26, color: "yellow", textAlign: 'center' }}>No perteneces a ningún Clan</Text>
                            <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 26, color: "yellow", textAlign: 'center' }}>Unete a uno ahora o crea el tuyo propio</Text>
                        </View>
                        <View style={{ marginTop: 100, flexDirection: "row", justifyContent: 'space-evenly' }}>
                            <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("CrearClan")} style={{ height: 60, width: 90, borderWidth: 4, borderColor: "rgba(200, 50, 50, 1)", backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 25, justifyContent: "center", alignItems: 'center' }}>
                                <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", textAlign: 'center' }}>Crear       Clan</Text>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Social", { tab: 2 })} style={{ height: 60, width: 90, borderWidth: 4, borderColor: "rgba(50, 180, 120, 1)", backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 25, justifyContent: "center", alignItems: 'center' }}>
                                <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", textAlign: 'center' }}>Buscar    Clan</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                }
                <NavBarBotton navigation={navigation} icon='clan' />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalConstruccionUno}
                onRequestClose={() => {
                    setModalConstruccionUno(!modalConstruccionUno);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.25 }}
                        style={stylesModal.modalView}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: "90%", width: "100%" }}>
                                <View style={{ width: "100%", height: "100%" }}>
                                    <View style={{ width: "100%", height: "30%", justifyContent: 'space-between', flexDirection: "row" }}>
                                        <View style={{ width: "40%", height: "100%" }}>
                                            <Image source={require('../assets/imgs/Entrance.png')} style={{ width: "90%", height: "100%", marginLeft: "5%" }} />
                                        </View>
                                        <View style={{ width: "5%" }}></View>
                                        <View style={{ width: "55%", borderLeftWidth: 2, alignItems: "center" }}>
                                            <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 20, color: "yellow", textAlign: "center", textDecorationLine: 'underline' }}>{guildLevelUno.name}</Text>
                                            <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 16, color: "white", textAlign: "center", marginTop: 10 }}>Aumenta la probabilidad de éxito al atacar</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "100%", height: "70%", alignItems: "center", marginTop: "7%" }}>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Aumenta la cantidad de dados disponibles al atacar en 1 por cada nivel.</Text>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Actualmente {1 * guildLevelUno.level}</Text>
                                        <Icon name="arrow-down" size={50} color={"black"}></Icon>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Proximo nivel: {1 * (guildLevelUno.level + 1)}</Text>
                                        <View style={{ width: "70%", height: "20%", flexDirection: "row", marginTop: "5%", alignItems: "center", justifyContent: "space-between" }}>
                                            <View style={{ width: "50%", height: "100%", flexDirection: "row", alignItems: "center" }}>
                                                <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 16, color: "yellow", textAlign: "center" }}>Coste: {guildLevelUno.cost}</Text>
                                                <View style={{ width: "70%", height: "45%", marginLeft: "5%" }}>
                                                    <Image source={require('../assets/imgs/GoldenAntEgg2.png')} style={{ width: "20%", height: "100%" }} />
                                                </View>
                                            </View>
                                            <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => levelUpConstruction(guildLevelUno)} style={{ width: "50%", height: "65%", borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(50, 180, 120, 1)" }}>
                                                <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 16 }}>Mejorar</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: "8%", width: "100%", marginTop: "2%" }}>
                                <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => setModalConstruccionUno(false)} style={{ width: 40, height: 40, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                    <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 26 }}>X</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalConstruccionDos}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalConstruccionUno(!modalConstruccionDos);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.25 }}
                        style={stylesModal.modalView}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: "90%", width: "100%" }}>
                                <View style={{ width: "100%", height: "100%" }}>
                                    <View style={{ width: "100%", height: "30%", justifyContent: 'space-between', flexDirection: "row" }}>
                                        <View style={{ width: "40%", height: "100%" }}>
                                            <Image source={require('../assets/imgs/Attack.png')} style={{ width: "90%", height: "100%", marginLeft: "5%" }} />
                                        </View>
                                        <View style={{ width: "5%" }}></View>
                                        <View style={{ width: "55%", borderLeftWidth: 2, alignItems: "center" }}>
                                            <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 20, color: "yellow", textAlign: "center", textDecorationLine: 'underline' }}>{guildLevelDos.name}</Text>
                                            <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 16, color: "white", textAlign: "center", marginTop: 10 }}>Aumenta las defensas ante un ataque</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "100%", height: "70%", alignItems: "center", marginTop: "7%" }}>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Te permite aumentar el rango de defensa del Clan en uno por cada nivel.</Text>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Actualmente {1 * guildLevelDos.level}</Text>
                                        <Icon name="arrow-down" size={50} color={"black"}></Icon>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Proximo nivel: {1 * (guildLevelDos.level + 1)}</Text>
                                        <View style={{ width: "70%", height: "20%", flexDirection: "row", marginTop: "5%", alignItems: "center", justifyContent: "space-between" }}>
                                            <View style={{ width: "50%", height: "100%", flexDirection: "row", alignItems: "center" }}>
                                                <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 16, color: "yellow", textAlign: "center" }}>Coste: {guildLevelDos.cost}</Text>
                                                <View style={{ width: "70%", height: "45%", marginLeft: "5%" }}>
                                                    <Image source={require('../assets/imgs/GoldenAntEgg2.png')} style={{ width: "20%", height: "100%" }} />
                                                </View>
                                            </View>
                                            <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => levelUpConstruction(guildLevelDos)} style={{ width: "50%", height: "65%", borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(50, 180, 120, 1)" }}>
                                                <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 16 }}>Mejorar</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: "8%", width: "100%", marginTop: "2%" }}>
                                <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => setModalConstruccionDos(false)} style={{ width: 40, height: 40, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                    <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 26 }}>X</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalConstruccionTres}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalConstruccionUno(!modalConstruccionTres);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.25 }}
                        style={stylesModal.modalView}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: "90%", width: "100%" }}>
                                <View style={{ width: "100%", height: "100%" }}>
                                    <View style={{ width: "100%", height: "30%", justifyContent: 'space-between', flexDirection: "row" }}>
                                        <View style={{ width: "40%", height: "100%" }}>
                                            <Image source={require('../assets/imgs/FoodStorage.png')} style={{ width: "90%", height: "100%", marginLeft: "5%" }} />
                                        </View>
                                        <View style={{ width: "5%" }}></View>
                                        <View style={{ width: "55%", borderLeftWidth: 2, alignItems: "center" }}>
                                            <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 20, color: "yellow", textAlign: "center", textDecorationLine: 'underline' }}>{guildLevelTres.name}</Text>
                                            <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 16, color: "white", textAlign: "center", marginTop: 10 }}>Aumenta la recolección de recursos</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "100%", height: "70%", alignItems: "center", marginTop: "7%" }}>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Aumenta la cantidad de recursos que recolectas en un 0,1% por cada nivel.</Text>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Actualmente 0,{1 * guildLevelTres.level}%</Text>
                                        <Icon name="arrow-down" size={50} color={"black"}></Icon>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Proximo nivel: 0,{1 * (guildLevelTres.level + 1)}%</Text>
                                        <View style={{ width: "70%", height: "20%", flexDirection: "row", marginTop: "10%", alignItems: "center", justifyContent: "space-between" }}>
                                            <View style={{ width: "50%", height: "100%", flexDirection: "row", alignItems: "center" }}>
                                                <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 16, color: "yellow", textAlign: "center" }}>Coste: {guildLevelTres.cost}</Text>
                                                <View style={{ width: "70%", height: "45%", marginLeft: "5%" }}>
                                                    <Image source={require('../assets/imgs/GoldenAntEgg2.png')} style={{ width: "20%", height: "100%" }} />
                                                </View>
                                            </View>
                                            <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => levelUpConstruction(guildLevelTres)} style={{ width: "50%", height: "65%", borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(50, 180, 120, 1)" }}>
                                                <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 16 }}>Mejorar</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: "8%", width: "100%", marginTop: "2%" }}>
                                <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => setModalConstruccionTres(false)} style={{ width: 40, height: 40, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                    <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 26 }}>X</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDefensaVisible}
                onRequestClose={() => {
                    setModalDefensaVisible(!modalDefensaVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.25 }}
                        style={stylesModal.modalDefensaView}>
                        <View style={{ height: "20%" }}>
                            <Text style={{ textAlign: "center", fontFamily: "MadimiOneRegular", color: "yellow", fontSize: 20 }}>Elige tu número de defensa</Text>
                        </View>
                        <View style={{ height: "60%" }}>
                            <FlatList
                                data={rangoDefensa}
                                renderItem={({ item }) =>
                                    (item == nuevoNumeroDeDefensa) ?
                                        <TouchableHighlight onPress={() => setNuevoNumeroDeDefensa(item)} style={{ padding: 15, backgroundColor: "rgba(60, 80, 200, 1)", marginBottom: 10, borderWidth: 2, borderColor: "yellow" }}>
                                            <Text style={{ color: "yellow", fontSize: 26 }}>{item}</Text>
                                        </TouchableHighlight>
                                        :
                                        <TouchableHighlight onPress={() => setNuevoNumeroDeDefensa(item)} style={{ padding: 15, backgroundColor: "rgba(20, 40, 140, 1)", marginBottom: 10, borderWidth: 2, borderColor: "yellow" }}>
                                            <Text style={{ color: "yellow", fontSize: 26 }}>{item}</Text>
                                        </TouchableHighlight>
                                }
                                horizontal={true}
                                contentContainerStyle={{ width: "100%", justifyContent: "space-around", flexWrap: "wrap" }}
                            />
                        </View>
                        <View style={{ height: "20%", justifyContent: "center", alignItems: "center" }}>
                            <TouchableHighlight onPress={() => cambiarNumeroDeDefensa()} style={{ borderWidth: 3, borderColor: "rgba(50, 180, 120, 1)", padding: 5, borderRadius: 100 }}>
                                <Text style={{ color: "yellow", fontSize: 18 }}>Aceptar</Text>
                            </TouchableHighlight>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalChatVisible}
                onRequestClose={() => {
                    setModalChatVisible(!modalChatVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>

                    <LinearGradient colors={['rgba(30, 70, 200, 0.8)', 'rgba(20, 40, 140, 0.8)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.25 }}
                        style={stylesModal.modalChatView}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: "92%", width: "100%" }}>
                                {(loading) ?
                                    <View>
                                        <Text>Loading...</Text>
                                    </View>
                                    :
                                    <FlatList
                                        data={historico}
                                        renderItem={({ item }) =>
                                            (item.senderId === user.id) ?
                                                <MensajeClan mensaje={item}/>
                                                :
                                                <MensajeClanOtro mensaje={item}/>
                                        }
                                        keyExtractor={(item, index) => index.toString()}
                                        inverted
                                    />
                                }
                            </View>
                            <View style={{ height: "8%", width: "100%", marginTop: "2%" }}>
                                <View style={{ height: "100%", flexDirection: "row", justifyContent: 'space-between' }}>
                                    <TextInput multiline onChangeText={setMensaje} value={mensaje} style={{ borderWidth: 1, borderColor: 'black', borderRadius: 20, width: "78%", fontSize: 14, backgroundColor: "white", height: 30, alignSelf: "center", marginLeft: "2%", paddingVertical: 0, color: "black" }} />
                                    <TouchableHighlight onPress={sendMessage} style={{ backgroundColor: "green", alignItems: 'center', justifyContent: 'center', width: "16%", height: 30, borderRadius: 20, alignSelf: 'center', marginRight: "2%" }}>
                                        <Icon name="send" size={20} color={"yellow"}></Icon>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={{ position: 'absolute', height: "8%", width: "9%", backgroundColor: "rgba(40, 60, 160, 1)", left: "12%", top: "46%" }}>
                        <TouchableHighlight underlayColor={"rgba(60, 80, 180, 1)"} onPress={() => setModalChatVisible(false)} style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }}>
                            <Icon name="chevron-forward" size={45} color={"yellow"} style={{ right: 8 }}></Icon>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Clan

const stylesModal = StyleSheet.create({
    modalView: {
        borderRadius: 20,
        padding: 20,
        elevation: 15,
        width: "80%",
        height: "50%",
        borderWidth: 2,
    },
    modalDefensaView: {
        borderRadius: 20,
        padding: 20,
        elevation: 15,
        width: "80%",
        height: "40%",
        borderWidth: 2,
    },
    modalChatView: {
        borderRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 15,
        width: "80%",
        height: "70%",
        borderWidth: 2,
        borderRightWidth: 0,
        borderColor: "yellow"
    },
})

const styles = StyleSheet.create({});