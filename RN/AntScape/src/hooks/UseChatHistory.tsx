import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Chat } from '../types/chatTypes';
import { AppContext } from '../context/AppContextProvider';

const UseChatHistory = () => {
    const ruta = "http://192.168.1.15:8080/api/";
    const { token, user } = useContext(AppContext);
    const [historico, setHistorico] = useState<Chat[]>(new Array<Chat>());

    useEffect(() => {
        findUserChats();
    }, [])

    async function findUserChats() {
        try {
            const response = await axios.get(ruta + "/v2/chat/me", { headers: { "Authorization": "Bearer " + token } });

            setHistorico(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function findById(id: number) {
        try {
            const response = await axios.get(ruta + "/v2/chat/" + id, { headers: { "Authorization": "Bearer " + token } });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    return {

    }
}

export default UseChatHistory