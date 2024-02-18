import { View, Text, Image, TouchableHighlight, Modal, StyleSheet, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import styles from '../themes/styles'
import Icon from 'react-native-vector-icons/Ionicons';
import AntNest from '../components/AntNest';
import { Button } from 'react-native-elements';
import NestDetails from '../components/NestDetails';
import ActionButtonAux from '../navigations/ActionButtonAux';
import UseHormiguero from '../hooks/UseHormiguero';

type Props = {
    navigation: any,
}

type Hormiguero = {
    id: number,
    img: string,
    antname: string,
    biome: string,
}

const Main = ({navigation}: Props) => {
    const {save,drop,findAll,findByid,update,hormigueros} = UseHormiguero(navigation);
    const [modalVisible, setModalVisible] = useState(false);
    const [actual, setActual] = useState(0);

    function showModal(index: number) {
        setModalVisible(true);
        setActual(index);
    }

    function closeModal(){
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileBar}>
                <TouchableHighlight onPress={() => navigation.navigate("Profile")}>
                    <Image
                        style={styles.profilePicture}
                        source={require('../img/profile.png')}
                    />
                </TouchableHighlight>
                
                <Text style={styles.title}>Nombre Perfil</Text>

                <TouchableHighlight style={styles.icono}>
                    <Icon name="menu-outline" size={40}></Icon>
                </TouchableHighlight>

                <Text style={styles.icono}></Text>
                
            </View>

            {/*<ActionButtonAux/>*/}
            
            <View style={styles.mainConatiner}>
                <Text style={styles.title}>Hormigueros</Text>
                    {
                        (hormigueros.length != 0)
                        ?
                            hormigueros.map((value, index) => {
                                return <AntNest key={index} navigation={navigation} nest={value} showModal={showModal}/>
                            })
                        :
                            <TouchableHighlight onPress={() => navigation.navigate("NewHormiguero")} style={styles.button}>
                                <Text style={styles.textBody}>Crear Hormiguero</Text>
                            </TouchableHighlight>
                    }
            </View>            
            
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <NestDetails closeModal={closeModal} hormiguero={hormigueros[actual]}/>
            </Modal>
        </View>
    )
}

export default Main