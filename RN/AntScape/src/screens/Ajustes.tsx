import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { CheckBox } from 'react-native-elements'
import SelectDropdown from 'react-native-select-dropdown'
import NavBarTop from '../components/NavBarTop'
import NavBarBotton from '../components/NavBarBotton'

type Props = {
    navigation: any
}

const Ajustes = ({navigation}: Props) => {
    
    return (
        <View style={styles.container}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                <View style={{ height: "93%", width: "100%" }}>

                </View>
                <NavBarBotton navigation={navigation} icon='settings' />
            </View>
        </View>
    );
};

export default Ajustes

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

});


/*
<CheckBox
                    title="Dark Mode"
                    checked={isOn}
                    onPress={() => setIsOn(!isOn)}
                />

                <SelectDropdown
                    data={opciones}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(listItem, index) => {
                        return listItem
                    }}
                    defaultButtonText='Select an Option'
                />
*/