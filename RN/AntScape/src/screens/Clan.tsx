import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBotton from '../components/NavBarBotton'

type Props = {
    navigation: any,
}

const Clan = ({navigation}: Props) => {
    return (
        <View style={styles.container}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                <View style={{ height: "93%", width: "100%" }}>

                </View>
                <NavBarBotton navigation={navigation} icon='clan' />
            </View>
        </View>
    );
};

export default Clan

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

});

