import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBarTop from '../components/NavBarTop';
import NavBarBotton from '../components/NavBarBotton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, "ClanProfile">;

const ClanProfile = ({navigation, route}: Props) => {
    const clan = route.params.clan;

    return (
        <View style={styles.container}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                <View style={{ height: "93%", width: "100%" }}>

                </View>
                <NavBarBotton navigation={navigation} icon='' />
            </View>
        </View>
    );
};

export default ClanProfile

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

});
