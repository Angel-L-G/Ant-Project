import React, { useContext, useEffect, useRef, useState } from 'react'
import UseChat from '../hooks/UseChat'
import chatStyles from '../themes/chatStyles';
import { View, Image, Text, FlatList } from 'react-native';
import { AppContext } from '../context/AppContextProvider';
import UseChatHistory from '../hooks/UseChatHistory';
import { Chat, ChatInputSaveDTO, Message } from '../types/chatTypes';
import Globals from '../components/Globals';

type Props = {
    navigation: any,
    nameOtherUser: string,
}

const NuevoChat = ({navigation,nameOtherUser}: Props) => {
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

            <View style={chatStyles.messageContainer}>

                {(loading) 
                    ? <View>
                            <Text>Cargando...</Text>
                        </View>
                    :   <FlatList
                            data={chatActual.current?.messages}
                            renderItem={({item}) =>
                                <View>
                                    <Text>{item.body}</Text>
                                </View>
                            }
                        />
                }


                
            </View>
        </View>
    )
}

export default NuevoChat