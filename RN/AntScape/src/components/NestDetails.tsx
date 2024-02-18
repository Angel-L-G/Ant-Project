import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from '../themes/styles'
import { Button } from 'react-native-elements'

type Props = {
    hormiguero: Hormiguero,
    closeModal: Function,
}

type Hormiguero = {
    id: number,
    img: string,
    antname: string,
    biome: string,
}

const NestDetails = ({closeModal,hormiguero}: Props) => {
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
                source={getRequire(hormiguero.antname)}
            />

            <Text style={styles.subTitle}>Informacion:</Text>
            <Text></Text>

            <View>
                <Text></Text>
                <Text style={styles.header3}>Biome: </Text>
                <Text style={styles.textBody}>{hormiguero.biome}</Text>
                <Text></Text>
                <Text style={styles.header3}>Tipo De Hormiga: </Text>
                <Text style={styles.textBody}>{hormiguero.antname}</Text>
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

export default NestDetails