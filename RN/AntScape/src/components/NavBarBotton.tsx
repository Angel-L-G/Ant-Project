import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {}

const NavBarBotton = (props: Props) => {
    return (
        <View style={{ height: "7%", width: "100%", backgroundColor: "rgba(28, 64, 169, 1)" }}>
            <Icon name="person-outline" size={50}></Icon>
        </View>
    )
}

export default NavBarBotton

const styles = StyleSheet.create({})