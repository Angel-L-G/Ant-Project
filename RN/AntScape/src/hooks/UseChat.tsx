import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Client } from '@stomp/stompjs'
import Globals from '../components/Globals'

const UseChat = () => {
    const stompRef = useRef({} as Client);
    const [token, setToken] = useState("");
    const [conectado, setConectado] = useState(false);
    const [historico, setHistorico] = useState<string[]>(new Array<string>());
    const {ruta} = Globals();

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