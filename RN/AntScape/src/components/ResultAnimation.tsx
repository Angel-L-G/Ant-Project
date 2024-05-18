import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
    option: number
}

const ResultAnimation = ({option}: Props) => {
    const [animation, setAnimation] = useState();
    const routes = [
        require("../assets/animations/defeatAnimation.json"),
        require("../assets/animations/VictoryConfety.json")
    ];
    
    return (
        <View style={styles.container}>
            {(option == 0) 
                ? <LottieView
                    source={require("../assets/animations/defeatAnimation.json")} // Carga el archivo JSON de la animación
                    autoPlay
                    loop
                    style={styles.animation} // Aplica el estilo al componente LottieView
                />
                : <LottieView
                    source={require("../assets/animations/VictoryConfety.json")} // Carga el archivo JSON de la animación
                    autoPlay
                    loop
                    style={styles.animation} // Aplica el estilo al componente LottieView
                />
            }  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject, // Ocupa todo el espacio disponible en la pantalla
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Hace que la vista sea transparente para que la animación se superponga a otros elementos
    },
    animation: {
        width: 200,
        height: 200,
    },
});

export default ResultAnimation;