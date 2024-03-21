import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { NestLevel } from './types';
import { AppContext } from './AppContextProvider';
import axios from 'axios';
import Globals from './Globals';

type Props = {
    duration: number,
    lastLevel: NestLevel,
    updateEggs: Function
}

const ProgressBar = ({duration, lastLevel, updateEggs}: Props) => {
    const {ruta} = Globals();
    const {user, token} = useContext(AppContext);
    const [progress, setProgress] = useState(0);

    async function ganarDinero() {
        console.log(lastLevel);
        
        console.log(lastLevel.production);

        const responseGet = await axios.get(ruta + "v2/users/me", {headers: { "Authorization": "Bearer " +  token}});
        console.log("Progress bar" + responseGet.data.eggs);

        let eggs1 = responseGet.data.eggs;

        if (lastLevel) {

            console.log("Ganar dinero");

            console.log(eggs1);

            const dineroNuevo = Math.round((Number)(eggs1) + (Number)(lastLevel.production));

            console.log("Dinero suma: " + dineroNuevo);

            updateEggs(dineroNuevo);

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

    useEffect(() => {
        let startTime = Date.now();
        let progressInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = elapsedTime / duration;
            if (newProgress >= 1) {
                setProgress(1);
                clearInterval(progressInterval);
                setTimeout(() => {
                    setProgress(0);
                    startTime = Date.now();
                    progressInterval = setInterval(updateProgress, 100);
                    console.log("progressInterval");

                    ganarDinero();
                }, 1);
            } else {
                setProgress(newProgress);
            }
        }, 1);

        const updateProgress = () => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = elapsedTime / duration;
            if (newProgress >= 1) {
                setProgress(1);
                clearInterval(progressInterval);
                setTimeout(() => {
                    setProgress(0);
                    startTime = Date.now();
                    progressInterval = setInterval(updateProgress, 100);
                    console.log("updatteProgress");

                    ganarDinero();
                }, 1);
            } else {
                setProgress(newProgress);
            }
        };
        
        return () => clearInterval(progressInterval);
    }, [duration]);

    

    return (
        <Progress.Bar progress={progress} width={200} height={20} color={'green'} animated={false} />
    );
}

export default ProgressBar

const styles = StyleSheet.create({})