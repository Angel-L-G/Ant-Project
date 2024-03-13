import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { NestLevel } from './types';
import { AppContext } from './AppContextProvider';
import axios from 'axios';
import Globals from './Globals';
import UseEggs from '../hooks/UseEggs';

type Props = {
    duration: number,
    lastLevel: NestLevel
}

const ProgressBar = ({ duration, lastLevel }: Props) => {
    const {ruta} = Globals();
    const {user, token} = useContext(AppContext);
    const [progress, setProgress] = useState(0);
    const {eggs, ganarDinero} = UseEggs(lastLevel);

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