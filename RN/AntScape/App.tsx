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
import Settings from './src/screens/Settings';
import Outside from './src/screens/Outside';
import NewHormiguero from './src/screens/NewHormiguero';
import Profile from './src/screens/Profile';
import Game from './src/screens/Game';
import AppContextProvider from './src/context/AppContextProvider';
import Personal from './src/screens/Personal';
import ProfileOther from './src/screens/ProfileOther';
import { ClanType, User } from './src/types/types';
import Clan from './src/screens/Clan';
import Ajustes from './src/screens/Ajustes';
import ClanProfile from './src/screens/ClanProfile';
import CrearClan from './src/screens/CrearClan';
import NuevoChat from './src/screens/NuevoChat';
import ClanProfileOther from './src/screens/ClanProfileOther';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

export type RootStackParamList = {
    Register: undefined,
    Login: undefined,
    Social: {tab: number},
    NuevoChat: {name: string},
    Profile: undefined,
    Personal: undefined,
    ProfileOther: {usu: User},
    Clan: undefined,
    Ajustes: undefined,
    ClanProfile: {clan: ClanType},
    CrearClan: undefined,
    ClanProfileOther: {clan: ClanType},
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {

    return (
        <AppContextProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Personal" component={Personal}/>
                    <Stack.Screen name="Profile" component={Profile}/>
                    <Stack.Screen name="ProfileOther" component={ProfileOther}/>
                    <Stack.Screen name="Social" component={Social}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="Clan" component={Clan}/>
                    <Stack.Screen name="ClanProfile" component={ClanProfile}/>
                    <Stack.Screen name="ClanProfileOther" component={ClanProfileOther}/>
                    <Stack.Screen name="Ajustes" component={Ajustes}/>
                    <Stack.Screen name="CrearClan" component={CrearClan}/>
                    <Stack.Screen name="NuevoChat" component={NuevoChat}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContextProvider>
    )
}

export default App;