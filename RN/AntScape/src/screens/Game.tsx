import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import styles from '../themes/styles'
import BoxActions from '../components/BoxActions'

type Props = {
    navigation: any
}

const Game = ({navigation}: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.mainConatiner}>
                <View style={styles.gameTop}>
                    <TouchableHighlight onPress={() => navigation.navigate("Outside")}>
                        <Text style={{color: "white"}}>Outside</Text>
                    </TouchableHighlight>
                    <Text style={{color: "white"}}>Casillas</Text>
                </View>
    
                <View style={styles.gameBotom}>
                    <BoxActions />
                </View>
            </View>
        </View>
    )
}

export default Game