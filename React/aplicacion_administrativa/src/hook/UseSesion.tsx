import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'
import { UserLogin } from '../type/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'
import Globals from '../assets/Globals'

type Props = {
    navigation: any
}

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

        const axiospost = async (ruta: string) => {

            try {
                const response = await axios.post(ruta + "v1/login", user);

                if (response.status > 199 && response.status < 300) {

                    const responseGet = await axios.get(ruta + "v2/users/me", { headers: { "Authorization": "Bearer " + response.data } });
                    setLoading(false);
                    console.log(responseGet.data);

                    setUser(responseGet.data);

                    setToken(response.data);
                    await AsyncStorage.setItem("token", response.data);

                    ////////////////////////////////////////////////////////////////
                    //navigation.navigate("Personal");
                } else {
                    if (response.status == 428) {
                        console.log("Falta Validar");
                        setLoading(false);
                    }
                }
            } catch (error: any) {
                console.log(error);

                if (error.response.status == 428) {
                    ToastAndroid.show('Verifique su usuario primero', ToastAndroid.SHORT);
                    setLoading(false);
                } else {
                    ToastAndroid.show('Usuario o contraseña erroneo', ToastAndroid.LONG);
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