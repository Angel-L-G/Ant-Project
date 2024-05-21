import { ToastAndroid } from 'react-native'
import { useContext, useState } from 'react'
import axios from 'axios'
import EncryptedStorage from 'react-native-encrypted-storage'
import { UserLogin, UserRegister } from '../types/types'
import { AppContext } from '../context/AppContextProvider';
import Globals from '../components/Globals'

const UseSesion = () => {
    const { setUser, setToken, setImgContext } = useContext(AppContext);
    const { ruta } = Globals();
    const [loading, setLoading] = useState(false);

    async function register(nick: string, password: string, email: string, navigation: any) {
        let user: UserRegister = {
            email: email,
            nombre: nick,
            password: password
        }

        const axiospost = async (ruta: string) => {

            let response;
            try {
                response = await axios.post(ruta + "v1/register", user);

                if (response.status > 199 && response.status < 300) {
                    ToastAndroid.show('Registrado! Ahora verifique su usuario', ToastAndroid.LONG);
                    navigation.navigate("Login");
                }

            } catch (error) {
                console.log(error);
            }
        }

        axiospost(ruta);
    }

    async function login(nick: string, password: string, navigation: any) {
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

                    setImgContext(ruta + "v1/files/" + responseGet.data.img)
                    await EncryptedStorage.setItem("token", response.data);

                    navigation.navigate("Personal", {numero: 5});
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
        register,
        loading
    }
}

export default UseSesion