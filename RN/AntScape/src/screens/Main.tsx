import { View, Text, Image, TouchableHighlight, Modal, StyleSheet, Alert, Pressable, RefreshControl, FlatList } from 'react-native'
import React, { useState } from 'react'
import styles from '../themes/styles'
import Icon from 'react-native-vector-icons/Ionicons';
import AntNest from '../components/AntNest';
import { Button } from 'react-native-elements';
import NestDetails from '../components/NestDetails';
import ActionButtonAux from '../navigations/ActionButtonAux';
import UseHormiguero from '../hooks/UseHormiguero';
import NestDetailsModal from '../components/NestDetails';

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
    const [refreshing, setRefreshing] = useState(false);

    function showModal(index: number) {
        setModalVisible(true);
        setActual(index);
    }

    function closeModal(){
        setModalVisible(false);
    }

    function handleRefresh(){
        findAll();
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
            
            <View style={styles.mainConatiner} >
                <Text style={styles.title}>Hormigueros</Text>

                <FlatList
                    style={{width:320}}
                    data={hormigueros}
                    renderItem={({item,index}) => {
                        return <AntNest key={index} navigation={navigation} nest={item} showModal={showModal} pos={index}/>
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing = {refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />

                <View style={{margin: 10}}>
                    <TouchableHighlight onPress={() => navigation.navigate("NewHormiguero")} style={styles.button}>
                        <Text style={styles.textBody}>Crear Hormiguero</Text>
                    </TouchableHighlight>
                </View>
            </View>            
                

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <NestDetailsModal closeModal={closeModal} hormiguero={hormigueros[actual]}/>
            </Modal>
        </View>
    )
}

export default Main