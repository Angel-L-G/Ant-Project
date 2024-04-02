import { View, Text, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Friend } from '../components/types';
import { useAppContext } from '../context/AppContextProvider';
import Globals from '../components/Globals';

const UseUser = () => {
    const {user,token} = useAppContext();
    const [friends, setFriends] = useState<Array<Friend>>([] as Array<Friend>);
    const {ruta} = Globals();

    useEffect(() => {
        async function getAll(){
            await findAll();
        }
        
        getAll();
    }, [])
    
    async function findAll(){
        try{
            const response = await axios.get(ruta);
            //setUsers(response.data);
        } catch (error){
            console.log(error);
        }
    }

    async function findByid(id: number){
        /*users.map((user)=>{
            if(user.id == id){
                return user;
            }
        })*/
        return null;
    }

    async function findFriends(){
        try {
            const response = await axios.get(ruta+"v2/users/"+user.name+"/friends", {headers: { "Authorization": "Bearer " + token }});

            if(response.status>199 && response.status < 300){
                if(response.status == 204){
                    console.log("204 - No Content");
                }else {
                    setFriends(response.data);
                }
            } else {
                console.log(response.status);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function findByName(name: string){
        let userReturn = null;
        /*users.map((user)=>{
            console.log(user.name);
            if(user.name == name){
                console.log("Entra");
                //console.log(user.name);
                userReturn = user;
            }
        })*/
        return userReturn;
    }

    async function addFriend(nameFriend: string){
        try {
            console.log(ruta+"v2/users/"+user.name+"/friends"+nameFriend);
            const response = await axios.get(ruta+"v2/users/"+user.name+"/addFriends/"+nameFriend, {headers: { "Authorization": "Bearer " + token }});

            if(response.status>199 && response.status < 300){
                if(response.status == 204){
                    console.log("204 - No Content");
                }else {
                    ToastAndroid.show('Amigo Añadido Correctamente',ToastAndroid.SHORT);
                }
            } else {
                console.log(response.status);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function drop(){}

    async function update(){}

    return {
        findAll,
        findByid,
        drop,
        update,
        findByName,
        findFriends,
        addFriend,
        friends,
    }
}

export default UseUser