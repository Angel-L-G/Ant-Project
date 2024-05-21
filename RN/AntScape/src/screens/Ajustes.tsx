import { View, Text, StyleSheet, TouchableHighlight, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBotton from '../components/NavBarBotton'
import { AppContext } from '../context/AppContextProvider'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import { User } from '../types/types'

type Props = {
    navigation: any
}

const Ajustes = ({ navigation }: Props) => {
    const { setToken, setUser } = useContext(AppContext);

    function logOut() {
        setToken("");
        setUser({} as User);

        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                <View style={{ height: "93%", width: "100%" }}>
                    <View style={{ height: "50%", justifyContent: "center", alignItems: "center" }}>
                        <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ width: "65%", height: "65%", backgroundColor: "blue", borderRadius: 50, borderColor: "yellow", borderWidth: 3 }}>
                            <TouchableHighlight underlayColor={"rgba(20, 40, 140, 1)"} onPress={() => (ToastAndroid.show("No implementado", ToastAndroid.LONG))} style={{ width: "100%", height: "100%", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                                <Icon name="people-circle-outline" size={140} color={"yellow"}></Icon>
                            </TouchableHighlight>
                        </LinearGradient>

                    </View>
                    <View style={{ height: "50%", justifyContent: "center", alignItems: "center" }}>
                        <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ width: "65%", height: "65%", backgroundColor: "blue", borderRadius: 50, borderColor: "yellow", borderWidth: 3 }}>
                            <TouchableHighlight underlayColor={"rgba(20, 40, 140, 1)"} onPress={() => logOut()} style={{ width: "100%", height: "100%", borderRadius: 50, justifyContent: "center" }}>
                                <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 50 }}>Cerrar sesión</Text>
                            </TouchableHighlight>
                        </LinearGradient>
                    </View>
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