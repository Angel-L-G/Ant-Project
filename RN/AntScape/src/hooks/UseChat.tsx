import { View, Text } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Client } from '@stomp/stompjs'
import Globals from '../components/Globals'
import * as encoding from 'text-encoding';
import { AppContext } from '../context/AppContextProvider';
import { Chat, Message, websocketMessage } from '../types/chatTypes'
import UseChatHistory from './UseChatHistory'

const UseChat = () => {
    const stompRef = useRef({} as Client);
    const {token, user} = useContext(AppContext);
    const {findAllMessagesByChatId} = UseChatHistory();
    const [conectado, setConectado] = useState(false);
    const [historico, setHistorico] = useState<Message[]>(new Array<Message>());
    const chatActual = useRef<Chat>();
    const {ruta, ip} = Globals();

    Object.assign(global, {
        TextEncoder: encoding.TextEncoder,
        TextDecoder: encoding.TextDecoder,
    });

    function conectar() {
        stompRef.current = new Client({
            brokerURL: 'ws://' + ip + '/websocket',
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
            console.log("Error en el websocket");
        }

        stompRef.current.activate();
    }

    function onPublicMessageReceived(datos: any) {
        console.log("Publico");
        console.log("datos: " + datos.content);
        
        let nuevoMensaje = JSON.parse(datos.content);
        console.log("2222222222222222 " + nuevoMensaje);

        let messageRecieved: Message = {
            body: datos.content,
            sentAt: datos.sentAt,
            senderId: datos.senderId
        };

        setHistorico((arr) => {
            let array =  arr.filter(m => true);
            array.unshift(messageRecieved);
            console.log("Size2: " + arr.length);
            return array
        });
    }

    function onPrivateMessageReceived(datos: any) {
        console.log("Privado");
        console.log("Size: " + historico.length);
        console.log("Id chat: " + chatActual.current?.id);
        
        let nuevoMensaje = JSON.parse(datos.body);
        console.log("2222222222222222 " + JSON.stringify(nuevoMensaje));
        
        if(nuevoMensaje.receiver == user.name && (chatActual.current?.nameUser1 == nuevoMensaje.receiver || chatActual.current?.nameUser2 == nuevoMensaje.receiver)){
            let messageRecieved: Message = {
                body: nuevoMensaje.content,
                sentAt: nuevoMensaje.sentAt,
                senderId: nuevoMensaje.senderId
            };
   
            setHistorico((arr) => {
                let array =  arr.filter(m => true);
                array.unshift(messageRecieved);
                console.log("Size2: " + arr.length);
                return array
            });
        }else{
            console.log("No Pa Ti");
        }
    }

    /*
    async function onPrivateMessageReceived(datos: any) {
        const messagesAll = await findAllMessagesByChatId(chatActual.current?.id ?? null);
        const mensajesInvertidos = messagesAll.slice().reverse();
        console.log("Privado");
        console.log("Size: " + historico.length);
        console.log("Size2: " + messagesAll.length);
        console.log("Size ref: " + chatActual.current?.id);
        
        let nuevoMensaje = JSON.parse(datos.body);

        let messageRecieved: Message = {
            body: nuevoMensaje.content,
            sentAt: nuevoMensaje.sentAt,
            senderId: nuevoMensaje.senderId
        };
        
        console.log(JSON.stringify(messageRecieved));

        let arr = mensajesInvertidos;
        arr.unshift(messageRecieved);
        setHistorico([...arr]);
    }
    */

    function enviar(autor: string, mensaje: string, senderId: number) {
        let stompClient = stompRef.current;
        let messageTo: websocketMessage = {
            author: autor,
            receiver: "no hay receptor específico",
            content: mensaje,
            sentAt: new Date(),
            senderId: senderId
        };

        stompClient.publish({ destination: "/app/mensajegeneral", body: JSON.stringify(messageTo) });
        console.log("enviado público");

        let messageRecieved: Message = {
            body: messageTo.content,
            sentAt: messageTo.sentAt,
            senderId: messageTo.senderId
        };

        setHistorico((arr) => {
            let array =  arr.filter(m => true);
            array.unshift(messageRecieved);
            console.log("Size2: " + arr.length);
            return array
        });
    }

    function enviarPrivado(autor: string, receptor:string, mensaje: string, senderId: number) {
        let stompClient = stompRef.current;
        let messageTo: websocketMessage = {
            author: autor,
            receiver: receptor,
            content: mensaje,
            sentAt: new Date(),
            senderId: senderId
        };

        stompClient.publish({ destination: "/app/privado", body: JSON.stringify(messageTo) });
        console.log("enviado privado");

        let messageRecieved: Message = {
            body: messageTo.content,
            sentAt: messageTo.sentAt,
            senderId: messageTo.senderId
        };

        setHistorico((arr) => {
            let array =  arr.filter(m => true);
            array.unshift(messageRecieved);
            console.log("Size2: " + arr.length);
            return array
        });
    }

    return {
        conectar,
        enviar,
        enviarPrivado,
        conectado,
        historico,
        setHistorico,
        chatActual
    }
}

export default UseChat