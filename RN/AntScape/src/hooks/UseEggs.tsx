import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Globals from '../components/Globals';
import { NestLevel } from '../types/types';
import { AppContext } from '../context/AppContextProvider';

type Props = {
    lastLevel?: NestLevel
}

const UseEggs = ({lastLevel}: Props = {}) => {
    const [eggs, setEggs] = useState(0);
    const {ruta} = Globals();
    const {token, user} = useContext(AppContext);

    async function ganarDinero() {
        const responseGet = await axios.get(ruta + "v2/users/me", {headers: { "Authorization": "Bearer " +  token}});
        console.log("Progress bar" + responseGet.data.eggs);

        let eggs1 = responseGet.data.eggs;

        if (lastLevel) {

            console.log("Ganar dinero");

            console.log(eggs1);

            const dineroNuevo = (Number)(eggs1) + (Number)(lastLevel.production);

            console.log("Dinero suma: " + dineroNuevo);

            setEggs(dineroNuevo);
                console.log("Eggs: " + eggs);

            const body = {
                eggs: dineroNuevo,
                goldenEggs: user.goldenEggs
            }

            try {
                const response = await axios.put(ruta + "v2/users/updatemoney", body, {headers: { "Authorization": "Bearer " + token }});
                console.log("Eggs after update: " + response.data.eggs);
                
                
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return {
        eggs,
        setEggs
    }
}

export default UseEggs

const styles = StyleSheet.create({})