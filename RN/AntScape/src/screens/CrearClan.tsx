import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useContext, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Globals from '../components/Globals';
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import ShieldClanCard from '../components/ShieldClanCard';

type Props = {
    navigation: any
}

const CrearClan = ({ navigation }: Props) => {
    const { ruta } = Globals();
    const { token, setUser, user } = useContext(AppContext);
    const [descripcion, setDescripcion] = useState('');
    const [nombre, setNombre] = useState('');
    const [icono, setIcono] = useState('flame');
    const [colorIcono, setColorIcono] = useState("red");
    const [colorFondo, setColorFondo] = useState("black");

    let array = ["flame", "flash", "leaf", "moon", "nutrition", "rocket", "skull", "baseball", "bug"];

    async function crearClan() {
        try {
            const params = {
                guildName: nombre,
                guildDescription: descripcion,
                guildImage: icono + colorIcono + colorFondo
            }
            const response = await axios.post(ruta + "v2/guilds", null, { params: params, headers: { "Authorization": "Bearer " + token } });
            console.log(response.data);
            setUser({ ...user, id_guild: response.data.id });
            navigation.navigate("Social", { tab: 2 });
        } catch (error) {
            console.log(error);
        }
    }

    function volver() {
        navigation.goBack();
    }

    return (
        <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                <View style={{ width: "85%", height: "70%", backgroundColor: "white", borderRadius: 25, borderWidth: 5, borderColor: "yellow", alignItems: 'center' }}>
                    <View style={{ height: "20%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ marginTop: "5%" }}>
                            <Text style={{ color: "rgba(20, 40, 140, 1)", fontSize: 20, fontFamily: "MadimiOneRegular", textDecorationLine: "underline", textAlign: "center" }}>Nombra tu clan</Text>
                            <TextInput
                                onChangeText={setNombre}
                                value={nombre}
                                style={{ padding: 8, fontSize: 16, marginTop: 15, color: "yellow", backgroundColor: "rgba(20, 40, 140, 1)", width: 150, borderRadius: 15 }}
                                placeholder="Nombre del Clan..."
                                placeholderTextColor={"white"}
                                maxLength={15}
                            />
                        </View>
                    </View>
                    <View style={{ height: "48%", width: "100%" }}>
                        <View style={{ height: "20%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "rgba(20, 40, 140, 1)", fontSize: 20, fontFamily: "MadimiOneRegular", textDecorationLine: "underline" }}>Elige tu Estandarte</Text>
                        </View>
                        <View style={{ flexDirection: "row", height: "80%" }}>
                            <View style={{ width: "61%", height: "100%", justifyContent: "center", alignItems: 'center', marginHorizontal: "2%" }}>
                                <FlatList
                                    data={array}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity onPress={() => setIcono(item)} style={{ padding: "6%", margin: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "black", borderRadius: 100 }}>
                                            <Icon name={item} size={35} color={"red"}></Icon>
                                        </TouchableOpacity>
                                    }
                                    style={{}}
                                    numColumns={3}
                                />
                            </View>
                            <View style={{ width: "32%", height: "100%", marginLeft: "3%", justifyContent: "center", alignItems: "center" }}>
                                <ShieldClanCard colorFondo={colorFondo} colorIcono={colorIcono} icono={icono} navigation={navigation} />
                                <View style={{ marginHorizontal: "5%" }}>
                                    <Text style={{ color: "rgba(20, 40, 140, 1)", fontSize: 14, fontFamily: "MadimiOneRegular" }}>Color del logo:</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => setColorIcono("red")} style={{ width: 20, height: 20, backgroundColor: "red", borderRadius: 100, margin: 5 }}></TouchableOpacity>
                                        <TouchableOpacity onPress={() => setColorIcono("green")} style={{ width: 20, height: 20, backgroundColor: "green", borderRadius: 100, margin: 5 }}></TouchableOpacity>
                                        <TouchableOpacity onPress={() => setColorIcono("blue")} style={{ width: 20, height: 20, backgroundColor: "blue", borderRadius: 100, margin: 5 }}></TouchableOpacity>
                                    </View>
                                    <Text style={{ color: "rgba(20, 40, 140, 1)", fontSize: 14, fontFamily: "MadimiOneRegular" }}>Color de fondo:</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => setColorFondo("purple")} style={{ width: 20, height: 20, backgroundColor: "purple", borderRadius: 100, margin: 5 }}></TouchableOpacity>
                                        <TouchableOpacity onPress={() => setColorFondo("black")} style={{ width: 20, height: 20, backgroundColor: "black", borderRadius: 100, margin: 5 }}></TouchableOpacity>
                                        <TouchableOpacity onPress={() => setColorFondo("yellow")} style={{ width: 20, height: 20, backgroundColor: "yellow", borderRadius: 100, margin: 5 }}></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: "25%", width: "100%", alignItems: "center" }}>
                        <Text style={{ color: "rgba(20, 40, 140, 1)", fontSize: 20, fontFamily: "MadimiOneRegular", textDecorationLine: "underline", textAlign: "center", marginBottom: "1%" }}>Descripción del Clan</Text>
                        <TextInput
                            multiline
                            numberOfLines={3}
                            onChangeText={setDescripcion}
                            value={descripcion}
                            style={{ padding: 8, fontSize: 16, marginTop: "3%", color: "yellow", backgroundColor: "rgba(20, 40, 140, 1)", width: 250, borderRadius: 15, textAlignVertical: 'top', }}
                            placeholder="Descripción del Clan..."
                            placeholderTextColor={"white"}
                            maxLength={80}
                        />
                    </View>

                    <View style={{ height: "7%", width: "100%", alignItems: "center" }}>
                        <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ width: "40%", height: "100%", borderRadius: 100, bottom: "50%", marginTop: "2%" }}>
                            <TouchableHighlight onPress={() => crearClan()} style={{ width: "100%", height: "100%", borderWidth: 2, borderRadius: 100, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular"}}>Crear Clan</Text>
                            </TouchableHighlight>
                        </LinearGradient>
                    </View>

                    <View style={{ position: 'absolute' }}>
                        <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ width: 40, height: 40, borderRadius: 100, bottom: "50%", left: "430%" }}>
                            <TouchableHighlight underlayColor={"rgba(20, 40, 140, 1)"} onPress={volver} style={{ width: 40, height: 40, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 26 }}>X</Text>
                            </TouchableHighlight>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default CrearClan

const styles = StyleSheet.create({})