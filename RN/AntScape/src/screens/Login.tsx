import { View, Text, Image, TouchableHighlight, TouchableOpacity,TextInput } from 'react-native';
import React, { useState } from 'react'
import styles from '../themes/styles'
import UseUser from '../hooks/UseUser';
import { UserLogin } from '../components/types';
import UseSesion from '../hooks/UseSesion';

type Props = {
    navigation: any
}

const Login = ({navigation}: Props) => {
    //const {findByName} = UseUser();
    const {login} = UseSesion();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function searchUser(){
        login(username, password, navigation);
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.BackgorundImage}
                source={require('../img/sesion.jpg')}
            />

            <View style={styles.formContainer}>
                <View style={styles.formTitle}>
                    <Text style={{fontSize: 20,fontWeight: 'bold'}}>Iniciar Sesión</Text>
                </View>

                <Text></Text>

                <View style={styles.innerFormContainer}>
                    <Text style={styles.formText}>Nick</Text>
                    <TextInput placeholder='nick' onChangeText={setUsername}/>
                </View>

                <Text></Text>
                
                <View style={styles.innerFormContainer}>
                    <Text style={styles.formText}>Password</Text>
                    <TextInput placeholder='********' onChangeText={setPassword} secureTextEntry={true}/>
                </View>

                <Text></Text>
                
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={searchUser} style={styles.button}>
                        <Text>Log In</Text>
                    </TouchableOpacity>

                    <Text></Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.enlaceText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login