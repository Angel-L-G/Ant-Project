import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import styles from '../themes/styles'
import SelectDropdown from 'react-native-select-dropdown'
import UseHormiguero from '../hooks/UseHormiguero'
import { NestSaveDTO } from '../types/types'

type Props = {
    navigation: any
}

const NewHormiguero = ({navigation}: Props) => {
    const {save} = UseHormiguero(navigation);
    const biomas = ["Humedal", "Planicie", "Montaña", "Bosque"];
    const hormigas = ["Roja", "Negra", "Cortadora de Hojas"];
    let biome = "Biome";
    let ant = "Ant";

    const [antType, setAntType] = useState("");

    async function createAntNest(){
        let imgActual = "";
        switch(ant){
            case "Roja":
                imgActual = "../assets/imgs/hormiga-roja.jpeg";
            case "Negra":
                imgActual = "../assets/imgs/Hormiga-negra.jpg";
            case "Cortadora de Hojas":
                imgActual = "../assets/imgs/Cotadora-de-hojas.jpg";
        }
        
        /*const hormiguero: NestSaveDTO = {

        }*/

        save(antType);

        navigation.navigate("Main")
    }

    return (
        <View style={styles.container}>
            <View style={styles.crearBody}>
                <Text style={styles.title}>Crear Hormiguero</Text>
                <Text></Text>

                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Nombre: </Text>
                    {/*<TextInput placeholder='nombre' onChangeText={setName}></TextInput>*/}

                    <View style={styles.innerFormContainer}>
                        <Text style={styles.subTitle}>Bioma: </Text>
                        <SelectDropdown
                            data={biomas}
                            onSelect={(selectedItem, index) => {
                                biome = selectedItem
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            defaultButtonText={biome}
                        />
                    </View>

                    <Text></Text>

                    <View style={styles.innerFormContainer}>
                        <Text style={styles.subTitle}>Tipo de Hormiga: </Text>
                        <SelectDropdown
                            data={hormigas}
                            onSelect={(selectedItem, index) => {
                                setAntType(selectedItem);
                                ant = selectedItem
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            defaultButtonText={ant}
                        />
                    </View>

                    <Text></Text>

                    <TouchableHighlight onPress={createAntNest} style={styles.button}>
                        <Text style={styles.textBody}>Crear</Text>
                    </TouchableHighlight>
                </View> 
            </View>
        </View>
    )
}

export default NewHormiguero



/*
    {"id": 0, "img": "../assets/imgs/Hormiga-negra.jpg", "antname": "Hormiga Negra", "biome": "Planicie"}, 
    {"id": 1, "img": "../assets/imgs/Cotadora-de-hojas.jpg", "antname": "Hormina Cortadora De Hojas", "biome": "Pantano"}, 
    {"id": 2, "img": "../assets/imgs/hormiga-roja.jpeg", "antname": "Hormiga Roja", "biome": "Humedales"},
    {"id": 3, "img": "../assets/imgs/hormiga-roja.jpeg", "antname": "Hormiga Roja", "biome": "Humedales"} 
*/