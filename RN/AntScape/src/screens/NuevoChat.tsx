import React, { useContext, useEffect, useRef, useState } from 'react'
import UseChat from '../hooks/UseChat'
import chatStyles from '../themes/chatStyles';
import { View, Image, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { AppContext } from '../context/AppContextProvider';
import UseChatHistory from '../hooks/UseChatHistory';
import { Chat, ChatInputSaveDTO, Message } from '../types/chatTypes';
import Globals from '../components/Globals';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, "NuevoChat">;

const NuevoChat = ({navigation,nameOtherUser, route}: Props) => {
    const {conectar, conectado, historico, enviarPrivado} = UseChat();
    const {chats, save, saveMessages, findAllMessagesByChatId} = UseChatHistory();
    const {token, user} = useContext(AppContext);
    const {ruta} = Globals();
    const [img, setImg] = useState(ruta + "v1/files/" + user.img);
    const chatActual = useRef<Chat>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        conectar();
    }, []);

    useEffect(() => {
        if(conectado == true){
            const chatEncontrado: Chat | undefined = chats.find(chat => chat.nameUser1 === nameOtherUser || chat.nameUser2 === nameOtherUser) as Chat | undefined;

            if (chatEncontrado) {
                console.log("Chat encontrado:", chatEncontrado);

                chatActual.current = chatEncontrado;
            } else {
                const chatInput: ChatInputSaveDTO = {
                    nameUser2: nameOtherUser
                }

                const fetchData = async() => {
                    try {
                        const chatData: Chat | undefined = await save(chatInput) as Chat | undefined;

                        chatActual.current = chatData;
                    } catch (error) {
                        console.error('Error al obtener el chat:', error);
                    } finally {
                        setLoading(false);
                    }
                }

                fetchData();
            }
        }else {
            console.log("Fallo de conexion");
        }
    }, [conectado]);

    return (
        <View style={chatStyles.container}>
            <View style={chatStyles.upperBar}>
                <View style={chatStyles.profilePicContainer}>
                    <Image
                        style={chatStyles.profilePic}
                        source={require('../assets/imgs/profile.png')}
                    //source={{ uri: img}}
                    />
                </View>

                <View style={chatStyles.usernameContainer}>
                    <Text style={chatStyles.usernameText}>
                        nameOtherUser
                    </Text>
                </View>
            </View>

            <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={chatStyles.messageContainer}>
                <View style={{height: "92%", backgroundColor: "red"}}>
                    <FlatList
                        data={mensajes}
                        renderItem={({ item }) =>
                            (item.senderId === user.id) ?
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", marginTop: 10, marginRight: 16, fontFamily: "MadimiOneRegular", fontSize: 16 }}>{item.sentAt && formatDistanceToNow(new Date(item.sentAt), { addSuffix: true, locale: es })}</Text>
                                    <View style={styles.myMessage}>
                                        <Text style={{ ...styles.messageText, color: "black" }}>{item.body}</Text>
                                    </View>
                                </View>
                                :
                                <View style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: "black", marginTop: 10, marginLeft: 16, fontFamily: "MadimiOneRegular", fontSize: 16 }}>{item.sentAt && formatDistanceToNow(new Date(item.sentAt), { addSuffix: true, locale: es })}</Text>
                                    <View style={styles.otherMessage}>
                                        <Text style={{ ...styles.messageText, color: "black" }}>{item.body}</Text>
                                    </View>
                                </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={{height: "8%"}}>
                    <View style={{flexDirection: "row"}}>
                        <TextInput
                            multiline
                            onChangeText={setMensaje}
                            value={mensaje}
                            style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, fontSize: 16, textAlignVertical: 'top',}}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default NuevoChat

const styles = StyleSheet.create({
    myMessage: {
        borderBottomEndRadius: 0,
        alignSelf: 'flex-end',
        backgroundColor: '#D68200',
        borderRadius: 18,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 12,
        elevation: 5,
        maxWidth: '60%',
    },
    otherMessage: {
        borderBottomStartRadius: 0,
        alignSelf: 'flex-start',
        backgroundColor: '#00a8d6',
        borderRadius: 18,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 12,
        elevation: 5,
        maxWidth: '60%',
    },
    messageText: {
        fontSize: 16,
        fontFamily: "MadimiOneRegular",
    },
});

/*
conectar();

        findAllMessagesByChatId(idOtherUser);

        if (conectado == true) {
            const chatEncontrado: Chat | undefined = chats.find(chat => chat.nameUser1 === nameOtherUser || chat.nameUser2 === nameOtherUser) as Chat | undefined;

            if (chatEncontrado) {
                console.log("Chat encontrado:", chatEncontrado);

                chatActual.current = chatEncontrado;
            } else {
                const chatInput: ChatInputSaveDTO = {
                    nameUser2: nameOtherUser
                }

                const fetchData = async () => {
                    try {
                        const chatData: Chat | undefined = await save(chatInput) as Chat | undefined;
                        console.log(chatData);
                        chatActual.current = chatData;
                    } catch (error) {
                        console.error('Error al obtener el chat:', error);
                    } finally {
                        setLoading(false);
                    }
                }

                fetchData();
            }
        } else {
            console.log("Fallo de conexion");
        }
*/
