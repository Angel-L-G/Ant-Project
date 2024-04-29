import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Globals = () => {
    //const ruta = "http://192.168.0.20:8080/api/";
    //const ruta = "http://172.16.141.33:8080/api/";
    const ruta = "http://192.168.1.13:8080/api/";
    //const ruta = "http://192.168.1.63:8080/api/";

    return {
        ruta
    }
}

export default Globals

const styles = StyleSheet.create({})