import { View, Text, Image, FlatList, TouchableHighlight, Modal, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import styles from '../themes/styles'
import UseUser from '../hooks/UseUser'
import { AppContext, useAppContext } from '../context/AppContextProvider'
import { Button, Input } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { launchImageLibrary } from 'react-native-image-picker';

type Props = {
    navigation: any
}

const Profile = ({navigation}: Props) => {
    const [selectedImage, setSelectedImage] = useState<string>({} as string);
    const {user} = useContext(AppContext);

    const openImagePicker = () => {
        const options: any = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('Image picker error: ', response.errorMessage);
            } else {
                let image64: string = response.assets?.[0].base64 + "" || response.assets?.[0].base64 + "";
                setSelectedImage(image64);
                console.log(image64);
            }
        });
    };

    function volver() {
        navigation.navigate("Personal");
    }

    return (
        <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}>
            <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
                <View style={{width: "85%", height: "85%", backgroundColor: "white", borderRadius: 25, borderWidth: 5, borderColor: "yellow", alignItems: 'center'}}>
                    <View style={{height: 200, width: 200, marginTop: 40}}>
                        <TouchableOpacity onPress={() => openImagePicker()} style={{}}>
                            <Image source={require('../assets/imgs/profile.png')} style={{width: "100%", height: "100%", borderRadius: 100}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, marginTop: 50}}>
                        <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Nombre: {user.name}</Text>
                        <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Guild: {user.id_guild}</Text>
                        <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Eggs: {user.eggs}</Text>
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
        </LinearGradient>
    )
}

export default Profile