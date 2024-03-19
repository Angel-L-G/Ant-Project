import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from '../themes/styles'
import UseUser from '../hooks/UseUser'
import { UserRegister } from '../components/types'
import UseSesion from '../hooks/UseSesion'
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {
    navigation: any
}

const Register = ({navigation}: Props) => {
    //const {save} = UseUser();
    const {register} = UseSesion();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function createUser(){
        register(username, password, email, navigation);
        
        //ToastAndroid.show('text',ToastAndroid.SHORT);
    }

    return (
        <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.formTitle}>
                    <Text style={{fontSize: 50, color: "yellow", fontFamily: "MadimiOneRegular"}}>Regístrate</Text>
                </View>

                <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}
                extraScrollHeight={175}
                enableOnAndroid={true}
                scrollEnabled={false}>
                    <View style={styles.formContainerRegister}>

                        <View style={styles.innerFormContainer}>
                            <Text style={styles.formText}>Nick:</Text>
                            <TextInput placeholder='Nick' onChangeText={setUsername} style={{width: 80, borderBottomWidth: 1, borderColor: "black", height: 30, padding: 0}}/>
                        </View>

                        <View style={styles.innerFormContainer}>
                            <Text style={styles.formText}>Email</Text>
                            <TextInput placeholder='Email' onChangeText={setEmail} style={{width: 80, borderBottomWidth: 1, borderColor: "black", height: 30, padding: 0}}/>
                        </View>

                        <View style={styles.innerFormContainer}>
                            <Text style={styles.formText}>Password</Text>
                            <TextInput placeholder='Password' onChangeText={setPassword} secureTextEntry={true} style={{width: 80, borderBottomWidth: 1, borderColor: "black", height: 30, padding: 0}}/>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <LinearGradient colors={['rgba(20, 40, 140, 1)', 'rgba(30, 70, 200, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ }}>
                                <TouchableOpacity onPress={createUser} style={styles.button}>
                                    <Text style={{fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 18}}>Register</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                            <Text></Text>

                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.enlaceText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </LinearGradient>
    )
}

export default Register