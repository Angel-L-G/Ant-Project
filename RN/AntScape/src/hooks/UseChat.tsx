import { useContext, useRef, useState } from 'react'
import { Client } from '@stomp/stompjs'
import Globals from '../components/Globals'
import * as encoding from 'text-encoding';
import { AppContext } from '../context/AppContextProvider';
import { Chat, Message, websocketMessage } from '../types/chatTypes'

const UseChat = () => {
    const stompRef = useRef({} as Client);
    const {token, user} = useContext(AppContext);
    const [conectado, setConectado] = useState(false);
    const [historico, setHistorico] = useState<Message[]>(new Array<Message>());
    const chatActual = useRef<Chat>();
    const {ip} = Globals();

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

            },
            onConnect: conectarOK,
            onStompError: (frame) => {

            },
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
        });

        function conectarOK() {
            setConectado(true);
            let stompClient = stompRef.current;
            stompClient.subscribe('/salas/general', onPublicMessageReceived);
            stompClient.subscribe('/usuarios/cola/mensajes', onPrivateMessageReceived);
            stompClient.subscribe('/topic/chatroom/' + user.id_guild, onGroupMessageReceived);
        }

        stompRef.current.activate();
    }

    ////////////////////////////////////////////////////////
    function onGroupMessageReceived(datos: any) {
        let nuevoMensaje = JSON.parse(datos.body);

        if(nuevoMensaje.receiver != undefined && nuevoMensaje.receiver == user.id_guild){
            let messageRecieved: Message = {
                body: nuevoMensaje.content,
                sentAt: nuevoMensaje.sentAt,
                senderId: nuevoMensaje.senderId
            };
   
            setHistorico((arr) => {
                let array =  arr.filter(m => true);
                array.unshift(messageRecieved);
                return array
            });
        }else{

        }
    }
    //////////////////////////////////////////////////////////////

    function onPublicMessageReceived(datos: any) {
        let messageRecieved: Message = {
            body: datos.content,
            sentAt: datos.sentAt,
            senderId: datos.senderId
        };

        setHistorico((arr) => {
            let array =  arr.filter(m => true);
            array.unshift(messageRecieved);
            return array
        });
    }

    function onPrivateMessageReceived(datos: any) {
        
        let nuevoMensaje = JSON.parse(datos.body);
        
        if(nuevoMensaje.receiver == user.name && (chatActual.current?.nameUser1 == nuevoMensaje.receiver || chatActual.current?.nameUser2 == nuevoMensaje.receiver)){
            let messageRecieved: Message = {
                body: nuevoMensaje.content,
                sentAt: nuevoMensaje.sentAt,
                senderId: nuevoMensaje.senderId
            };
   
            setHistorico((arr) => {
                let array =  arr.filter(m => true);
                array.unshift(messageRecieved);
                return array
            });
        }else{

        }
    }

    //////////////////////////////////////////////////////////
    function sendGroupMessage(mensaje: string) {
        let stompClient = stompRef.current;
        let messageTo: websocketMessage = {
            author: user.name,
            receiver: user.id_guild+"",
            content: mensaje,
            sentAt: new Date(),
            senderId: user.id
        };

        stompClient.publish({ destination: '/app/groups/' + user.id_guild, body: JSON.stringify(messageTo) });
    }
    //////////////////////////////////////////////////////

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

        let messageRecieved: Message = {
            body: messageTo.content,
            sentAt: messageTo.sentAt,
            senderId: messageTo.senderId
        };

        setHistorico((arr) => {
            let array =  arr.filter(m => true);
            array.unshift(messageRecieved);
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

        let messageRecieved: Message = {
            body: messageTo.content,
            sentAt: messageTo.sentAt,
            senderId: messageTo.senderId
        };

        setHistorico((arr) => {
            let array =  arr.filter(m => true);
            array.unshift(messageRecieved);
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
        chatActual,
        sendGroupMessage
    }
}

export default UseChat