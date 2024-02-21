import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Hormiguero, NestDetails, NestSaveDTO } from '../components/types';
import { useAppContext } from '../components/AppContextProvider';

type Props = {
    navigation: any
}

const UseHormiguero = ({navigation}: Props) => {
    const ruta = "http://172.26.16.0:8080/api/v2/nests";
    //const ruta = "http://192.168.56.1:8080/api/v2/nests"
    const {user,token} = useAppContext();
    const [hormigueros, setHormigueros] = useState<Array<NestDetails>>([] as Array<NestDetails>);

    useEffect(() => {
        async function getAll(){
            await findAll();
        }
        
        getAll();
    }, [])
    
    async function findAll(){
        try{
            
            const response = await axios.get(ruta+"/own/"+user.nombre, {headers: { "Authorization": "Bearer " + token }});

            setHormigueros(response.data);
        } catch (error){
            console.log(error);
        }
    }

    async function findFriends(){}

    async function findByid(id: number){
        hormigueros.map((hormiguero)=>{
            /*if(hormiguero.id == id){
                return hormiguero;
            }*/
        })
        return null;
    }

    async function save(antType: string){
        const axiospost = async (ruta: string) => {
            let newHormiguero: NestSaveDTO = {
                antType: antType,
                deleted: false,
                map: "---",
                nameUser: user.nombre
            }

            try{
                const response = await axios.post(ruta, newHormiguero, { headers: { "Authorization": "Bearer " + token }});
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
        hormigueros
    }

    {/*  const almacenImagenes: AlmacenImg[] = 
  
  function getRequire(nombre: string){
  const obtenido = almacenImagenes.find( imagen => imagen.nombre == nombre);
  if( obtenido){
  return obtenido.ubicacion;
  }else{
  return "";
  }
  
  }
  
  
  
  Luego llamas a la función en el objeto TSX:
  
  source={
  getRequire("estrella")
  
  }
  style={{ minWidth: 50, height: 50, width: 'auto'}}
  />
  Saludos */}
}

export default UseHormiguero