import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UseUser = () => {
    const ruta = "http://192.168.0.12:3000/users"
    const [users, setUsers] = useState<Array<User>>([] as Array<User>);

    useEffect(() => {
        async function getAll(){
            await findAll();
        }
        
        getAll();
    }, [])
    
    async function findAll(){
        try{
            const response = await axios.get(ruta);
            setUsers(response.data);
        } catch (error){
            console.log(error);
        }
    }

    async function findByid(id: number){
        users.map((user)=>{
            if(user.id == id){
                return user;
            }
        })
        return null;
    }

    function findByName(name: string){
        let userReturn = null;
        users.map((user)=>{
            console.log(user.name);
            if(user.name == name){
                console.log("Entra");
                //console.log(user.name);
                userReturn = user;
            }
        })
        return userReturn;
    }

    async function save(newUser: User){
        const axiospost = async (ruta: string) => {
            try{
                const response = await axios.post(ruta, newUser);
            } catch (error){
                console.log(error);
            }
        }

        axiospost(ruta);
    }

    async function drop(){}

    async function update(){}

    return {
        findAll,
        findByid,
        save,
        drop,
        update,
        findByName,
        users
    }
}

export default UseUser