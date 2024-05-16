import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

const VictoryAnimation = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require("../assets/animations/VictoryConfety.json")} // Carga el archivo JSON de la animación
                autoPlay
                loop
                style={styles.animation} // Aplica el estilo al componente LottieView
            />
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

export default VictoryAnimation;