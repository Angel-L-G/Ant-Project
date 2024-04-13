import React, { useEffect } from 'react'
import UseChat from '../hooks/UseChat'
import chatStyles from '../themes/chatStyles';

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
        <div style={chatStyles.container}>
            <div style={chatStyles.upperBar}>
                
            </div>

            <div style={chatStyles.messageContainer}>

            </div>
        </div>
    )
}

export default NuevoChat