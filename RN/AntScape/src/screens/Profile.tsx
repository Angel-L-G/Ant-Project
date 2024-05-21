import { View, Text, Image, FlatList, TouchableHighlight, Modal, RefreshControl, TouchableOpacity, ToastAndroid, LogBox } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import styles from '../themes/styles'
import { AppContext, useAppContext } from '../context/AppContextProvider'
import LinearGradient from 'react-native-linear-gradient'
import { launchImageLibrary } from 'react-native-image-picker';
import Globals from '../components/Globals';
import axios from 'axios';
import { ClanType } from '../types/types';

type Props = {
    navigation: any
}

const Profile = ({ navigation }: Props) => {
    LogBox.ignoreAllLogs();
    const { ruta } = Globals();
    const { setUser, user, eggsContext, token, setImgContext } = useContext(AppContext);
    const [selectedImage, setSelectedImage] = useState<string>(ruta + "v1/files/" + user.img);
    const [selectedImage64, setSelectedImage64] = useState<string>("");
    const [clan, setClan] = useState<ClanType>({} as ClanType);

    useEffect(() => {
        async function getClan() {
            try {
                const response = await axios.get(ruta + "v2/guilds/" + user.id_guild, { headers: { "Authorization": "Bearer " + token } });
                setClan(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getClan();
    }, [])

    const openImagePicker = () => {
        const options: any = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {

            } else if (response.errorMessage) {

            } else {
                let image64: string = response.assets?.[0].base64 + "" || response.assets?.[0].base64 + "";
                setSelectedImage(`data:image/png;base64,${image64}`);
                setSelectedImage64(image64);
            }
        });
    };

    async function updateImage() {
        if (selectedImage64 == "") {
            ToastAndroid.show("No has seleccionado ninguna imagen", ToastAndroid.SHORT);
        } else {
            const body = {
                imgName: "profile" + user.name + ".png",
                base64: selectedImage64
            }

            try {
                const response = await axios.put(ruta + "v2/users/profilepic", body, { headers: { "Authorization": "Bearer " + token } });

                const responseGet = await axios.get(ruta + "v2/users/me", { headers: { "Authorization": "Bearer " + token } });

                setUser(responseGet.data);
                setSelectedImage(ruta + "v1/files/" + responseGet.data.img);
                setImgContext(ruta + "v1/files/" + responseGet.data.img)
            } catch (error) {
                console.log(error);
            }
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
                <View style={{ width: "85%", height: "85%", backgroundColor: "white", borderRadius: 25, borderWidth: 5, borderColor: "yellow", alignItems: 'center' }}>
                    <View style={{ height: 200, width: 200, marginTop: 40 }}>
                        <TouchableOpacity onPress={() => openImagePicker()} style={{}}>
                            <Image source={{ uri: selectedImage }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginTop: 50 }}>
                        <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)" }}>Nombre: {user.name}</Text>
                        <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)" }}>Guild: {clan.name}</Text>
                        <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)" }}>Eggs: {eggsContext}</Text>
                    </View>
                    <View>
                        <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ marginBottom: 40 }}>
                            <TouchableOpacity onPress={updateImage} style={styles.button}>
                                <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 22 }}>Actualizar</Text>
                            </TouchableOpacity>
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

export default Profile