import React, { useEffect, useRef, useState } from 'react'
import * as encoding from 'text-encoding';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { TextInput, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-elements';

type Props = {}

type Usuario = {
    nick: string,
    password: string
}

const ChatScreen = (props: Props) => {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [historico, setHistorico] = useState<string[]>(new Array<string>());
    const stompRef = useRef({} as Client);
    const [mensaje, setMensaje] = useState("");
    const [receptor, setReceptor] = useState("");
    const [autor, setAutor] = useState("");
    const [token, setToken] = useState("");
    const [conectado, setConectado] = useState("desconectado");

    let ip = "192.168.1.15:8080";
    //let ip = "192.168.1.229:8080";

    //npm install @stomp/stompjs
    //hay problema con encoding de react-native:
    //npm install text-encoding
    //npm install @types/text-encoding
    Object.assign(global, {
        TextEncoder: encoding.TextEncoder,
        TextDecoder: encoding.TextDecoder,
    });

    function login() {
        console.log("http://" + ip + "/api/v1/login");
        async function getToken(nombre: string, password: string) {
            console.log("AAAA");

            let user = {
                nombre,
                password
            };

            console.log(user);

            try {
                let response = await axios.post("http://" + ip + "/api/v1/login", user);
                console.log(response.data);
                let token = response.data;
                setToken(token);
                setAutor(nombre);
            } catch (error) {
                console.log(error);

            }
        }

        getToken(usuario, clave);
    }

    function enviar() {
        let stompClient = stompRef.current;
        let messageTo = {
            author: autor,
            receiver: "no hay receptor específico",
            content: mensaje
        };

        stompClient.publish({ destination: "/app/mensajegeneral", body: JSON.stringify(messageTo) });
        console.log("enviado público");
        /*
            let arr = historico;
            arr.push("le dices a  todos: "  + messageTo.content);
            setHistorico([...arr]); 
        */
    }

    function enviarPrivado() {
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


    function onPublicMessageReceived(datos: any) {
        console.log("datos: " + datos);
        //setRecibido(datos.body);
        let nuevoMensaje = JSON.parse(datos.body);
        console.log(nuevoMensaje);
        let arr = historico;
        arr.push(nuevoMensaje.author + " dice a todos: " + nuevoMensaje.content);
        setHistorico([...arr]);
    }

    function onPrivateMessageReceived(datos: any) {
        console.log("datos: " + datos);
        //setRecibido(datos.body);
        let nuevoMensaje = JSON.parse(datos.body);
        console.log(nuevoMensaje);
        let arr = historico;
        arr.push(nuevoMensaje.author + " te dice en privado: " + nuevoMensaje.content);
        setHistorico([...arr]);
    }

    function conectar() {
        async function getMensajesPrivados() {
            let response = await axios.get("http://" + ip + "/api/mensajes", {

                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + token
                }

            });
            let nuevoHistorico = response.data.map((mensaje: any) => JSON.stringify(mensaje));
            setHistorico(nuevoHistorico);
        }

        getMensajesPrivados();

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
            setConectado("conectado");
            console.log("entra en conectarOK");
            let stompClient = stompRef.current;
            stompClient.subscribe('/salas/general', onPublicMessageReceived);
            stompClient.subscribe('/usuarios/cola/mensajes', onPrivateMessageReceived);
        }

        function conectarError() {

        }

        stompRef.current.activate();
    }

    const [formData, setFormData] = useState<Usuario>({} as Usuario);
    function fillFormLogin(value: string, field: keyof Usuario) {
        setFormData({
            ...formData,
            [field]: value,
        });
        console.log(formData);
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>{usuario}</Text>
            <Text>{clave}</Text>
            <TextInput
                placeholder="Introduce tu nick"
                placeholderTextColor="#d1d6db"

                //onChangeText={(texto) => fillFormLogin(texto, 'nick')}
                onChangeText={(t) => setUsuario(t)}

                allowFontScaling={false}
            />

            <TextInput
                placeholder="Introduce tu contraseña"
                placeholderTextColor="#d1d6db"

                //onChangeText={(texto) => fillFormLogin(texto, 'password')}
                onChangeText={(t) => setClave(t)}

                allowFontScaling={false}
            />
            <TouchableHighlight onPress={() => login()}>
                <View>
                    <Text>
                        Presiona para login
                    </Text>
                </View>
            </TouchableHighlight>
            <Text>{conectado}</Text>
            <Text>{token}</Text>
            <TouchableHighlight onPress={() => conectar()}>
                <View>
                    <Text>
                        Presiona para conectar
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

export default ChatScreen

