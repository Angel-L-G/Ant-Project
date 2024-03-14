import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import styles from '../themes/styles'

type Props = {}

const BoxActions = (props: Props) => {
    return (
        <View style={styles.modalContainer}>
            <Text style={styles.subTitle}>Informacion Casilla</Text>

            <TouchableHighlight style={styles.button}>
                <Text style={styles.header3}>Excavar</Text>
            </TouchableHighlight>
        </View>
    )
}

export default BoxActions