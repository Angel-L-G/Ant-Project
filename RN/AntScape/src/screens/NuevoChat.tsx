import React, { useContext, useEffect, useRef, useState } from 'react'
import UseChat from '../hooks/UseChat'
import chatStyles from '../themes/chatStyles';
import { View, Image, Text } from 'react-native';
import { AppContext } from '../context/AppContextProvider';
import UseChatHistory from '../hooks/UseChatHistory';
import { ChatInputSaveDTO } from '../types/chatTypes';
import { Chat } from '../types/types';

type Props = {
    navigation: any,
    nameOtherUser: string,
}

const NuevoChat = ({navigation,nameOtherUser}: Props) => {
    const {conectar, conectado, historico, enviarPrivado} = UseChat();
    const {chats, save, saveMessages, findAllMessagesByChatId} = UseChatHistory();
    const {token, user} = useContext(AppContext);
    const ruta = "http://192.168.1.15:8080/api/";
    const [img, setImg] = useState(ruta + "v1/files/" + user.img);
    const chatActual = useRef({});

    useEffect(() => {
        conectar();

        if(conectado == true){
            const chatEncontrado = chats.find(chat => chat.nameUser1 === nameOtherUser || chat.nameUser2 === nameOtherUser);

            if (chatEncontrado) {
                console.log("Chat encontrado:", chatEncontrado);

                chatActual.current = chatEncontrado;
            } else {
                const chatInput: ChatInputSaveDTO = {
                    nameUser2: nameOtherUser
                }

                const chat: Chat = save(chatInput);
            }
        }else {
            console.log("Fallo de conexion");
        }
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

            <View style={chatStyles.messageContainer}>
                {chatActual.messages.map((mensaje, index) => (
                    <li key={index}>{mensaje.text}</li>
                ))}
            </View>
        </View>
    )
}

export default NuevoChat