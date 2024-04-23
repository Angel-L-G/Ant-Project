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

const NuevoChat = ({ navigation, route }: Props) => {
    const { idOtherUser, nameOtherUser } = route.params;
    const { token, user } = useContext(AppContext);
    const { ruta } = Globals();
    const [img, setImg] = useState(ruta + "v1/files/" + user.img);
    const chatActual = useRef<Chat>();
    const [loading, setLoading] = useState(true);
    const [chat, setChat] = useState<Chat>({} as Chat);
    const [mensajes, setMensajes] = useState<Array<Message>>([]);
    const [mensaje, setMensaje] = useState("");

    const stompRef = useRef({} as Client);
    const [conectado, setConectado] = useState(false);
    const [historico, setHistorico] = useState<string[]>(new Array<string>());

    function conectar() {
        stompRef.current = new Client({
            brokerURL: 'ws://' + ruta + '/websocket',
            connectHeaders: {
                Authorization: 'Bearer ' + token,
            },
            debug: function (str) {
                console.log(str);
            },
            onConnect: conectarOK,
            onWebSocketError: (error) => console.log(error),
            onStompError: (frame) => {
                console.log('Additional details: ' + frame.body);
            },
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
        });

        function conectarOK() {
            setConectado(true);
            console.log("entra en conectarOK");
            let stompClient = stompRef.current;
            stompClient.subscribe('/salas/general', onPublicMessageReceived);
            stompClient.subscribe('/usuarios/cola/mensajes', onPrivateMessageReceived);
        }

        function conectarError() {

        }

        stompRef.current.activate();
    }

    function onPublicMessageReceived(datos: any) {
        console.log("Publico");
        console.log("datos: " + datos);
        //setRecibido(datos.body);
        let nuevoMensaje = JSON.parse(datos.body);
        console.log(nuevoMensaje);
        let arr = historico;
        arr.push(nuevoMensaje.author + " dice a todos: " + nuevoMensaje.content);
        setHistorico([...arr]);
    }

    function onPrivateMessageReceived(datos: any) {
        console.log("Privado");
        console.log("datos: " + datos);
        //setRecibido(datos.body);
        let nuevoMensaje = JSON.parse(datos.body);
        console.log(nuevoMensaje);
        let arr = historico;
        arr.push(nuevoMensaje.author + " te dice en privado: " + nuevoMensaje.content);
        setHistorico([...arr]);
    }

    function enviar(autor: string, mensaje: string) {
        let stompClient = stompRef.current;
        let messageTo = {
            author: autor,
            receiver: "no hay receptor específico",
            content: mensaje
        };

        stompClient.publish({ destination: "/app/mensajegeneral", body: JSON.stringify(messageTo) });
        console.log("enviado público");
    }

    function enviarPrivado(autor: string, receptor: string, mensaje: string) {
        let stompClient = stompRef.current;
        let messageTo = {
            author: autor,
            receiver: receptor,
            content: mensaje

        };
        stompClient.publish({ destination: "/app/privado", body: JSON.stringify(messageTo) });
        console.log("enviado privado");

        let arr = historico;
        arr.push("le dices a  " + messageTo.receiver + ": " + messageTo.content);
        setHistorico([...arr]);
    }

    async function findById(id: number) {
        try {
            const response = await axios.get(ruta + "/v2/chats/" + id, { headers: { "Authorization": "Bearer " + token } });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function save(chat: ChatInputSaveDTO): Promise<Chat | undefined> {
        try {
            // Realiza la solicitud POST y espera la respuesta
            const response = await axios.post(ruta + "/v2/chats", chat, {
                headers: { "Authorization": "Bearer " + token }
            });

            return response.data;
        } catch (error) {
            // Maneja los errores si la solicitud falla
            console.log(error);
            return undefined; // Devuelve undefined en caso de error
        }
    }

    async function findAllMessagesByChatId(id: number) {
        try {
            const response = await axios.get(ruta + "/v2/chats/" + id + "/messages", { headers: { "Authorization": "Bearer " + token } });
            setMensajes(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function saveMessages(id: number, message: string) {
        try {
            const response = await axios.post(ruta + "/v2/chats" + id + "messages", { params: { message: message }, headers: { "Authorization": "Bearer " + token } },);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(idOtherUser);

        async function findUserChats() {
            try {
                const response = await axios.get(ruta + "v2/chats/me", { headers: { "Authorization": "Bearer " + token } });

                const chatFiltrado: Array<Chat> = response.data.filter((chat: Chat) =>
                    chat.nameUser1 === user.name && chat.nameUser2 === nameOtherUser || chat.nameUser1 === nameOtherUser && chat.nameUser2 === user.name
                );

                setChat(chatFiltrado[0]);
                setMensajes(chatFiltrado[0].messages);
                console.log(chatFiltrado[0].messages);

            } catch (error) {
                console.log(error);
            }
        }

        findUserChats();

        console.log(mensajes);

    }, [])

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