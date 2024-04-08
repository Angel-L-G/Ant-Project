import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { User } from '../components/types'
import LinearGradient from 'react-native-linear-gradient'
import { Image } from 'react-native-elements'
import styles from '../themes/styles'
import Globals from '../components/Globals'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, "ProfileOther">;

const ProfileOther = ({route, navigation}: Props) => {
    const {user} = route.params;
    const {ruta} = Globals();

    function volver() {
        navigation.goBack();
    }

    return (
        <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}>
            <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
                <View style={{width: "85%", height: "85%", backgroundColor: "white", borderRadius: 25, borderWidth: 5, borderColor: "yellow", alignItems: 'center'}}>
                    <View style={{height: 200, width: 200, marginTop: 40}}>
                        <Image source={{uri: ruta + "v1/files/" + user.img}} style={{width: "100%", height: "100%", borderRadius: 100}} />
                    </View>
                    <View style={{flex: 1, marginTop: 50}}>
                        <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Nombre: {user.name}</Text>
                        {(user.id_guild == null) ?
                            <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Guild: -----</Text>
                        :
                            <Text style={{fontFamily: "MadimiOneRegular", fontSize: 20, margin: 10, color: "rgba(20, 40, 140, 1)"}}>Guild: {user.id_guild}</Text>
                        }
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

export default ProfileOther