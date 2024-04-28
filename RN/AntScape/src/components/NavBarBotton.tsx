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
                <View style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Social", {tab: 0})}>
                        <Icon name="person" size={40} color={"yellow"}></Icon>
                    </TouchableHighlight>
                </View>
            : 
                <View style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Social", {tab: 0})}>
                        <Icon name="person-outline" size={40} color={"yellow"}></Icon>
                    </TouchableHighlight>
                </View>
            }

            {(icon == "personal") ? 
                <View style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Personal", {tab: 0})}>
                        <Icon name="bulb" size={40} color={"yellow"}></Icon>
                    </TouchableHighlight>
                </View>
            :
                <View style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Personal", {tab: 0})}>
                        <Icon name="bulb-outline" size={40} color={"yellow"}></Icon>
                    </TouchableHighlight>
                </View>
            }

            {(icon == "clan") ? 
                <View style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Clan", {tab: 0})}>
                        <Icon name="shield-half" size={40} color={"yellow"}></Icon>
                    </TouchableHighlight>
                </View>
            : 
                <View style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Clan", {tab: 0})}>
                        <Icon name="shield-outline" size={40} color={"yellow"}></Icon>
                    </TouchableHighlight>
                </View>
            }

            {(icon == "settings") ? 
                <View style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Ajustes", {tab: 0})}>
                        <Icon name="settings" size={40} color={"yellow"}></Icon>
                    </TouchableHighlight>
                </View>
            : 
                <View style={{borderWidth: 2, width: "25%", height: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Ajustes", {tab: 0})}>
                        <Icon name="settings-outline" size={40} color={"yellow"}></Icon>
                    </TouchableHighlight>
                </View>
            }

        </View>
    )
}

export default NavBarBotton

const styles = StyleSheet.create({})