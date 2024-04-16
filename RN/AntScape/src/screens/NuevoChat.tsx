import React, { useEffect } from 'react'
import UseChat from '../hooks/UseChat'
import chatStyles from '../themes/chatStyles';
import { View, Image, Text } from 'react-native';

const NuevoChat = () => {
    const {conectar, conectado, historico, enviarPrivado} = UseChat();

    useEffect(() => {
        conectar();

        if(conectado == true){

        }else {
            console.log("Fallo de conexion");
        }
    }, [])
    

    return (
        <View style={chatStyles.container}>
            <View style={chatStyles.upperBar}>
                <View style={chatStyles.profilePicContainer}>
                    <Image
                        style={chatStyles.profilePic}
                        source={require('../img/profile.png')}
                    />
                </View>

                <View style={chatStyles.usernameContainer}>
                    <Text style={chatStyles.usernameText}>
                        UserName
                    </Text>
                </View>
            </View>

            <View style={chatStyles.messageContainer}>
                
            </View>
        </View>
    )
}

export default NuevoChat