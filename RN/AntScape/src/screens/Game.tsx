import { View, Text, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import styles from '../themes/styles'
import BoxActions from '../components/BoxActions'
import WebView from 'react-native-webview'

type Props = {
    navigation: any
}

const Game = ({navigation}: Props) => {
    const [prueba, setPrueba] = useState<any>();
    const runFirst = `
      document.body.style.backgroundColor = 'red';
      window.alert('hi');
      true; // note: this is required, or you'll sometimes get silent failures
    `;

    const src = `
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Grid de Casillas</title>
                <style>
                    .grid-container {display: grid; grid-template-columns: repeat(3, 100px); gap: 10px;}
                    .grid-item { background-color: lightblue; border: 1px solid #333; text-align: center; padding: 20px;}
                </style>
            </head>
            <body>
                <div class="grid-container">
                    <div class="grid-item" onclick="enviarNumero(1)">Casilla 1</div>
                    <div class="grid-item" onclick="enviarNumero(2)">Casilla 2</div>
                    <div class="grid-item" onclick="enviarNumero(3)">Casilla 3</div>
                    <div class="grid-item" onclick="enviarNumero(4)">Casilla 4</div>
                    <div class="grid-item" onclick="enviarNumero(5)">Casilla 5</div>
                    <div class="grid-item" onclick="enviarNumero(6)">Casilla 6</div>
                    <div class="grid-item" onclick="enviarNumero(7)">Casilla 7</div>
                    <div class="grid-item" onclick="enviarNumero(8)">Casilla 8</div>
                    <div class="grid-item" onclick="enviarNumero(9)">Casilla 9</div>
                </div>

                <script>
                    function enviarNumero(numero) {
                        window.ReactNativeWebView.postMessage(numero);
                    }
                </script>
            </body>
        `

    return (
        <View style={styles.container}>
            <View style={styles.mainConatiner}>
                
                <View style={styles.gameTop}>
                    
                    <WebView
                        source = {{html: src}}
                        onMessage={(event) => {
                            console.log(event.nativeEvent.data);
                            setPrueba(event.nativeEvent.data);
                        }}
                        //injectedJavaScript={runFirst}
                    />

                    

                    {/*<TouchableHighlight onPress={() => navigation.navigate("Outside")}>
                        <Text style={{color: "white"}}>Outside</Text>
                    </TouchableHighlight>
                    <Text style={{color: "white"}}>Casillas</Text>*/}
                </View>
                <TouchableOpacity onPress={() => {Alert.alert(prueba)}}>
                        <Text>DATOS</Text> 
                    </TouchableOpacity>
                <View style={styles.gameBotom}>
                    <BoxActions />
                </View>
            </View>
        </View>
    )
}

export default Game