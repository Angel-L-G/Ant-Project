import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from '../themes/styles'

type Props = {}

const Outside = (props: Props) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.BackgorundImage}
                source={require('../assets/imgs/mapa_outside.jpg')}
            />
        </View>
    )
}

export default Outside