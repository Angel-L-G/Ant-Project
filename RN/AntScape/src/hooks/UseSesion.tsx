import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage'
import { ContextUser, UserLogin, UserRegister } from '../components/types'
import AppContextProvider, { AppContext } from '../components/AppContextProvider';

type Props = {
    navigation:any
  }
  
const UseSesion = () => {
    const {setUser,setToken,setRol,token} = useContext(AppContext);
    //const ruta = "http://172.26.16.0:8080/api/v1";
    const ruta = "http://192.168.56.1:8080/api/";

    async function register(nick: string, password: string, email: string){
        console.log("register");
        let user: UserRegister = {
            email: email,
            nombre: nick,
            password: password
        }

        const axiospost = async (ruta: string) => {
            try{
                const response = await axios.post(ruta+"v1/register", user);
                if(response.status>199 && response.status < 300){
                }
            } catch (error){
                console.log(error);
            }
        }

        axiospost(ruta);  
    }

    async function login(nick: string, password: string, navigation: any){
        let user: UserLogin = {
            nombre: nick,
            password: password
        }

        const axiospost = async (ruta: string) => {
            try{
                const response = await axios.post(ruta+"v1/login", user);
                if(response.status>199 && response.status < 300){
                    setUser(user);
                    setToken(response.data);
                    await EncryptedStorage.setItem("token", response.data);

                    const tk = response.data;

                    //const rolFromBack = await axios.get(ruta+"/"+tk);
                    //setRol(rolFromBack.data);
                    //await AsyncStorage.setItem('rol', rolFromBack.data);

                    getContextUser(nick, tk);

                    navigation.navigate("Main");
                }else {
                    if(response.status == 428){
                        console.log("Falta Validar");
                    }
                }
            } catch (error){
                console.log(error);
            }
        }

        axiospost(ruta);
    }

    async function getContextUser(nick: string, tk: string) {
        const axiosget = async (ruta: string) => {
           
            try{
                const response = await axios.get(ruta+"v2/users" ,{ 
                    params: { nick },
                    headers: { "Authorization": "Bearer " + token }
                });

                if(response.status>199 && response.status < 300){
                    if(response.status == 204){
                        console.log("204 - No Content");
                    }else {
                        const user: ContextUser = response.data;
                        setUser(user);
                    }
                } else {
                    console.log(response.status);
                }
            } catch (error){
                console.log(error);
            }
        }

        await axiosget(ruta);
    }

  return {
    login,
    register,
  }
}

export default UseSesion