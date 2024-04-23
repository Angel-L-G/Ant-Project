import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Chat, ChatInputSaveDTO } from '../types/chatTypes';
import { AppContext } from '../context/AppContextProvider';
import Globals from '../components/Globals';

const UseChatHistory = () => {
    const {ruta} = Globals();
    const { token, user } = useContext(AppContext);
    const [chats, setChats] = useState<Chat[]>(new Array<Chat>());

    useEffect(() => {
        findUserChats();
    }, [])

    async function findUserChats() {
        try {
            const response = await axios.get(ruta + "v2/chats/me", { headers: { "Authorization": "Bearer " + token } });
            console.log("Holaaaaaaaaaaaaaaaaaa" + response.data);
            
            setChats(response.data);
        } catch (error) {
            console.log(error + "putaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        }
    }

    async function findById(id: number) {
        try {
            const response = await axios.get(ruta + "v2/chats/" + id, { headers: { "Authorization": "Bearer " + token } });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function save(chat: ChatInputSaveDTO): Promise<Chat | undefined> {
        try {
            // Realiza la solicitud POST y espera la respuesta
            const response = await axios.post(ruta + "v2/chats", chat, {
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
            const response = await axios.get(ruta + "v2/chats/" + id + "/messages", { headers: { "Authorization": "Bearer " + token } });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function saveMessages(id: number, message: string) {
        try {
            const response = await axios.post(ruta + "v2/chats/" + id + "/messages", {}, { params: {message: message}, headers: { "Authorization": "Bearer " + token } } );

            console.log(response.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    return {
        chats,
        findAllMessagesByChatId,
        findById,
        findUserChats,
        save,
        saveMessages
    }
}

export default UseChatHistory