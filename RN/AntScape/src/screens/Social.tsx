import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import NavBarBotton from '../components/NavBarBotton';
import NavBarTop from '../components/NavBarTop';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Clan, User } from '../components/types';
import UsuarioCard from '../components/UsuarioCard';
import Globals from '../components/Globals';
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';

type Props = {
    navigation: any,
}

const Social = ({ navigation }: Props) => {
    const {ruta} = Globals();
    const {token, user} = useContext(AppContext);
    const [activeTab, setActiveTab] = useState(0);
    const [usuarios, setUsuarios] = useState<Array<User>>([]);
    const [amigos, setAmigos] = useState<Array<User>>([]);
    const [clan, setClan] = useState<Clan>({} as Clan);
    const [valorInput, setValorInput] = useState('');

    useEffect(() => {
        async function getU() {
            const response = await axios.get(ruta + "v2/users", { headers: { "Authorization": "Bearer " + token } });
            const usuariosFiltrados: Array<User> = response.data.filter((usuario: User) => 
                usuario.name.includes(valorInput) && usuario.name !== user.name
            );
            setUsuarios(usuariosFiltrados);
        }

        getU();

        async function getA() {
            const response = await axios.get(ruta + "v2/users/" + user.id + "/friends", { headers: { "Authorization": "Bearer " + token } });
            const amigosFiltrados: Array<User> = response.data.filter((amigo: User) => 
                amigo.name.includes(valorInput) && amigo.name !== user.name
            );
            setAmigos(amigosFiltrados);
        }

        getA();

        async function getC() {
            const response = await axios.get(ruta + "v2/guilds/" + user.id_guild, { headers: { "Authorization": "Bearer " + token } });
            const amigosFiltrados: Array<User> = response.data.filter((amigo: User) => 
                amigo.name.includes(valorInput) && amigo.name !== user.name
            );
            setAmigos(amigosFiltrados);
        }

        getC();
    }, [])
    

    const handleTabPress = (tabIndex: number) => {
        setActiveTab(tabIndex);
        setValorInput('');
    
        if (tabIndex === 0) {
            buscarUsuarios("");
        } else if (tabIndex === 1) {
            buscarAmigos("");
        } else if (tabIndex === 2) {
            buscarClan();
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
            const response = await axios.get(ruta + "v2/guilds/" + user.id_guild, { headers: { "Authorization": "Bearer " + token } });

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
                                    <TextInput style={{backgroundColor: "white", height: 35, width: "50%", borderRadius: 100}} onChangeText={handleChangeInput} />
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
                                                <TouchableHighlight underlayColor={"rgba(10, 40, 140, 1)"} onPress={() => navigation.navigate("ProfileOther", {usu: item})}><UsuarioCard user={item}/></TouchableHighlight>
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
                                    <TextInput style={{backgroundColor: "white", height: 35, width: "50%", borderRadius: 100}} onChangeText={handleChangeInput} />
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
                                                <TouchableHighlight underlayColor={"rgba(10, 40, 140, 1)"} onPress={() => navigation.navigate("ProfileOther", {usu: item})}><UsuarioCard user={item}/></TouchableHighlight>
                                                <View style={{height: 1, backgroundColor: "black"}}></View>
                                            </View>
                                        }
                                        style={{}}
                                        />
                                    :
                                        <Text style={{marginTop: 40, color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", alignSelf: 'center', width: "70%", textAlign: 'center'}}>No se han encontrado amigos con ese nombre</Text>
                                    }
                                </View>
                            </View>
                        }

                        {(activeTab === 2) && 
                            <Text>Clan</Text>
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
