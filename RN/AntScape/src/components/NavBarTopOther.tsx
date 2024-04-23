import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
    navigation: any
}

const NavBarTopOther = ({navigation}: Props) => {
    return (
        <View style={{ width: "100%", height: "7%", backgroundColor: "rgb(28, 64, 169)", justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', borderTopWidth: 2, borderBottomWidth: 2 }}>
            <TouchableOpacity onPress={() => navigation.navigate("ProfileOther")} style={{ width: "11%", height: "80%" }}>
                <Image source={{ uri: img }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
            </TouchableOpacity>
            <View style={{ width: "20%", height: "60%" }}>
                <Image source={require('../assets/imgs/tablon.png')} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
            </View>
            <View style={{ position: 'absolute', marginLeft: 112, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "20%", height: "60%", borderRadius: 100, flexDirection: 'row' }}>
                <Text style={{ color: "black", fontWeight: "bold" }}>{abreviarNumero(eggsContext)}</Text>
                <View style={{ width: "18%", height: "60%", marginLeft: 5 }}>
                    <Image source={require('../assets/imgs/FireAntEgg.webp')} style={{ width: "100%", height: "100%" }} />
                </View>
            </View>
            <View style={{ width: "20%", height: "60%" }}>
                <Image source={require('../assets/imgs/tablon.png')} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
            </View>
            <View style={{ position: 'absolute', marginLeft: 262, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "20%", height: "60%", borderRadius: 100, flexDirection: 'row' }}>
                <Text style={{ color: "black", fontWeight: "bold" }}>{user.goldenEggs}</Text>
                <View style={{ width: "18%", height: "60%", marginLeft: 5 }}>
                    <Image source={require('../assets/imgs/GoldenAntEgg2.png')} style={{ width: "100%", height: "100%" }} />
                </View>
            </View>
        </View>
    )
}

export default NavBarTopOther

const styles = StyleSheet.create({})