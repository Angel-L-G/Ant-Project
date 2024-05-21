import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { NestLevel } from '../types/types';

type Props = {
    duration: number,
    lastLevel: NestLevel,
    updateEggs: Function,
    ganarDinero: Function
}

const ProgressBar = ({duration, lastLevel, updateEggs, ganarDinero}: Props) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let startTime = Date.now();
        let animationFrameId: number;
    
        const updateProgress = () => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = elapsedTime / duration;
            if (newProgress >= 1) {
                setProgress(1);
                setTimeout(() => {
                    setProgress(0);
                    startTime = Date.now();
                    animationFrameId = requestAnimationFrame(updateProgress);
                    ganarDinero(lastLevel.production);
                }, 400);
            } else {
                setProgress(newProgress);
                animationFrameId = requestAnimationFrame(updateProgress);
            }
        };
    
        animationFrameId = requestAnimationFrame(updateProgress);
    
        return () => cancelAnimationFrame(animationFrameId);
    }, [duration, lastLevel]);
    

    return (
        <Progress.Bar progress={progress} width={200} height={20} color={'green'} animated={false} />
    );
}

export default ProgressBar

const styles = StyleSheet.create({})