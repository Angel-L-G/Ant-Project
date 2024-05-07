import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, ImageBackground } from 'react-native';
import WebView from 'react-native-webview';
import { NestLevel } from '../types/types';

type Props = {
    duration: number,
    lastLevel: NestLevel,
    updateEggs: Function,
    ganarDinero: Function
}

const AnimatedGif = () => {
    const [key, setKey] = useState(0);
    const [rnd, setRnd] = useState(0);
    const [gifPath, setGifPath] = useState(require('../assets/gifs/Cortadoras_Dia_1.gif'));
    const [loading, setLoading] = useState(true);
    //let gifPath = require('../assets/gifs/Cortadoras_Dia_1.gif');
    const aux = [
        require('../assets/gifs/Cortadoras_Dia_1.gif'), 
        require('../assets/gifs/Cortadoras_Dia_2.gif'), 
        require('../assets/gifs/Cortadoras_Noche_1.gif'), 
        require('../assets/gifs/Cortadoras_Noche_2.gif'),
        require('../assets/gifs/Negras_Dia_1.gif'), 
        require('../assets/gifs/Negras_Dia_2.gif'), 
        require('../assets/gifs/Negras_Dia_3.gif'), 
        require('../assets/gifs/Negras_Dia_4.gif'), 
    ];

    useEffect(() => {
        async function generateGifNumber() {
            setRnd(Math.floor(Math.random() * 8));
            setGifPath(aux[rnd]);
            setLoading(false);
        }

        const interval = setInterval(() => {
            setKey(prevKey => prevKey + 1);
        }, 10000);

        generateGifNumber();
        return () => clearInterval(interval);
        
    }, []);

    return (
        <View style={{ margin: 10, height: 80, width: 270 }}>
            {(loading) 
            ?<Text>Loading...</Text>
            :<ImageBackground
                source={gifPath}
                style={{ flex: 1, width: "100%", height: "100%", alignItems: "center" }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
                    <Text>
                    //////////////////////////////////////
                    </Text>
                </View>
            </ImageBackground>
            }
        </View>
    );
};

export default AnimatedGif;
