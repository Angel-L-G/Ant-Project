import { View, Text } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Client } from '@stomp/stompjs'
import Globals from '../components/Globals'
import * as encoding from 'text-encoding';
import { AppContext } from '../context/AppContextProvider';
import { Message, websocketMessage } from '../types/chatTypes'

const UseChat = () => {
    const stompRef = useRef({} as Client);
    const {token, user} = useContext(AppContext);
    const [conectado, setConectado] = useState(false);
    const [historico, setHistorico] = useState<Message[]>(new Array<Message>());
    //const [historico, setHistorico] = useState<string[]>(new Array<string>());
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
        console.log("datos: " + datos);
        
        let nuevoMensaje = JSON.parse(datos.content);
        console.log(nuevoMensaje);

        let messageRecieved: Message = {
            body: datos.content,
            sentAt: datos.sentAt,
            senderId: datos.senderId
        };

        let arr = historico;
        arr.push(messageRecieved);
        setHistorico([...arr]);
    }

    function onPrivateMessageReceived(datos: any) {
        console.log("Privado");
        console.log("datos: " + datos);
        
        let nuevoMensaje = JSON.parse(datos.content);
        console.log(nuevoMensaje);

        let messageRecieved: Message = {
            body: datos.content,
            sentAt: datos.sentAt,
            senderId: datos.senderId
        };

        let arr = historico;
        arr.push(messageRecieved);
        setHistorico([...arr]);
    }

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

        let arr = historico;
        arr.push(messageRecieved);
        setHistorico([...arr]);
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

        let arr = historico;
        arr.push(messageRecieved);
        setHistorico([...arr]);
    }

    return {
        conectar,
        enviar,
        enviarPrivado,
        conectado,
        historico,
        setHistorico
    }
}

export default UseChat