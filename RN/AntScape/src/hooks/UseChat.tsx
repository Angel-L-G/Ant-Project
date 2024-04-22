import { View, Text } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Client } from '@stomp/stompjs'
import * as encoding from 'text-encoding';
import { AppContext } from '../context/AppContextProvider';

const UseChat = () => {
    const stompRef = useRef({} as Client);
    const {token, user} = useContext(AppContext);
    const [conectado, setConectado] = useState(false);
    const [historico, setHistorico] = useState<string[]>(new Array<string>());
    const ip = "192.168.1.229:8080";

    Object.assign(global, {
        TextEncoder: encoding.TextEncoder,
        TextDecoder: encoding.TextDecoder,
    });

    function conectar() {
        console.log("entra en conectar");

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

    function enviarPrivado(autor: string, receptor:string, mensaje: string) {
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

    return {
        conectar,
        enviar,
        enviarPrivado,
        conectado,
        historico
    }
}

export default UseChat