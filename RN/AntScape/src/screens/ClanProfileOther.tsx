import { FlatList, Image, LogBox, StyleSheet, Text, TextInput, ToastAndroid, TouchableHighlight, View } from 'react-native'
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

type Props = NativeStackScreenProps<RootStackParamList, "ClanProfileOther">;

const ClanProfileOther = ({ navigation, route }: Props) => {
    LogBox.ignoreAllLogs();
    const clan = route.params.clan;
    const { ruta } = Globals();
    const { token, user, setUser } = useContext(AppContext);
    const [valorInput, setValorInput] = useState('');
    const [users, setUsers] = useState<Array<User>>([]);
    const [pertenece, setPertenece] = useState(false);

    const imageName = clan.guildImage;
    const imageSource = images[imageName as keyof typeof images];

    useEffect(() => {
        async function getClanUsers() {
            try {
                const response = await axios.get(ruta + "v2/guilds/" + clan.id + "/users", { headers: { "Authorization": "Bearer " + token } });
                console.log(response.data);
                
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getClanUsers();
    }, [])

    const handleChangeInput = (text: string) => {
        setValorInput(text);
    };

    async function buscarUsuarios(inputValue: string) {
        try {
            const response = await axios.get(ruta + "v2/guilds/" + clan.id + "/users", { headers: { "Authorization": "Bearer " + token } });
            const usuariosFiltrados: Array<User> = response.data.filter((usuario: User) =>
                usuario.name.includes(inputValue)
            );
            setUsers(usuariosFiltrados);
        } catch (error) {
            console.log(error);
        }
    }

    async function unirse() {
        try {
            const response = await axios.put(ruta + "v2/guilds/" + clan.id + "/joinguild", {}, { headers: { "Authorization": "Bearer " + token } });
            setUsers([...users, user]);
            setUser({ ...user, id_guild: clan.id });
            setPertenece(true);
            
        } catch (error: any) {
            console.log(error);
            if (error.response.status == 406) {
                ToastAndroid.show("Ya estas en un gremio", ToastAndroid.LONG)
            }
        }
    }

    async function abandonar() {
        if (users.length <= 1) {
            
        } else {
            try {
                const response = await axios.put(ruta + "v2/guilds/" + clan.id + "/leaveguild", {}, { params: { newLeader: -1 }, headers: { "Authorization": "Bearer " + token } });
                setUser({ ...user, id_guild: undefined });
                setPertenece(false);
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
                            <Text style={{ color: "yellow", fontSize: 16, fontFamily: "MadimiOneRegular", textAlign: "center" }} numberOfLines={2} ellipsizeMode='tail'>{clan.description}</Text>
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
                            {(!pertenece) ?
                                <TouchableHighlight onPress={() => unirse()} style={{ width: "100%", borderWidth: 4, borderColor: "rgba(200, 50, 50, 1)", backgroundColor: "rgba(20, 40, 140, 1)", height: 40, justifyContent: 'center', borderRadius: 18 }}>
                                    <Text style={{ fontFamily: "MadimiOneRegular", color: "yellow", fontSize: 16, textAlign: 'center' }}>Unirse</Text>
                                </TouchableHighlight>
                                :
                                <TouchableHighlight underlayColor={"transparent"} onPress={abandonar} style={{ width: "100%", borderWidth: 4, borderColor: "rgba(200, 50, 50, 1)", backgroundColor: "rgba(20, 40, 140, 1)", height: 40, justifyContent: 'center', borderRadius: 18 }}>
                                    <Text style={{ fontFamily: "MadimiOneRegular", color: "yellow", fontSize: 16, textAlign: 'center' }}>Abandonar</Text>
                                </TouchableHighlight>
                            }
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
        </View>
    );
};

export default ClanProfileOther

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

});
