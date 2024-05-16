import { StyleSheet, Text, View, TouchableHighlight, Touchable, Modal, Alert, ToastAndroid, ImageBackground, TextInput, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBotton from '../components/NavBarBotton'
import Globals from '../components/Globals'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'
import { ClanType, GuildLevel } from '../types/types'
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { es } from 'date-fns/locale';
import LinearGradient from 'react-native-linear-gradient';
import UseChat from '../hooks/UseChat';
import UseChatHistory from '../hooks/UseChatHistory';
import { Chat, ChatInputSaveDTO } from '../types/chatTypes';
import { formatDistanceToNow } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, "Clan">;

const Clan = ({ navigation, route }: Props) => {
    const { ruta } = Globals();
    const { token, user, goldenEggsContext, setGoldenEggsContext } = useContext(AppContext);
    const numero = route.params.numero;
    const [clan, setClan] = useState<ClanType>({} as ClanType);
    const [tieneClan, setTieneClan] = useState(false);
    const [clanId, setClanId] = useState(0);
    const [modalConstruccionUno, setModalConstruccionUno] = useState(false);
    const [guildLevelUno, setGuildLevelUno] = useState<GuildLevel>({} as GuildLevel);
    const [modalConstruccionDos, setModalConstruccionDos] = useState(false);
    const [guildLevelDos, setGuildLevelDos] = useState<GuildLevel>({} as GuildLevel);
    const [modalConstruccionTres, setModalConstruccionTres] = useState(false);
    const [guildLevelTres, setGuildLevelTres] = useState<GuildLevel>({} as GuildLevel);
    const [puedeAtacar, setPuedeAtacar] = useState(true);
    const [momentoDeAtaque, setMomentoDeAtaque] = useState("");

    const { sendGroupMessage, conectado, conectar, chatActual, historico, setHistorico } = UseChat();
    const { chats, save, saveMessages, findGuildChat } = UseChatHistory();
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

    useEffect(() => {
        console.log(user);

        const obtenerEstadoAsyncStorage = async () => {
            try {
                const estadoPuedeAtacar = await AsyncStorage.getItem(`puedeAtacar${user.id}`);
                console.log(estadoPuedeAtacar + "Aaaaaaaaaaaa");

                if (estadoPuedeAtacar !== null) {
                    setPuedeAtacar(false);
                }

                const tiempoDeAtaque = await AsyncStorage.getItem(`momentoDeAtaque${user.id}`);
                console.log(tiempoDeAtaque + "Aaaaaaaaaaaa");

                if (tiempoDeAtaque !== null) {
                    setMomentoDeAtaque(tiempoDeAtaque);
                }
            } catch (error) {
                console.log('Error al obtener el estado desde AsyncStorage:', error);
            }
        };

        obtenerEstadoAsyncStorage();

        async function carga() {
            console.log("UseEffect");

            if (user.id_guild != null) {
                console.log("Tiene Clan");
                getClan(user.id_guild);
                setClanId(user.id_guild);
                setTieneClan(true);
            } else {
                console.log("No tiene Clan o es lider");

                try {
                    const response = await axios.get(ruta + "v2/guilds", { headers: { "Authorization": "Bearer " + token } });
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].leader == user.id) {
                            setTieneClan(true);
                            setClanId(response.data[i].id);

                            console.log("Es lider");

                            try {
                                const response2 = await axios.get(ruta + "v2/guilds/" + response.data[i].id, { headers: { "Authorization": "Bearer " + token } });
                                setClan(response2.data);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        carga();
    }, [numero])

    async function getClan(id: Number) {
        try {
            const response = await axios.get(ruta + "v2/guilds/" + id, { headers: { "Authorization": "Bearer " + token } });
            setClan(response.data);
        } catch (error) {
            console.log(error);
        }
    }

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
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function levelUpConstruction(guildLevel: GuildLevel) {
        if (user.goldenEggs >= guildLevel.cost) {
            if (guildLevel.name == "Barracks") {
                try {
                    console.log(ruta + "v2/guilds/" + clanId + "/levelUp/" + guildLevel.name);

                    const response = await axios.put(ruta + "v2/guilds/" + clanId + "/levelUp/" + guildLevel.name, {}, { headers: { "Authorization": "Bearer " + token } });
                    console.log(response.data);
                    getGuild();
                    user.goldenEggs = user.goldenEggs - guildLevel.cost;
                    setGoldenEggsContext(user.goldenEggs - guildLevel.cost);
                } catch (error) {
                    console.log(error);
                }
            } else if (guildLevel.name == "Defenses") {
                try {
                    const response = await axios.put(ruta + "v2/guilds/" + clanId + "/levelUp/" + guildLevel.name, {}, { headers: { "Authorization": "Bearer " + token } });
                    console.log(response.data);
                    getGuild();
                    user.goldenEggs = user.goldenEggs - guildLevel.cost;
                    setGoldenEggsContext(user.goldenEggs - guildLevel.cost);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const response = await axios.put(ruta + "v2/guilds/" + clanId + "/levelUp/" + guildLevel.name, {}, { headers: { "Authorization": "Bearer " + token } });
                    console.log(response.data);
                    getGuild();
                    user.goldenEggs = user.goldenEggs - guildLevel.cost;
                    setGoldenEggsContext(user.goldenEggs - guildLevel.cost);
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
        console.log(currentTime);
        console.log(disabledTime);


        if (remainingTime <= 0 || isNaN(disabledTime)) {
            console.log("Hola");

            setPuedeAtacar(true);
            puede = true;

            await AsyncStorage.setItem(`puedeAtacar${user.id}`, "true");
            await AsyncStorage.removeItem(`momentoDeAtaque${user.id}`);
        }

        if (remainingTime <= 0 && puede || isNaN(disabledTime) && puede) {
            setPuedeAtacar(false);
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

                        {(modalChatVisible) ?
                            <></>
                            :
                            <View style={{ position: 'absolute', height: "8%", width: "9%", backgroundColor: "rgba(40, 60, 160, 1)", right: 0, top: "46%" }}>
                                <TouchableHighlight underlayColor={"rgba(60, 80, 180, 1)"} onPress={() => setModalChatVisible(true)} style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }}>
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
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Aumenta la cantidad probabilidad de ejecutar un ataque exitoso en un 1% por cada nivel.</Text>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Actualmente {1 * guildLevelUno.level}%</Text>
                                        <Icon name="arrow-down" size={50} color={"black"}></Icon>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Proximo nivel: {1 * (guildLevelUno.level + 1)}%</Text>
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
                                            <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 16, color: "white", textAlign: "center", marginTop: 10 }}>Aumenta el robo de recursos</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "100%", height: "70%", alignItems: "center", marginTop: "7%" }}>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Aumenta la cantidad de recursos que robas en un 1% por cada nivel.</Text>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Actualmente {1 * guildLevelTres.level}%</Text>
                                        <Icon name="arrow-down" size={50} color={"black"}></Icon>
                                        <Text style={{ width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center" }}>Proximo nivel: {1 * (guildLevelTres.level + 1)}%</Text>
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
                                                <View style={{ alignSelf: 'flex-end' }}>
                                                    <Text style={{ color: "black", marginTop: 10, marginRight: 16, fontFamily: "MadimiOneRegular", fontSize: 16 }}>{item.sentAt && formatDistanceToNow(new Date(item.sentAt), { addSuffix: true, locale: es })}</Text>
                                                    <View style={styles.myMessage}>
                                                        <Text style={{ ...styles.messageText, color: "black" }}>{item.body}</Text>
                                                    </View>
                                                </View>
                                                :
                                                <View style={{ alignSelf: 'flex-start' }}>
                                                    <Text style={{ color: "black", marginTop: 10, marginLeft: 16, fontFamily: "MadimiOneRegular", fontSize: 16 }}>{item.sentAt && formatDistanceToNow(new Date(item.sentAt), { addSuffix: true, locale: es })}</Text>
                                                    <View style={styles.otherMessage}>
                                                        <Text style={{ ...styles.messageText, color: "black" }}>{item.body}</Text>
                                                    </View>
                                                </View>
                                        }
                                        keyExtractor={(item, index) => index.toString()}
                                        inverted
                                    />
                                }
                            </View>
                            <View style={{ height: "8%", width: "100%", marginTop: "2%" }}>
                                <View style={{ height: "100%", flexDirection: "row", justifyContent: 'space-between' }}>
                                    <TextInput multiline onChangeText={setMensaje} value={mensaje} style={{ borderWidth: 1, borderColor: 'black', borderRadius: 20, width: "78%", fontSize: 14, backgroundColor: "white", height: 30, alignSelf: "center", marginLeft: "2%", paddingVertical: 0 }} />
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

const styles = StyleSheet.create({
    myMessage: {
        borderBottomEndRadius: 0,
        alignSelf: 'flex-end',
        backgroundColor: '#D68200',
        borderRadius: 18,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 12,
        elevation: 5,
        maxWidth: '60%',
    },
    otherMessage: {
        borderBottomStartRadius: 0,
        alignSelf: 'flex-start',
        backgroundColor: '#00a8d6',
        borderRadius: 18,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 12,
        elevation: 5,
        maxWidth: '60%',
    },
    messageText: {
        fontSize: 16,
        fontFamily: "MadimiOneRegular",
    },
});