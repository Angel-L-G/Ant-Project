import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import NavBarBotton from '../components/NavBarBotton';
import NavBarTop from '../components/NavBarTop';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { User } from '../components/types';
import UsuarioCard from '../components/UsuarioCard';
import Globals from '../components/Globals';
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    navigation: any,
}

const Social = ({ navigation }: Props) => {
    const {ruta} = Globals();
    const {token, user} = useContext(AppContext);
    const [activeTab, setActiveTab] = useState(0);
    const [usuarios, setUsuarios] = useState<Array<User>>([]);
    const [valorInput, setValorInput] = useState('');

    useEffect(() => {
        async function get() {
            const response = await axios.get(ruta + "v2/users", { headers: { "Authorization": "Bearer " + token } });
            const usuariosFiltrados: Array<User> = response.data.filter((usuario: User) => 
                usuario.name.includes(valorInput) && usuario.name !== user.name
            );
            setUsuarios(usuariosFiltrados);
        }

        get();
    }, [])
    

    const handleTabPress = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    const handleChangeInput = (text: string) => {
        setValorInput(text);
        console.log(valorInput);
        
    };

    async function buscarUsuarios() {
        try {
            const response = await axios.get(ruta + "v2/users", { headers: { "Authorization": "Bearer " + token } });
            const usuariosFiltrados: Array<User> = response.data.filter((usuario: User) => 
                usuario.name.includes(valorInput) && usuario.name !== user.name
            );
            setUsuarios(usuariosFiltrados);
            console.log(usuariosFiltrados);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={-1000} 
        style={styles.container}
        >
            <NavBarTop navigation={navigation} />

            <View style={{ height: "87%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                <View style={{ height: "100%", width: "100%" }}>
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
                            underlayColor="#transparent"
                        >
                            <Text style={styles.tabText}>Amigos</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.tab, activeTab === 2 && styles.activeTab]}
                            onPress={() => handleTabPress(2)}
                            underlayColor="#transparent"
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
                                        <TouchableHighlight onPress={() => buscarUsuarios()} style={{justifyContent: 'center', width: 40}}>
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
                                                <TouchableHighlight onPress={() => navigation.navigate("ProfileOther", {user: item})}><UsuarioCard user={item}/></TouchableHighlight>
                                                <View style={{height: 1, backgroundColor: "black"}}></View>
                                            </View>
                                        }
                                        style={{}}
                                        />
                                    :
                                        <Text style={{color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", alignSelf: 'center'}}>No se han encontrado usuarios</Text>
                                    }
                                </View>
                            </View>
                        }

                        {(activeTab === 1) && 
                            <Text>Amigos</Text>
                        }

                        {(activeTab === 2) && 
                            <Text>Clan</Text>
                        }
                    </View>
                </View>
                <NavBarBotton navigation={navigation} icon='social' />
            </View>
        </KeyboardAvoidingView>
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
    },

    /*
    <View style={styles.tabsContainer}>
                <TouchableHighlight
                    style={[styles.tab, activeTab === 0 && styles.activeTab]}
                    onPress={() => handleTabPress(0)}
                    underlayColor="#E5E5E5"
                >
                    <Text style={styles.tabText}>Tab 1</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.tab, activeTab === 1 && styles.activeTab]}
                    onPress={() => handleTabPress(1)}
                    underlayColor="#E5E5E5"
                >
                    <Text style={styles.tabText}>Tab 2</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.tab, activeTab === 2 && styles.activeTab]}
                    onPress={() => handleTabPress(2)}
                    underlayColor="#E5E5E5"
                >
                    <Text style={styles.tabText}>Tab 3</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.tab, activeTab === 3 && styles.activeTab]}
                    onPress={() => handleTabPress(3)}
                    underlayColor="#E5E5E5"
                >
                    <Text style={styles.tabText}>Tab 4</Text>
                </TouchableHighlight>
            </View>
    */
});

export default Social;
