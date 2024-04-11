import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableHighlight, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { User } from '../components/types'
import LinearGradient from 'react-native-linear-gradient'
import { Image } from 'react-native-elements'
import styles from '../themes/styles'
import Globals from '../components/Globals'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider'
import { Modal } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, "ProfileOther">;

const ProfileOther = ({route, navigation}: Props) => {
    const {token, user} = useContext(AppContext);
    const {usu} = route.params;
    const {ruta} = Globals();
    const [amigo, setAmigo] = useState(false);
    const [bloqueado, setBloqueado] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

    function volver() {
        navigation.goBack();
    }

    useEffect(() => {
        async function buscarAmigos() {
            try {
                const response = await axios.get(ruta + "v2/users/" + user.id + "/friends", { headers: { "Authorization": "Bearer " + token } });
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].id == usu.id) {
                        setAmigo(true);
                    }
                }
                console.log(amigo);
            } catch (error) {
                console.log(error);
            }
        }

        buscarAmigos();

        async function buscarBloqueados() {
            try {
                const response = await axios.get(ruta + "v2/users/" + user.id + "/bloqued", { headers: { "Authorization": "Bearer " + token } });
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].id == usu.id) {
                        setBloqueado(true);
                    }
                }
                console.log(bloqueado);
            } catch (error) {
                console.log(error);
            }
        }

        buscarBloqueados();
    }, [])

    async function aniadirAmigo() {
        try {
            const response = await axios.post(ruta + "v2/users/" + user.name + "/friends/" + usu.name, {}, { headers: { "Authorization": "Bearer " + token } });
            console.log(response.data);
            setAmigo(true);
        } catch (error) {
            console.log(error);
        }
    }
    
    async function eliminarAmigo() {
        try {
            const response = await axios.delete(ruta + "v2/users/" + user.name + "/friends/" + usu.name, { headers: { "Authorization": "Bearer " + token } });
            console.log(response.data);
            setAmigo(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function bloquear() {
        setModalVisible(true);
    }

    async function bloquearEnModal(opcion: string) {
        if (opcion == "confirmar") {
            if (bloqueado) {
                try {
                    const response = await axios.delete(ruta + "v2/users/" + user.name + "/blocked/" + usu.name, { headers: { "Authorization": "Bearer " + token } });
                    console.log(response.data);
                    setBloqueado(false);
                    setModalVisible(false);
                } catch (error) {
                    console.log(error);
                }
            } else {
                if (amigo) {
                    try {
                        const response = await axios.delete(ruta + "v2/users/" + user.name + "/friends/" + usu.name, { headers: { "Authorization": "Bearer " + token } });
                        console.log(response.data);
                        setAmigo(false);
                    } catch (error) {
                        console.log(error);
                    }

                    try {
                        const response = await axios.post(ruta + "v2/users/" + user.name + "/blocked/" + usu.name, {}, { headers: { "Authorization": "Bearer " + token } });
                        console.log(response.data);
                        setBloqueado(true);
                        setModalVisible(false);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    try {
                        const response = await axios.post(ruta + "v2/users/" + user.name + "/blocked/" + usu.name, {}, { headers: { "Authorization": "Bearer " + token } });
                        console.log(response.data);
                        setBloqueado(true);
                        setModalVisible(false);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } else if (opcion == "cancelar") {
            setModalVisible(false);
        }
    }

    function noSePuede() {
        ToastAndroid.show('No puedes añadir a alguien bloqueado', ToastAndroid.LONG);
    }

    return (
        <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}>
            <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
                <View style={{width: "85%", height: "85%", backgroundColor: "white", borderRadius: 25, borderWidth: 5, borderColor: "yellow", alignItems: 'center'}}>
                    <View style={{height: 200, width: 200, marginTop: 40}}>
                        <Image source={{uri: ruta + "v1/files/" + usu.img}} style={{width: "100%", height: "100%", borderRadius: 100}} />
                    </View>
                    <View style={{flex: 1, marginTop: 50}}>
                        <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Nombre: {usu.name}</Text>
                        {(usu.id_guild == null) ?
                            <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Guild: -----</Text>
                        :
                            <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Guild: {usu.id_guild}</Text>
                        }
                        <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Eggs: {usu.eggs}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        {(bloqueado) ? 
                            (amigo) ?
                                <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={{marginBottom: 40, marginRight: 15}}>
                                    <TouchableOpacity style={styles.button} onPress={() => noSePuede()}>
                                        <Text style={{fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 22}}>Eliminar amigo</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            :
                                <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={{marginBottom: 40, marginRight: 15}}>
                                    <TouchableOpacity style={styles.button} onPress={() => noSePuede()}>
                                        <Text style={{fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 22}}>Añadir amigo</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                        :
                            (amigo) ?
                                <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={{marginBottom: 40, marginRight: 15}}>
                                    <TouchableOpacity style={styles.button} onPress={() => eliminarAmigo()}>
                                        <Text style={{fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 22}}>Eliminar amigo</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            :
                                <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={{marginBottom: 40, marginRight: 15}}>
                                    <TouchableOpacity style={styles.button} onPress={() => aniadirAmigo()}>
                                        <Text style={{fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 22}}>Añadir amigo</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                        }
                        {(bloqueado) ?
                            <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{marginBottom: 40, marginLeft: 15}}>
                                <TouchableOpacity style={styles.button} onPress={() => bloquear()}>
                                    <Text style={{fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 22}}>Eliminar Bloqueo</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        :
                            <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{marginBottom: 40, marginLeft: 15, justifyContent: 'center'}}>
                                <TouchableOpacity style={styles.button} onPress={() => bloquear()}>
                                    <Text style={{fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 22}}>Bloquear</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        }
                    </View>
                    <View>
                        <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{marginBottom: 40}}>
                            <TouchableOpacity onPress={volver} style={styles.button}>
                                <Text style={{fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 22}}>Volver</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>
            
            <Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1.25 }}
                    style={stylesModal.modalView}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                {(bloqueado) ?
                                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, color: "yellow", textAlign: 'center', marginBottom: 20}}>¿Estás seguro de que quieres desbloquear a {usu.name}?</Text>
                                :
                                    (amigo) ?
                                        <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, color: "yellow", textAlign: 'center', marginBottom: 20}}>Si bloqueas a {usu.name} dejara de ser tu amigo. ¿Estás seguro?</Text>
                                    :
                                        <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, color: "yellow", textAlign: 'center', marginBottom: 20}}>¿Estás seguro de que quieres bloquear a {usu.name}?</Text>
                                }
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableHighlight onPress={() => bloquearEnModal("cancelar")} style={{height: 60, width: 100, borderWidth: 4, borderColor: "rgba(200, 50, 50, 1)", backgroundColor: "rgba(20, 40, 140, 1)", marginRight: 20, borderRadius: 25, justifyContent: "center", alignItems: 'center'}}>
                                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow"}}>Cancelar</Text>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={() => bloquearEnModal("confirmar")} style={{height: 60, width: 100,  borderWidth: 4, borderColor: "rgba(50, 180, 120, 1)", backgroundColor: "rgba(20, 40, 140, 1)", marginLeft: 20, borderRadius: 25, justifyContent: "center", alignItems: 'center'}}>
                                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow"}}>Confirmar</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </LinearGradient>
				</View>
			</Modal>
        </LinearGradient>
    )
}

export default ProfileOther

const stylesModal = StyleSheet.create({
    modalView: {
		backgroundColor: '#00a8d6',
		borderRadius: 20,
		padding: 30,
		elevation: 15,
		height: "auto",
		width: 320
	},
})