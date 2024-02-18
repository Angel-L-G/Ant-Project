import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from '../themes/styles'
import UseUser from '../hooks/UseUser'

type Props = {
    navigation: any
}

const Register = ({navigation}: Props) => {
    const {save} = UseUser();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function createUser(){
        const user: User = {
            id: 0,
            name: username
        }

        save(user);

        navigation.navigate("Main");
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.BackgorundImage}
                source={require('../img/sesion.jpg')}
            />

            <View style={styles.formContainer}>
                <View style={styles.formTitle}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Registrate</Text>
                </View>

                <Text></Text>

                <View style={styles.innerFormContainer}>
                    <Text style={styles.formText}>Nick</Text>
                    <TextInput placeholder='nick' onChangeText={setUsername}/>
                </View>

                <Text></Text>

                <View style={styles.innerFormContainer}>
                    <Text style={styles.formText}>Email</Text>
                    <TextInput placeholder='email@gmail.com' onChangeText={setEmail}/>
                </View>

                <Text></Text>


                <View style={styles.innerFormContainer}>
                    <Text style={styles.formText}>Password</Text>
                    <TextInput placeholder='********' onChangeText={setPassword}/>
                </View>

                <Text></Text>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={createUser} style={styles.button}>
                        <Text>Register</Text>
                    </TouchableOpacity>

                    <Text></Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.enlaceText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Register