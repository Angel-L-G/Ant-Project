import React, { useContext, useEffect, useRef, useState } from 'react'
import UseChat from '../hooks/UseChat'
import chatStyles from '../themes/chatStyles';
import { View, Image, Text, FlatList, StyleSheet, TextInput, TouchableHighlight, KeyboardAvoidingView, Platform } from 'react-native';
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
import { Icon } from 'react-native-elements';

type Props = NativeStackScreenProps<RootStackParamList, "NuevoChat">;

const NuevoChat = ({ navigation, route }: Props) => {
    const idOtherUser = route.params.idOtherUser;
    const nameOtherUser = route.params.nameOtherUser;

    const { conectar, conectado, historico, enviarPrivado, setHistorico, chatActual } = UseChat();
    const { chats, save, saveMessages, findAllMessagesByChatId } = UseChatHistory();
    const { token, user } = useContext(AppContext);
    const { ruta } = Globals();
    const [img, setImg] = useState(ruta + "v1/files/" + user.img);
    const [loading, setLoading] = useState(true);

    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        conectar();
    }, []);

    useEffect(() => {
        if (conectado == true) {
            const chatEncontrado: Chat | undefined = chats.find(chat => chat.nameUser1 === nameOtherUser || chat.nameUser2 === nameOtherUser) as Chat | undefined;

            if (chatEncontrado) {
                chatActual.current = chatEncontrado;

                if (chatEncontrado.messages != null) {
                    const mensajesInvertidos = chatEncontrado.messages.slice().reverse();
                    setHistorico(mensajesInvertidos);
                } else {
                    setHistorico([]);
                }

                setLoading(false);

            } else {
                const chatInput: ChatInputSaveDTO = {
                    nameUser2: nameOtherUser
                }

                const fetchData = async () => {
                    try {
                        const chatData: Chat | undefined = await save(chatInput) as Chat | undefined;
                        chatActual.current = chatData;

                    } catch (error) {
                        console.error('Error al obtener el chat:', error);

                    } finally {
                        const mensajesInvertidos = chatActual.current?.messages.slice().reverse();
                        setHistorico(mensajesInvertidos ?? []);
                        setLoading(false);
                    }
                }

                fetchData();

            }
        } else {
            console.log("Fallo de conexion");
        }
    }, [conectado]);

    function sendMessage() {
        saveMessages(chatActual.current?.id as number, mensaje);
        enviarPrivado(user.name, nameOtherUser, mensaje, user.id);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={chatStyles.upperBar}>
                <View style={chatStyles.profilePicContainer}>
                    <Image
                        style={chatStyles.profilePic}
                        source={{ uri: img }}
                    />
                </View>

                <View style={chatStyles.usernameContainer}>
                    <Text style={chatStyles.usernameText}>
                        {nameOtherUser}
                    </Text>
                </View>
            </View>
            <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={chatStyles.messageContainer}>
                <View style={{ height: "92%" }}>
                    {(loading) ?
                        <View>
                            <Text>Loading...</Text>
                        </View>
                        :
                        <FlatList
                            data={historico}
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
                            inverted
                        />
                    }
                </View>
                <View style={{ height: "8%" }}>
                    <View style={{ height: "100%", flexDirection: "row", justifyContent: 'space-between' }}>
                        <TextInput multiline onChangeText={setMensaje} value={mensaje} style={{ borderWidth: 1, borderColor: 'black', borderRadius: 20, width: "78%", paddingHorizontal: 20, fontSize: 16, backgroundColor: "white", height: "80%", alignSelf: "center", marginLeft: "2%", paddingVertical: 0 }} />
                        <TouchableHighlight onPress={sendMessage} style={{ backgroundColor: "green", alignItems: 'center', justifyContent: 'center', width: "16%", height: "80%", borderRadius: 20, alignSelf: 'center', marginRight: "2%" }}>
                            <Icon name="send" size={30} color={"yellow"}></Icon>
                        </TouchableHighlight>
                    </View>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
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