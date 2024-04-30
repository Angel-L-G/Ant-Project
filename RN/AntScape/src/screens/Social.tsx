import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput, FlatList, KeyboardAvoidingView, Platform, Image } from 'react-native';
import NavBarBotton from '../components/NavBarBotton';
import NavBarTop from '../components/NavBarTop';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { ClanType, User } from '../types/types';
import UsuarioCard from '../components/UsuarioCard';
import Globals from '../components/Globals';
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';
import ClanCard from '../components/ClanCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, "Social">;

const Social = ({ navigation, route }: Props) => {
    const {ruta} = Globals();
    const {token, user} = useContext(AppContext);
    const [activeTab, setActiveTab] = useState(0);
    const [usuarios, setUsuarios] = useState<Array<User>>([]);
    const [amigos, setAmigos] = useState<Array<User>>([]);
    const [clan, setClan] = useState<ClanType>({} as ClanType);
    const [tieneClan, setTieneClan] = useState(false);
    const [clanes, setClanes] = useState<Array<ClanType>>([]);
    const [valorInput, setValorInput] = useState('');
    const [clanUsers, setClanUsers] = useState<Array<User>>([]);
    const tabNumber = route.params.tab;

    useEffect(() => {
        setActiveTab(tabNumber);

        async function getUsuarios() {
            try {
                const response = await axios.get(ruta + "v2/users", { headers: { "Authorization": "Bearer " + token } });
                const usuariosFiltrados: Array<User> = response.data.filter((usuario: User) => 
                    usuario.name.includes(valorInput) && usuario.name !== user.name
                );
                setUsuarios(usuariosFiltrados);
            } catch (error) {
                console.log(error);
            }
        }

        getUsuarios();

        async function getAmigos() {
            try {
                const response = await axios.get(ruta + "v2/users/" + user.id + "/friends", { headers: { "Authorization": "Bearer " + token } });
                const amigosFiltrados: Array<User> = response.data.filter((amigo: User) => 
                    amigo.name.includes(valorInput) && amigo.name !== user.name
                );
                setAmigos(amigosFiltrados);
            } catch (error) {
                console.log(error);
            }
        }

        getAmigos();

        async function getClans() {
            try {
                const response = await axios.get(ruta + "v2/guilds", { headers: { "Authorization": "Bearer " + token } });
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].id === user.id_guild) {
                        setClan(response.data[i]);
                        setTieneClan(true);
                    }
                }
                const clanesFiltrados: Array<ClanType> = response.data.filter((c: ClanType) => 
                    c.name.includes(valorInput) && c !== clan
                );
                setClanes(clanesFiltrados);
            } catch (error) {
                console.log(error);
            }
        }

        getClans();

        async function getClanUsers() {
            try {
                const response = await axios.get(ruta + "v2/guilds", { headers: { "Authorization": "Bearer " + token } });
            } catch (error) {
                console.log(error);
            }
        }

        getClanUsers();

        console.log("UseEffect");
    }, [tabNumber])

    function passToChildren() {

    }

    const handleTabPress = (tabIndex: number) => {
        setActiveTab(tabIndex);
        setValorInput('');
    
        if (tabIndex === 0) {
            buscarUsuarios("");
        } else if (tabIndex === 1) {
            buscarAmigos("");
        } else if (tabIndex === 2) {
            buscarClan();
            buscarClanes("");
        }
    };

    const handleChangeInput = (text: string) => {
        setValorInput(text);
        console.log(valorInput);
    };

    async function buscarUsuarios(inputValue: string) {
        try {
            const response = await axios.get(ruta + "v2/users", { headers: { "Authorization": "Bearer " + token } });
            const usuariosFiltrados: Array<User> = response.data.filter((usuario: User) => 
                usuario.name.includes(inputValue) && usuario.name !== user.name
            );
            setUsuarios(usuariosFiltrados);
            console.log(usuariosFiltrados);
        } catch (error) {
            console.log(error);
        }
    }
    
    async function buscarAmigos(inputValue: string) {
        try {
            const response = await axios.get(ruta + "v2/users/" + user.id + "/friends", { headers: { "Authorization": "Bearer " + token } });
            const amigosFiltrados: Array<User> = response.data.filter((amigo: User) => 
                amigo.name.includes(inputValue) && amigo.name !== user.name
            );
            setAmigos(amigosFiltrados);
            console.log(amigosFiltrados);
        } catch (error) {
            console.log(error);
        }
    }

    async function buscarClan() {
        try {
            if (user.id_guild != undefined) {
                const response = await axios.get(ruta + "v2/guilds/" + user.id_guild, { headers: { "Authorization": "Bearer " + token } });
                setClan(response.data);
                setTieneClan(true);
            } else {
                setTieneClan(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function buscarClanes(texto: string) {
        try {
            const response = await axios.get(ruta + "v2/guilds", { headers: { "Authorization": "Bearer " + token } });
            const clanesFiltrados: Array<ClanType> = response.data.filter((c: ClanType) => 
                c.name.includes(valorInput) && c !== clan
            );
            setClanes(clanesFiltrados);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                <View style={{ height: "93%", width: "100%" }}>
                    <View style={styles.tabsContainer}>
                        <TouchableHighlight
                            style={[styles.tab, activeTab === 0 && styles.activeTab]}
                            onPress={() => handleTabPress(0)}
                            underlayColor="transparent"
                        >
                            <Text style={styles.tabText}>Usuarios</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.tab, activeTab === 1 && styles.activeTab]}
                            onPress={() => handleTabPress(1)}
                            underlayColor="transparent"
                        >
                            <Text style={styles.tabText}>Amigos</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.tab, activeTab === 2 && styles.activeTab]}
                            onPress={() => handleTabPress(2)}
                            underlayColor="transparent"
                        >
                            <Text style={styles.tabText}>Clan</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{alignItems: 'center', height: "92.5%", width: "100%"}}>
                        {(activeTab === 0) && 
                            <View style={{height: "100%", width: "100%"}}>
                                <View style={{height: "14%", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: "100%"}}>
                                    <TextInput style={{backgroundColor: "white", height: 40, width: "50%", borderRadius: 100, color: "black"}} onChangeText={handleChangeInput} />
                                    <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    style={{justifyContent: 'center', marginLeft: -30, height: 35}}>
                                        <TouchableHighlight underlayColor={"rgba(20, 40, 140, 1)"} onPress={() => buscarUsuarios(valorInput)} style={{justifyContent: 'center', width: 40}}>
                                            <Icon name="search" size={30} color={"yellow"}></Icon>
                                        </TouchableHighlight>
                                    </LinearGradient>
                                </View>
                                <View style={{height: "86%", width: "100%", backgroundColor: "rgb(15, 47, 150)"}}>
                                    {(usuarios.length > 0) ? 
                                        <FlatList
                                        data={usuarios}
                                        renderItem={({ item }) =>
                                            <View>
                                                <TouchableHighlight underlayColor={"rgba(10, 40, 140, 1)"} onPress={() => navigation.navigate("ProfileOther", {usu: item})}><UsuarioCard usu={item} navigation={navigation}/></TouchableHighlight>
                                                <View style={{height: 1, backgroundColor: "black"}}></View>
                                            </View>
                                        }
                                        style={{}}
                                        />
                                    :
                                        <Text style={{marginTop: 40, color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", alignSelf: 'center'}}>No se han encontrado usuarios</Text>
                                    }
                                </View>
                            </View>
                        }

                        {(activeTab === 1) && 
                            <View style={{height: "100%", width: "100%"}}>
                                <View style={{height: "14%", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: "100%"}}>
                                    <TextInput style={{backgroundColor: "white", height: 40, width: "50%", borderRadius: 100, color: "black"}} onChangeText={handleChangeInput} />
                                    <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    style={{justifyContent: 'center', marginLeft: -30, height: 35}}>
                                        <TouchableHighlight underlayColor={"rgba(20, 40, 140, 1)"} onPress={() => buscarAmigos(valorInput)} style={{justifyContent: 'center', width: 40}}>
                                            <Icon name="search" size={30} color={"yellow"}></Icon>
                                        </TouchableHighlight>
                                    </LinearGradient>
                                </View>
                                <View style={{height: "86%", width: "100%", backgroundColor: "rgb(15, 47, 150)"}}>
                                    {(amigos.length > 0) ? 
                                        <FlatList
                                        data={amigos}
                                        renderItem={({ item }) =>
                                            <View>
                                                <TouchableHighlight underlayColor={"rgba(10, 40, 140, 1)"} onPress={() => navigation.navigate("ProfileOther", {usu: item})}><UsuarioCard usu={item} navigation={navigation}/></TouchableHighlight>
                                                <View style={{height: 1, backgroundColor: "black"}}></View>
                                            </View>
                                        }
                                        style={{}}
                                        />
                                    :
                                        <Text style={{marginTop: 40, color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", alignSelf: 'center', width: "70%", textAlign: 'center'}}>No se han encontrado amigos</Text>
                                    }
                                </View>
                            </View>
                        }

                        {(activeTab === 2) && 
                            <View style={{height: "100%", width: "100%"}}>
                                <View style={{height: "14%", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: "100%"}}>
                                    <TextInput style={{backgroundColor: "white", height: 40, width: "50%", borderRadius: 100, color: "black"}} onChangeText={handleChangeInput} />
                                    <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    style={{justifyContent: 'center', marginLeft: -30, height: 35}}>
                                        <TouchableHighlight underlayColor={"rgba(20, 40, 140, 1)"} onPress={() => buscarClanes(valorInput)} style={{justifyContent: 'center', width: 40}}>
                                            <Icon name="search" size={30} color={"yellow"}></Icon>
                                        </TouchableHighlight>
                                    </LinearGradient>
                                </View>
                                <View style={{height: "86%", width: "100%", backgroundColor: "rgb(15, 47, 150)"}}>
                                    {(clanes.length > 0) ? 
                                        <FlatList
                                        data={clanes}
                                        renderItem={({ item }) =>
                                            (user.id_guild === item.id || item.leader === user.id) ?
                                                <View>
                                                    <TouchableHighlight underlayColor={"rgba(10, 40, 140, 1)"} onPress={() => navigation.navigate("ClanProfile", {clan: item})}><ClanCard clan={item} navigation={navigation}/></TouchableHighlight>
                                                    <View style={{height: 1, backgroundColor: "black"}}></View>
                                                </View>
                                            :
                                                <View>
                                                    <TouchableHighlight underlayColor={"rgba(10, 40, 140, 1)"} onPress={() => navigation.navigate("ClanProfileOther", {clan: item})}><ClanCard clan={item} navigation={navigation}/></TouchableHighlight>
                                                    <View style={{height: 1, backgroundColor: "black"}}></View>
                                                </View>
                                        }
                                        style={{}}
                                        />
                                    :
                                        <Text style={{marginTop: 40, color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", alignSelf: 'center'}}>No se han encontrado clanes</Text>
                                    }
                                </View>
                            </View>
                        }
                    </View>
                </View>
                <NavBarBotton navigation={navigation} icon='social' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    tabsContainer: {
        backgroundColor: "rgb(15, 47, 150)",
        flexDirection: 'row',
        height: "7.5%",
        width: "100%",
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(28, 64, 169)',
    },
    activeTab: {
        backgroundColor: 'rgba(255, 255, 0, 0.18)',
        borderBottomColor: 'yellow',
    },
    tabText: {
        fontSize: 18,
        fontFamily: 'MadimiOneRegular',
        color: 'yellow',
    }
});

export default Social;
