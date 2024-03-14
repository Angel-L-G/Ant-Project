import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import styles from '../themes/styles'
import { Button } from 'react-native-elements'
import { AlmacenImg, NestDetails } from './types'

type Props = {
    hormiguero: NestDetails,
    closeModal: Function,
}

const NestDetailsModal = ({closeModal,hormiguero}: Props) => {
    const almacenImagenes: AlmacenImg[] = [
        {
        "nombre": "Negra",
        "ubicacion": require('../img/Hormiga-negra.jpg')
        },
        {
        "nombre": "Cortadora de Hojas",
        "ubicacion": require('../img/Cotadora-de-hojas.jpg')
        },
        {
        "nombre": "Roja",
        "ubicacion": require('../img/hormiga-roja.jpeg')
        }
    ];

    useEffect(() => {
        console.log(hormiguero);
    }, [])
    

    function getRequire(nombre: string){
        const obtenido = almacenImagenes.find( imagen => imagen.nombre == nombre);
        if( obtenido){
            console.log(obtenido.ubicacion);
            return obtenido.ubicacion;
        }else{
            return "";
        }
    }

    return (
        <View style={styles.modalContainer}>
            <Text style={styles.title}>Nombre Hormiguero</Text>

            <Image
                style={styles.nestImage}
                source={getRequire(hormiguero.antType)}
            />

            <Text style={styles.subTitle}>Informacion:</Text>
            <Text></Text>

            <View>
                <Text></Text>
             {/*<Text style={styles.header3}>Biome: </Text>
                <Text style={styles.textBody}>{hormiguero.}</Text>*/}
                <Text></Text>
                <Text style={styles.header3}>Tipo De Hormiga: </Text>
                <Text style={styles.textBody}>{hormiguero.antType}</Text>
            </View>

            <Text></Text>
            <Text style={styles.header3}>Grafico 1:</Text>
            <Text></Text>
            <Text style={styles.header3}>Grafico 2:</Text>
            <Text></Text>

            <Button title="Cerrar" onPress={() => closeModal(false)} />
        </View>
    )
}

export default NestDetailsModal