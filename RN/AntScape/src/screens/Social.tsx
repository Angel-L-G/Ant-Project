import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight, TextInput } from 'react-native'
import React from 'react'
import styles from '../themes/styles'
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    navigation: any
}

type Chat = {
    id: number,
    name: string,
    messages: Array<Message>
}

type Message = {
    idUser: number,
    message: string
}

const Social = ({navigation}: Props) => {
    const amigos: Array<Chat> = [
        {
            id: 1,
            name: 'Javier',
            messages: [
                {
                    idUser: 0,
                    message: 'Hola',
                },
                {
                    idUser: 1,
                    message: 'Hey!',
                },
                {
                    idUser: 0,
                    message: 'Has visto mi nuevo hormiguero?',
                },
                {
                    idUser: 1,
                    message: 'La verdad, No me he fijado',
                },
                {
                    idUser: 1,
                    message: 'Dejame Revisarlo ;)',
                },
            ]
        },
        {
            id: 2,
            name: 'ABC',
            messages: [
                {
                    idUser: 0,
                    message: 'Hola',
                },
                {
                    idUser: 1,
                    message: 'Hey!',
                },
                {
                    idUser: 0,
                    message: 'Has visto mi nuevo hormiguero?',
                },
                {
                    idUser: 1,
                    message: 'La verdad, No me he fijado',
                },
                {
                    idUser: 1,
                    message: 'Dejame Revisarlo ;)',
                },
            ]
        },
        {
            id: 0,
            name: 'Angel',
            messages: [
                {
                    idUser: 0,
                    message: 'Hola',
                },
                {
                    idUser: 1,
                    message: 'Hey!',
                },
                {
                    idUser: 0,
                    message: 'Has visto mi nuevo hormiguero?',
                },
                {
                    idUser: 1,
                    message: 'La verdad, No me he fijado',
                },
                {
                    idUser: 1,
                    message: 'Dejame Revisarlo ;)',
                },
            ]
        }
    ]

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
                    <Icon name="person-circle-outline" size={40}/>
                </TouchableHighlight>
            </View>

            <View style={styles.chatContainer}>
                <View style={styles.friendsScrollConatiner}>
                    <FlatList
                        data={amigos}
                        renderItem={(a) => {
                            return (
                                <View>
                                    <Text style={styles.friendsText}>
                                        {a.item.name} 
                                    </Text>
                                </View>    
                            )
                        }}
                    />
                </View>

                <View style={styles.messageContainer}>
                    {
                        amigos[1].messages.map((value, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.messageText}>
                                        {value.idUser}: {value.message}
                                    </Text>
                                </View>
                            )
                        })
                    }
                    <TextInput placeholder='Mensaje' style={styles.chatInput}/>
                </View>
            </View>
        </View>
    )
}

export default Social