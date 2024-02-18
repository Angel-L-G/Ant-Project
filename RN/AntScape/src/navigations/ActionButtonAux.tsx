import { View, Text } from 'react-native'
import React from 'react'
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import styles from '../themes/styles';

type Props = {}

const ActionButtonAux = (props: Props) => {
    return (
        <ActionButton size={40} offsetX={10} offsetY={10} position='right' verticalOrientation='down'>
            <ActionButton.Item buttonColor='#9b59b6' onPress={() => console.log("notes tapped!")}>
                <Icon name="settings" style={styles.icono} size={40}/>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#9b59b6' onPress={() => console.log("notes tapped!")}>
                <Icon name="settings" style={styles.icono} size={40}/>
            </ActionButton.Item>
        </ActionButton>
    )
}

export default ActionButtonAux