import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Image } from 'react-native-elements/dist/image/Image'
import { AppContext } from '../context/AppContextProvider'
import Globals from './Globals'

type Props = {
    navigation: any
}

const NavBarTop = ({ navigation }: Props) => {
    const { user, eggsContext, goldenEggsContext, imgContext } = useContext(AppContext);
    const { ruta } = Globals();
    const [img, setImg] = useState("");

    function abreviarNumero(valor: number): string {
        if (valor < 10000) {
            return valor.toString();
        } else if (valor < 1000000) {
            const parteDecimal = Math.floor((valor % 1000) / 10); // Extraer la parte decimal y redondear hacia abajo
            const parteEntera = Math.floor(valor / 1000);
            return `${parteEntera}.${parteDecimal.toString().padStart(2, '0')}K`;
        } else if (valor < 1000000000) {
            const parteDecimal = Math.floor((valor % 1000000) / 10000); // Extraer la parte decimal y redondear hacia abajo
            const parteEntera = Math.floor(valor / 1000000);
            return `${parteEntera}.${parteDecimal.toString().padStart(2, '0')}M`;
        } else if (valor < 1000000000000) {
            const parteDecimal = Math.floor((valor % 1000000000) / 10000000); // Extraer la parte decimal y redondear hacia abajo
            const parteEntera = Math.floor(valor / 1000000000);
            return `${parteEntera}.${parteDecimal.toString().padStart(2, '0')}B`;
        } else {
            const parteDecimal = Math.floor((valor % 1000000000000) / 10000000000); // Extraer la parte decimal y redondear hacia abajo
            const parteEntera = Math.floor(valor / 1000000000000);
            return `${parteEntera}.${parteDecimal.toString().padStart(2, '0')}T`;
        }
    }

    function goToProfile() {
        navigation.navigate("Profile");
    }

    return (
        <View style={{ width: "100%", height: "7%", backgroundColor: "rgb(28, 64, 169)", justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', borderTopWidth: 2, borderBottomWidth: 2 }}>
            <TouchableOpacity onPress={() => goToProfile()} style={{ width: "11%", height: "80%" }}>
                <Image source={{ uri: imgContext }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
            </TouchableOpacity>
            <View style={{ width: "20%", height: "60%" }}>
                <Image source={require('../assets/imgs/tablon.png')} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "100%", height: "100%", borderRadius: 100, flexDirection: 'row' }}>
                    <Text style={{ color: "black", fontWeight: "bold" }}>{abreviarNumero(eggsContext)}</Text>
                    <View style={{ width: "18%", height: "60%", marginLeft: 5 }}>
                        <Image source={require('../assets/imgs/FireAntEgg.webp')} style={{ width: "100%", height: "100%" }} />
                    </View>
                </View>
            </View>

            <View style={{ width: "20%", height: "60%" }}>
                <Image source={require('../assets/imgs/tablon.png')} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "100%", height: "100%", borderRadius: 100, flexDirection: 'row' }}>
                    <Text style={{ color: "black", fontWeight: "bold" }}>{goldenEggsContext}</Text>
                    <View style={{ width: "18%", height: "60%", marginLeft: 5 }}>
                        <Image source={require('../assets/imgs/GoldenAntEgg2.png')} style={{ width: "100%", height: "100%" }} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default NavBarTop

const styles = StyleSheet.create({})