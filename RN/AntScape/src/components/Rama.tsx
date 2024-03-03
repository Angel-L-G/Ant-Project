import { Alert, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'

type Props = {}

const Rama = (props: Props) => {
    const [modalVisible, setModalVisible] = useState(false);

    function mejorar() {
        
    }

    return (
        <View style={{ backgroundColor: "brown", margin: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            
            <View>
                <TouchableHighlight style={{ justifyContent: 'center', alignItems: 'center', width: 60, height: 60, backgroundColor: "rgb(28, 64, 169)", margin: 10, borderRadius: 20, borderWidth: 2, borderColor: "yellow" }} onPress={() => setModalVisible(true)}>
                    <Text style={{ color: "yellow", fontWeight: "bold" }}>Mejorar</Text>
                </TouchableHighlight>
            </View>
            <ImageBackground source={require('../img/Rama.jpg')} style={{ margin: 10, height: 80, width: 270 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
                    <ProgressBar duration={1000} />
                </View>
            </ImageBackground>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>

                        <TouchableHighlight style={{ justifyContent: 'center', alignItems: 'center', width: 60, height: 60, backgroundColor: "rgb(28, 64, 169)", margin: 10, borderRadius: 20, borderWidth: 2, borderColor: "yellow" }} onPress={() => mejorar()}>
                            <Text style={{ color: "yellow", fontWeight: "bold" }}>Mejorar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Rama

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: '#00a8d6',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: 600,
      width: 350
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });