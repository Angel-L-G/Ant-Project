import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useContext } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage'
import { ContextUser, User, UserLogin, UserRegister } from '../types/types'
import AppContextProvider, { AppContext } from '../context/AppContextProvider';
import Globals from '../components/Globals'

type Props = {
    navigation:any
}
  
const UseSesion = () => {
    const {setUser,setToken,setRol,token} = useContext(AppContext);
    const {ruta} = Globals();

    async function register(nick: string, password: string, email: string, navigation: any){
        console.log("register");
        let user: UserRegister = {
            email: email,
            nombre: nick,
            password: password
        }

        console.log("hola");

        const axiospost = async (ruta: string) => {
            console.log("hola");
            
            let response;
            try{
                response = await axios.post(ruta+"v1/register", user);
                
                if(response.status>199 && response.status < 300){
                    ToastAndroid.show('Registrado! Ahora verifique su usuario', ToastAndroid.LONG);
                    navigation.navigate("Login");
                }

            } catch (error){
                console.log(error);
            }
        }

        axiospost(ruta);
    }

    async function login(nick: string, password: string, navigation: any){
        console.log("h");
        
        let user: UserLogin = {
            nombre: nick,
            password: password
        }

        const axiospost = async (ruta: string) => {
            console.log("a");
            
            try{
                const response = await axios.post(ruta+"v1/login", user);
                console.log("q");
                
                if(response.status>199 && response.status < 300){
                    
                    const responseGet = await axios.get(ruta + "v2/users/me", {headers: { "Authorization": "Bearer " + response.data }});
                    console.log(responseGet.data);
                        
                    setUser(responseGet.data);

                    setToken(response.data);
                    await EncryptedStorage.setItem("token", response.data);

                    //const rolFromBack = await axios.get(ruta+"/"+tk);
                    //setRol(rolFromBack.data);
                    //await AsyncStorage.setItem('rol', rolFromBack.data);

                    navigation.navigate("Personal");
                }else {
                    if(response.status == 428){
                        console.log("Falta Validar");
                    }
                }
            } catch (error: any){   
                console.log("ho");   
                console.log(error);

                if(error.response.status == 428){
                    ToastAndroid.show('Verifique su usuario primero',ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Usuario o contraseña erroneo', ToastAndroid.LONG);
                }
            }
        }

        axiospost(ruta);
    }

  return {
    login,
    register,
  }
}

export default UseSesion