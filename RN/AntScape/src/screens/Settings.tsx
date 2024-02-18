import { View, Text } from 'react-native'
import React, { useState } from 'react'
import styles from '../themes/styles'
import { CheckBox } from 'react-native-elements'
import SelectDropdown from 'react-native-select-dropdown'

type Props = {}

const Settings = (props: Props) => {
    const [isOn, setIsOn] = useState(false);
    const [selectValue, setSelectValue] = useState("");

    const opciones = [
        'Opción 1',
        'Opción 2',
        'Opción 3',
        'Opción 4',
        'Opción 5',
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View>
                <CheckBox
                    title="Dark Mode"
                    checked={isOn}
                    onPress={() => setIsOn(!isOn)}
                />

                <SelectDropdown
                    data={opciones}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(listItem, index) => {
                        return listItem
                    }}
                    defaultButtonText='Select an Option'
                />
            </View>
        </View>
    )
}

export default Settings