import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Social from '../screens/Social';
import Settings from '../screens/Settings';

type Props = {}

const Drawer = createDrawerNavigator();

const DrawerNav = (props: Props) => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Social" component={Social} />
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
    )
}

export default DrawerNav