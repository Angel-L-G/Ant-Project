import { View, Text, Image, TouchableHighlight, TouchableOpacity, TextInput, ScrollView, ImageBackground, Dimensions, LogBox } from 'react-native';
import React, { useState } from 'react'
import styles from '../themes/styles'
import UseSesion from '../hooks/UseSesion';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {
    navigation: any
}

const Login = ({ navigation }: Props) => {
    LogBox.ignoreAllLogs();
    const { login, loading } = UseSesion();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function searchUser() {
        let name = username;
        let pass = password;
        setUsername("");
        setPassword("");
        login(name, pass, navigation);
    }

    return (
        <ImageBackground source={require('../assets/imgs/Portada.png')} style={{ position: "absolute", width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
            <View style={styles.container}>
                <View style={styles.formTitle}>
                    <Text style={{ fontSize: 50, color: 'rgba(20, 40, 140, 1)', fontFamily: "MadimiOneRegular" }}>Inicia Sesión</Text>
                </View>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}
                    extraScrollHeight={175}
                    enableOnAndroid={true}
                    scrollEnabled={false}>
                    <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.formContainer}>
                        <View style={{}}>

                            <View style={styles.innerFormContainer}>
                                <Text style={styles.formText}>Nick:</Text>
                                <TextInput placeholder='Nick' onChangeText={setUsername} value={username} style={{ width: 80, borderBottomWidth: 1, borderColor: "black", height: 30, padding: 0, color: "white", }} placeholderTextColor={"white"} />
                            </View>

                            <View style={styles.innerFormContainer}>
                                <Text style={styles.formText}>Password:</Text>
                                <TextInput placeholder='Password' onChangeText={setPassword} value={password} secureTextEntry={true} style={{ width: 80, borderBottomWidth: 1, borderColor: "black", height: 30, padding: 0, color: "white" }} placeholderTextColor={"white"} />
                            </View>

                            <Text></Text>

                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    style={{}}>
                                    {(loading) ? 
                                        <View style={styles.button}>
                                            <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 18 }}>Cargando...</Text>
                                        </View>
                                    :
                                        <TouchableOpacity onPress={searchUser} style={styles.button}>
                                            <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 18 }}>Log In</Text>
                                        </TouchableOpacity>
                                    }
                                </LinearGradient>


                                <Text></Text>

                                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                    <Text style={styles.enlaceText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </KeyboardAwareScrollView>
            </View>
        </ImageBackground>
    )
}

export default Login
