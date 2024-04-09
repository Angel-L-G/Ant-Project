import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Main from './src/screens/Main';
import Social from './src/screens/Social';
import Ajustes from './src/screens/Ajustes';
import Outside from './src/screens/Outside';
import NewHormiguero from './src/screens/NewHormiguero';
import Profile from './src/screens/Profile';
import Game from './src/screens/Game';
import AppContextProvider from './src/context/AppContextProvider';
import Personal from './src/screens/Personal';
import { User } from './src/components/types';
import ProfileOther from './src/screens/ProfileOther';
import Clan from './src/screens/Clan';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

export type RootStackParamList = {
    Register: undefined,
    Login: undefined,
    Main: undefined,
    Social: undefined,
    Ajustes: undefined,
    Outside: undefined,
    NewHormiguero: undefined,
    Profile: undefined,
    Game: undefined,
    Personal: undefined,
    ProfileOther: {user: User},
    Clan: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <AppContextProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Personal" component={Personal}/>
                    <Stack.Screen name="Game" component={Game}/>
                    <Stack.Screen name="NewHormiguero" component={NewHormiguero}/>
                    <Stack.Screen name="Outside" component={Outside}/>
                    <Stack.Screen name="Profile" component={Profile}/>
                    <Stack.Screen name="ProfileOther" component={ProfileOther}/>
                    <Stack.Screen name="Main" component={Main}/>
                    <Stack.Screen name="Ajustes" component={Ajustes}/>
                    <Stack.Screen name="Social" component={Social}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="Clan" component={Clan}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContextProvider>
    )
}

export default App;
