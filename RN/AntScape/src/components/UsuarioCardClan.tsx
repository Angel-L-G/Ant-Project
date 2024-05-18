import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ClanType, User } from '../types/types'
import { Image } from 'react-native-elements'
import Globals from './Globals';
import { AppContext } from '../context/AppContextProvider';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    usu: User,
    clan: ClanType,
    navigation: any
}

const UsuarioCardClan = ({ usu, navigation, clan }: Props) => {
    const { ruta } = Globals();
    const { user, token, setUser } = useContext(AppContext);
    const [bloqueado, setBloqueado] = useState(false);
    const [modalAscenderVisible, setModalAscenderVisible] = useState(false);

    useEffect(() => {
        async function verificarBloqueo() {
            try {
                const response = await axios.get(ruta + "v2/users/" + user.id + "/bloqued", { headers: { "Authorization": "Bearer " + token } });
                console.log(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].id == usu.id) {
                        setBloqueado(true);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        verificarBloqueo();
    }, [])

    async function ascender() {
        try {
            const response = await axios.put(ruta + "v2/guilds/" + clan.id + "/giveOwnership/" + usu.id, {}, { headers: { "Authorization": "Bearer " + token } });
            console.log(response.data);
            setUser({ ...user, id_guild: 0});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ height: 80, padding: 5, margin: 15, flexDirection: 'row' }}>
            <Image source={{ uri: ruta + "v1/files/" + usu.img }} style={{ height: "100%", width: 70, borderRadius: 100 }} />
            <View style={{ width: "31%", marginLeft: "15%" }}>
                <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center', marginBottom: 10 }}>{usu.name}</Text>
                {(usu.id != clan.leader) ?
                    <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center' }}>Miembro</Text>
                    :
                    <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 22, color: "yellow", textAlign: 'center' }}>Lider</Text>
                }
            </View>
            {(user.id_guild == clan.id && user.id == clan.leader) ?
                <View style={{ width: "15%", justifyContent: 'center' }}>
                    {(usu.id != clan.leader) &&
                        <TouchableHighlight underlayColor={"transparent"} onPress={() => setModalAscenderVisible(true)}>
                            <Icon name="arrow-up-circle-outline" size={40} color={"yellow"}></Icon>
                        </TouchableHighlight>
                    }
                </View>
                :
                <View style={{ width: "15%" }}>

                </View>
            }
            <View style={{ width: "20%", justifyContent: "center" }}>
                {(user.id == usu.id) ?
                    <></>
                    :
                    (bloqueado) ?
                        <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 14, color: "yellow", textAlign: 'center' }}>Usuario Bloqueado</Text>
                        :
                        <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => navigation.navigate("NuevoChat", { name: usu.name })} style={{ justifyContent: 'center', alignItems: 'center', height: "100%", borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "#2196F3" }}>
                            <Text style={{ color: "yellow", fontFamily: "MadimiOneRegular", fontSize: 18 }}>Chat</Text>
                        </TouchableHighlight>
                }
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAscenderVisible}
                onRequestClose={() => {
                    setModalAscenderVisible(!modalAscenderVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.25 }}
                        style={styles.modalView}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: "75%", width: "100%" }}>
                                <View>
                                    <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 18 }}>Estás seguro que quieres que el nuevo lider sea {usu.name}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', height: "20%", width: "100%", marginBottom: "5%" }}>
                                <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => setModalAscenderVisible(false)} style={{ width: 50, height: 50, borderRadius: 100, justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                    <Icon name="close" size={40} color={"yellow"}></Icon>
                                </TouchableHighlight>
                                <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => ascender()} style={{ width: 50, height: 50, borderRadius: 100, justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                    <Icon name="checkmark" size={40} color={"yellow"}></Icon>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
        </View>
    )
}

export default UsuarioCardClan

const styles = StyleSheet.create({
    modalView: {
        borderRadius: 20,
        padding: 20,
        elevation: 15,
        width: "65%",
        height: "18%",
        borderWidth: 2,
    },
})