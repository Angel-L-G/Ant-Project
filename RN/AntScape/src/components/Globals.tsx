import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Globals = () => {
    const ruta = "http://192.168.1.6:8080/api/";
    const ip = "192.168.1.6:8080";

    return {
        ruta,
        ip
    }
}

export default Globals

const styles = StyleSheet.create({})