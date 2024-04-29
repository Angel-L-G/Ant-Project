import { StyleSheet, Text, View, TouchableHighlight, Touchable, Modal, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBotton from '../components/NavBarBotton'
import Globals from '../components/Globals'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'
import { ClanType, GuildLevel } from '../types/types'
import { Icon, Image } from 'react-native-elements';
import { get } from 'http';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    navigation: any,
}

const Clan = ({ navigation }: Props) => {
    const { ruta } = Globals();
    const { token, user } = useContext(AppContext);
    const [clan, setClan] = useState<ClanType>({} as ClanType);
    const [tieneClan, setTieneClan] = useState(false);
    const [clanId, setClanId] = useState(0);
    const [modalConstruccionUno, setModalConstruccionUno] = useState(false);
    const [guildLevelUno, setGuildLevelUno] = useState<GuildLevel>({} as GuildLevel);
    const [modalConstruccionDos, setModalConstruccionDos] = useState(false);
    const [guildLevelDos, setGuildLevelDos] = useState<GuildLevel>({} as GuildLevel);
    const [modalConstruccionTres, setModalConstruccionTres] = useState(false);
    const [guildLevelTres, setGuildLevelTres] = useState<GuildLevel>({} as GuildLevel);

    useEffect(() => {
        console.log(user);

        async function carga() {
            console.log("UseEffect");

            if (user.id_guild != null) {
                console.log("Tiene Clan");
                getClan(user.id_guild);
                setTieneClan(true);
            } else {
                console.log("No tieneClan o es lider");

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


    }, [])

    async function getClan(id: Number) {
        try {
            const response = await axios.get(ruta + "v2/guilds/" + id, { headers: { "Authorization": "Bearer " + token } });
            setClan(response.data);
        } catch (error) {
            console.log(error);
        }
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
        console.log("ASDASDAS " + user.id_guild);
        

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

    return (
        <View style={{ width: "100%", height: "100%" }}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                {(tieneClan) ?
                    <View style={{ height: "93%", width: "100%" }}>

                        <View>
                            <View style={{height: "33%", width: "100%", justifyContent: "center", alignItems: "flex-end"}}>
                                <TouchableHighlight underlayColor={"transparent"} onPress={() => abrirModalUno()} style={{width: "40%", height: "60%", backgroundColor: "blue", justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontSize: 40}}>IMG</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{height: "34%", width: "100%", justifyContent: "center"}}>
                                <TouchableHighlight underlayColor={"transparent"} onPress={() => abrirModalDos()} style={{width: "40%", height: "60%", backgroundColor: "blue", justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontSize: 40}}>IMG</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{height: "33%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                                <TouchableHighlight underlayColor={"transparent"} onPress={() => abrirModalTres()} style={{width: "40%", height: "60%", backgroundColor: "blue", justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontSize: 40}}>IMG</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        
                        <View style={{position: "absolute", width: "20%", height: "15%", bottom: 0, right: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableHighlight underlayColor={"orange"} onPress={() => navigation.navigate("Atacar", {clan: clan})} style={{width: 70, height: 70, backgroundColor: "yellow", borderRadius: 100, elevation: 10, justifyContent: 'center'}}>
                                <Image source={require('../assets/imgs/sword.png')} style={{ width: "70%", height: "80%", marginLeft: 10, marginTop: 5}} />
                            </TouchableHighlight>
                        </View>

                        <View style={{position: "absolute", top: 10, left: 10}}>
                            <TouchableHighlight underlayColor={"rgb(24, 50, 150)"} onPress={() => navigation.navigate("ClanProfile", {clan: clan})} style={{width: 100, height: 30, backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 20, justifyContent: "center", alignContent: 'center', elevation: 10}}>
                                <Text style={{textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow"}}>Clan</Text>
                            </TouchableHighlight>
                        </View>
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
					Alert.alert('Modal has been closed.');
					setModalConstruccionUno(!modalConstruccionUno);
				}}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1.25 }}
                    style={stylesModal.modalView}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                            </View>
                            <View style={{flexDirection: 'row'}}>
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
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1.25 }}
                    style={stylesModal.modalView}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                            </View>
                            <View style={{flexDirection: 'row'}}>
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
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1.25 }}
                    style={stylesModal.modalView}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{height: "90%", width: "100%"}}>
                                <View style={{width: "100%", height: "100%"}}>
                                    <View style={{width: "100%", height: "30%", justifyContent: 'space-between', flexDirection: "row"}}>
                                        <View style={{width: "40%", height: "100%"}}>
                                            <Image source={require('../assets/imgs/Background.png')} style={{width: "100%", height: "100%"}} />
                                        </View>
                                        <View style={{width: "5%"}}></View>
                                        <View style={{width: "55%", borderLeftWidth: 2, alignItems: "center"}}>
                                            <Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", textAlign: "center", textDecorationLine: 'underline'}}>{guildLevelTres.name}</Text>
                                            <Text style={{width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center", marginTop: 10}}>Aumenta el robo de recursos</Text>
                                        </View>
                                    </View>
                                    <View style={{width: "100%", height: "70%", alignItems: "center", marginTop: "7%"}}>
                                        <Text style={{width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center"}}>Aumenta la cantidad de recursos que robas en un 1% por cada nivel.</Text>
                                        <Text style={{width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center"}}>Actualmente {1 * guildLevelTres.level}%</Text>
                                        <View style={{width: "12%", height: "16%", marginVertical: 10}}>
                                            <Image source={require('../assets/imgs/arrow.png')} style={{width: "100%", height: "100%"}} />
                                        </View>
                                        <Text style={{width: "80%", fontFamily: "MadimiOneRegular", fontSize: 14, color: "white", textAlign: "center"}}>Proximo nivel {1 * (guildLevelTres.level + 1)}%</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: "8%", width: "100%", marginTop: "2%"}}>
                                <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => setModalConstruccionTres(false)} style={{ width: 40, height: 40, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                    <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 26 }}>X</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </LinearGradient>
				</View>
			</Modal>
        </View>
    );
};

export default Clan

const stylesModal = StyleSheet.create({
    modalView: {
		backgroundColor: '#00a8d6',
		borderRadius: 20,
		padding: 20,
		elevation: 15,
		width: "80%",
        height: "50%"
	},
})