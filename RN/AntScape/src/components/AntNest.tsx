import { View, Text, Image, TouchableHighlight } from 'react-native'
import React, { useEffect } from 'react'
import styles from '../themes/styles'
import { AlmacenImg, NestDetails } from './types'

type Props = {
    showModal: Function,
    navigation: any,
    nest: NestDetails,
    pos: number
}

const AntNest = ({navigation, nest, showModal, pos}: Props) => {

    const almacenImagenes: AlmacenImg[] = [
        {
        "nombre": "Negra",
        "ubicacion": require('../assets/imgs/Hormiga-negra.jpg')
        },
        {
        "nombre": "Cortadora de Hojas",
        "ubicacion": require('../assets/imgs/Cotadora-de-hojas.jpg')
        },
        {
        "nombre": "Roja",
        "ubicacion": require('../assets/imgs/hormiga-roja.jpeg')
        }
    ];

    function getRequire(nombre: string){
        const obtenido = almacenImagenes.find( imagen => imagen.nombre == nombre);
        if( obtenido){
            return obtenido.ubicacion;
        }else{
            return "";
        }
    }

    return (
        <View style={styles.nestViewContainer}>
                
                <Image
                    style={styles.nestImage}
                    source={getRequire(nest.antType)}
                />
            

            <View style={styles.netsButtons}>
                <TouchableHighlight style={styles.button} onPress={() => showModal(pos)}>
                    <Text>Detalles</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button} onPress={() => navigation.navigate("Game")}>
                    <Text>Entrar</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default AntNest