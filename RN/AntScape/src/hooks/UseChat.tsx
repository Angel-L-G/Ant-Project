import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Props = {
    navigation: any
}

const UseChat = (props: Props) => {
    const ruta = "http://192.168.0.12:3000/chats"
    const [chats, setChats] = useState<Array<Chat>>([] as Array<Chat>);

    useEffect(() => {
        async function getAll(){
            await findAll();
        }
        
        getAll();
    }, [])
    
    async function findAll(){
        try{
            const response = await axios.get(ruta);
            setChats(response.data);
        } catch (error){
            console.log(error);
        }
    }

    async function findByid(id: number){
        chats.map((chat)=>{
            if(chat.id == id){
                return chat;
            }
        })
        return null;
    }

    async function save(newChat: Chat){
        const axiospost = async (ruta: string) => {
            try{
                const response = await axios.post(ruta, newChat);
            } catch (error){
                console.log(error);
            }
        }

        axiospost(ruta);
    }

    async function drop(){}

    async function update(){}

    return {
        findAll,
        findByid,
        save,
        drop,
        update
    }
}

export default UseChat