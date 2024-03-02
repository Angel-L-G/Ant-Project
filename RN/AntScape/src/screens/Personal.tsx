import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar';
import { Image } from 'react-native';

type Props = {}

const Personal = (props: Props) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>
            <View style={{flex: 1, width: "100%", height: "5%", justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', backgroundColor: "#1c40a9"}}>
                <Image source={require('../img/profile.png')} style={{ width: "10%", height: "70%", borderRadius: 100 }} />
                <Image source={require('../img/tablon.png')} style={{ width: "16%", height: "60%", borderRadius: 100 }} />
                <View style={{position: 'absolute', marginLeft: 101, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "16%", height: "60%", borderRadius: 100, flexDirection: 'row'}}>
                    <Text style={{color: "black", fontWeight: "bold"}}>100ab</Text>
                    <Image source={require('../img/FireAntEgg.webp')} style={{ width: "18%", height: "60%", borderRadius: 100, marginLeft: 5 }} />
                </View>
                <Image source={require('../img/tablon.png')} style={{ width: "16%", height: "60%", borderRadius: 100 }} />
                <View style={{position: 'absolute', marginLeft: 226, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.4)", width: "16%", height: "60%", borderRadius: 100, flexDirection: 'row'}}>
                    <Text style={{color: "black", fontWeight: "bold"}}>100ab</Text>
                    <Image source={require('../img/GoldenAntEgg2.png')} style={{ width: "18%", height: "60%", borderRadius: 100, marginLeft: 5 }} />
                </View>
            </View>
            <View style={{width: "100%", height: "93%"}}>
                <View style={{width: "100%", height: "100%"}}>
                    <Image source={require('../img/Background.png')} style={{ width: "100%", height: "30%"}} />
                </View>
            </View>
        </View>
    );
}

export default Personal

const styles = StyleSheet.create({})