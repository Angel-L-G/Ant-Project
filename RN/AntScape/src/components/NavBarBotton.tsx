import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    navigation: any,
    icon: string,
}

const NavBarBotton = ({navigation, icon}: Props) => {
    return (
        <View style={{ height: "7%", width: "100%", backgroundColor: "rgba(28, 64, 169, 1)", flexDirection: 'row', alignItems: 'center', justifyContent: "space-around" }}>
            {(icon == "social") ? 
                <TouchableHighlight style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}} underlayColor={"transparent"} onPress={() => navigation.navigate("Social", {tab: 0})}>
                    <Icon name="person" size={40} color={"yellow"}></Icon>
                </TouchableHighlight>
            : 
                <TouchableHighlight style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}} underlayColor={"transparent"} onPress={() => navigation.navigate("Social", {tab: 0})}>
                    <Icon name="person-outline" size={40} color={"yellow"}></Icon>
                </TouchableHighlight>
            }

            {(icon == "personal") ? 
                <TouchableHighlight style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}} underlayColor={"transparent"} onPress={() => navigation.navigate("Personal", {tab: 0})}>
                    <Icon name="bulb" size={40} color={"yellow"}></Icon>
                </TouchableHighlight>
            :
                <TouchableHighlight style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}} underlayColor={"transparent"} onPress={() => navigation.navigate("Personal", {tab: 0})}>
                    <Icon name="bulb-outline" size={40} color={"yellow"}></Icon>
                </TouchableHighlight>
            }

            {(icon == "clan") ? 
                <TouchableHighlight style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}} underlayColor={"transparent"} onPress={() => navigation.navigate("Clan", {tab: 0})}>
                    <Icon name="shield" size={40} color={"yellow"}></Icon>
                </TouchableHighlight>
            : 
                <TouchableHighlight style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}} underlayColor={"transparent"} onPress={() => navigation.navigate("Clan", {tab: 0})}>
                    <Icon name="shield-outline" size={40} color={"yellow"}></Icon>
                </TouchableHighlight>
            }

            {(icon == "settings") ? 
                <TouchableHighlight style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}} underlayColor={"transparent"} onPress={() => navigation.navigate("Ajustes", {tab: 0})}>
                    <Icon name="settings" size={40} color={"yellow"}></Icon>
                </TouchableHighlight>
            : 
                <TouchableHighlight style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}} underlayColor={"transparent"} onPress={() => navigation.navigate("Ajustes", {tab: 0})}>
                    <Icon name="settings-outline" size={40} color={"yellow"}></Icon>
                </TouchableHighlight>
            }

        </View>
    )
}

export default NavBarBotton

const styles = StyleSheet.create({})