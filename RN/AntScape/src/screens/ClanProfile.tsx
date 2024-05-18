import { FlatList, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableHighlight, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import { AppContext } from '../context/AppContextProvider';
import Globals from '../components/Globals';
import axios from 'axios';
import { User } from '../types/types';
import UsuarioCardClan from '../components/UsuarioCardClan';
import images from '../assets/imgs';
import { Modal } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, "ClanProfile">;

const ClanProfile = ({ navigation, route }: Props) => {
    const clan = route.params.clan;
    const { ruta } = Globals();
    const { token, user, setUser } = useContext(AppContext);
    const [valorInput, setValorInput] = useState('');
    const [users, setUsers] = useState<Array<User>>([]);
    const [modalLiderVisible, setModalLiderVisible] = useState(false);

    const imageName = clan.guildImage;
    const imageSource = images[imageName as keyof typeof images];

    useEffect(() => {
        async function getClanUsers() {
            try {
                const response = await axios.get(ruta + "v2/guilds/" + clan.id + "/users", { headers: { "Authorization": "Bearer " + token } });
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getClanUsers();
    }, [])

    const handleChangeInput = (text: string) => {
        setValorInput(text);
        console.log(valorInput);
    };

    async function buscarUsuarios(inputValue: string) {
        try {
            const response = await axios.get(ruta + "v2/guilds/" + clan.id + "/users", { headers: { "Authorization": "Bearer " + token } });
            console.log(response.data);

            const usuariosFiltrados: Array<User> = response.data.filter((usuario: User) =>
                usuario.name.includes(inputValue)
            );
            setUsers(usuariosFiltrados);
            console.log(usuariosFiltrados);
        } catch (error) {
            console.log(error);
        }
    }

    async function abandonar() {
        if (clan.leader == user.id_guild) {
            setModalLiderVisible(true);
        } else {
            try {
                const response = await axios.put(ruta + "v2/guilds/" + clan.id + "/leaveguild", {}, { params: { newLeader: -1 }, headers: { "Authorization": "Bearer " + token } });
                console.log(response.data);
                setUser({ ...user, id_guild: undefined });
                navigation.navigate("Social", { tab: 2 });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ height: "100%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                <View style={{ height: "100%", width: "100%" }}>
                    <View style={{ height: "14%", flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', width: "100%" }}>
                        <View style={{ width: "19%", height: "100%", marginHorizontal: "5%", justifyContent: 'center' }}>
                            <Image source={imageSource} style={{ width: "100%", height: "65%", borderRadius: 100 }} />
                        </View>
                        <View style={{ width: "66%", height: "75%", marginRight: "5%", flexDirection: 'column' }}>
                            <Text style={{ color: "yellow", fontSize: 24, fontFamily: "MadimiOneRegular", textDecorationLine: 'underline', textAlign: 'center' }}>{clan.name}</Text>
                            <Text style={{ color: "yellow", fontSize: 16, fontFamily: "MadimiOneRegular", textAlign: "center" }} numberOfLines={3} ellipsizeMode='tail'>{clan.description}</Text>
                        </View>
                    </View>
                    <View style={{ height: "8%", flexDirection: 'row', alignItems: 'center', width: "100%" }}>
                        <View style={{ width: "57%", marginHorizontal: "5%", marginTop: -10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput style={{ backgroundColor: "white", height: 35, width: "75%", borderRadius: 100, paddingVertical: 0 }} onChangeText={handleChangeInput} />
                            <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={{ justifyContent: 'center' }}>
                                <TouchableHighlight underlayColor={"rgba(20, 40, 140, 1)"} onPress={() => buscarUsuarios(valorInput)} style={{ justifyContent: 'center', width: 40 }}>
                                    <Icon name="search" size={30} color={"yellow"}></Icon>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                        <View style={{ width: "23%", marginHorizontal: "5%", flexDirection: 'row', marginTop: -10 }}>
                            <TouchableHighlight underlayColor={"transparent"} onPress={abandonar} style={{ width: "100%", borderWidth: 4, borderColor: "rgba(200, 50, 50, 1)", backgroundColor: "rgba(20, 40, 140, 1)", height: 40, justifyContent: 'center', borderRadius: 18 }}>
                                <Text style={{ fontFamily: "MadimiOneRegular", color: "yellow", fontSize: 16, textAlign: 'center' }}>Abandonar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{ height: "78%", width: "100%", backgroundColor: "rgb(15, 47, 150)" }}>
                        <FlatList
                            data={users}
                            renderItem={({ item }) =>
                                (item.id == user.id) ?
                                    <View>
                                        <TouchableHighlight underlayColor={"rgba(10, 40, 140, 1)"} onPress={() => navigation.navigate("Profile")}><UsuarioCardClan usu={item} navigation={navigation} clan={clan} /></TouchableHighlight>
                                        <View style={{ height: 1, backgroundColor: "black" }}></View>
                                    </View>
                                    :
                                    <View>
                                        <TouchableHighlight underlayColor={"rgba(10, 40, 140, 1)"} onPress={() => navigation.navigate("ProfileOther", { usu: item })}><UsuarioCardClan usu={item} navigation={navigation} clan={clan} /></TouchableHighlight>
                                        <View style={{ height: 1, backgroundColor: "black" }}></View>
                                    </View>
                            }
                        />
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalLiderVisible}
                onRequestClose={() => {
                    setModalLiderVisible(!modalLiderVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.25 }}
                        style={styles.modalView}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: "80%", width: "100%" }}>
                                <View>
                                    <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 18 }}>No puedes salir del gremio siendo el lider, relega tu puesto.</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: "20%", width: "100%" }}>
                                <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => setModalLiderVisible(false)} style={{ width: 40, height: 40, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
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

export default ClanProfile

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    modalView: {
        borderRadius: 20,
        padding: 20,
        elevation: 15,
        width: "60%",
        height: "20%",
        borderWidth: 2,
    },
});
