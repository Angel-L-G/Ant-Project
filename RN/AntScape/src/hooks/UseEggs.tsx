import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import Globals from '../components/Globals';
import { NestLevel } from '../components/types';
import { AppContext } from '../components/AppContextProvider';

type Props = {
    lastLevel?: NestLevel
}

const UseEggs = ({lastLevel}: Props) => {
    const [eggs, setEggs] = useState(0);
    const {ruta} = Globals();
    const {token, user} = useContext(AppContext);

    async function ganarDinero() {
        if (lastLevel) {
            console.log("a");

            const responseGet = await axios.get(ruta + "v2/users/me", {headers: { "Authorization": "Bearer " +  token}});
            console.log(responseGet.data.eggs);

            const eggs = responseGet.data.eggs;

            const dineroNuevo = (Number)(eggs) + (Number)(lastLevel.production);

            console.log(dineroNuevo);

            const body = {
                eggs: dineroNuevo,
                goldenEggs: user.goldenEggs
            }

            try {
                const response = await axios.put(ruta + "v2/users/updatemoney", body, {headers: { "Authorization": "Bearer " + token }});
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return {
        eggs,
        ganarDinero
    }
}

export default UseEggs

const styles = StyleSheet.create({})