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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Register from './src/screens/Register';
import Main from './src/screens/Main';
import AntNest from './src/components/AntNest';
import Social from './src/screens/Social';
import Settings from './src/screens/Settings';
import Outside from './src/screens/Outside';
import NewHormiguero from './src/screens/NewHormiguero';
import Profile from './src/screens/Profile';
import Game from './src/screens/Game';
import AppContextProvider from './src/components/AppContextProvider';
import Personal from './src/screens/Personal';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

type RootStackParamList = {
    Register: undefined,
    Login: undefined,
    Main: undefined,
    Social: undefined,
    Settings: undefined,
    Outside: undefined,
    NewHormiguero: undefined,
    Profile: undefined,
    Game: undefined,
    Personal: undefined
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
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Personal" component={Personal}/>
                    <Stack.Screen name="Game" component={Game}/>
                    <Stack.Screen name="NewHormiguero" component={NewHormiguero}/>
                    <Stack.Screen name="Outside" component={Outside}/>
                    <Stack.Screen name="Profile" component={Profile}/>
                    <Stack.Screen name="Main" component={Main}/>
                    <Stack.Screen name="Settings" component={Settings}/>
                    <Stack.Screen name="Social" component={Social}/>
                    <Stack.Screen name="Register" component={Register}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContextProvider>
    )
}

export default App;