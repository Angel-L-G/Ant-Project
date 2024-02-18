import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UseUser = () => {
    const ruta = "http://localhost:8080/v1/"

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

    function findByName(name: string){
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

    async function drop(){}

    async function update(){}

    return {
        findAll,
        findByid,
        drop,
        update,
        findByName,
    }
}

export default UseUser