import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
    option: number
}

const ResultAnimation = ({option}: Props) => {
    
    return (
        <View style={styles.container}>
            {(option == 0) 
                ? <LottieView
                    source={require("../assets/animations/defeatAnimation.json")} 
                    autoPlay
                    loop
                    style={styles.animation} 
                />
                : <LottieView
                    source={require("../assets/animations/VictoryConfety.json")} 
                    autoPlay
                    loop
                    style={styles.animation} 
                />
            }  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', 
    },
    animation: {
        width: 200,
        height: 200,
    },
});

export default ResultAnimation;