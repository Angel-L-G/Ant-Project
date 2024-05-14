import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'
import { UserLogin } from '../type/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Globals from '../assets/Globals'

type Props = {}

const UseSesion = () => {
    const { setUser, setToken, token } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const {ruta} = Globals();

    async function login(nick: string, password: string) {
        setLoading(true);

        let user: UserLogin = {
            nombre: nick,
            password: password
        }

        console.log("111 " + user.nombre + " 222 " + user.password);
        

        const axiospost = async (ruta: string) => {
            console.log(ruta+"v1/login");
            
            try {
                console.log("nick: " + nick);
                console.log("password: " + password);
                const aux = ruta + "v1/login";
                
                const response = await axios.post(aux, user);

                if (response.status > 199 && response.status < 300) {
                    console.log(response.data);

                    const responseGet = await axios.get(ruta + "v2/users/me", { headers: { "Authorization": "Bearer " + response.data } });
                    setLoading(false);
                    console.log(responseGet.data);

                    setUser(responseGet.data);

                    setToken(response.data);
                    await AsyncStorage.setItem("token", response.data);
                } else {
                    if (response.status == 428) {
                        console.log("Falta Validar");
                        setLoading(false);
                    }
                }
            } catch (error: any) {
                console.log("Status: " + error.status);
                console.log(error);
                

                if (error.response.status == 428) {
                    alert('Verifique su usuario primero')
                    setLoading(false);
                } else {
                    alert('Usuario o contraseña erroneo')
                    setLoading(false);
                }
            }
        }

        axiospost(ruta);
    }

    return {
        login,
        loading
    }
}

export default UseSesion