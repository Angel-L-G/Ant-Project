import { StyleSheet, Text, TouchableHighlight, View, FlatList } from 'react-native';
import React, { useContext, useEffect } from 'react'
import UseChat from '../hooks/UseChat'
import { Message } from '../types/chatTypes';
import { AppContext } from '../context/AppContextProvider';
import styles from '../themes/styles';

const TestChatGrupal = () => {
    const {sendGroupMessage, conectar, historico} = UseChat();
    const {user} = useContext(AppContext);

    useEffect(() => {
        conectar();
    }, [])
    
    function aux() {
        let messageRecieved: Message = {
            body: "messageTo.content",
            sentAt: new Date(),
            senderId: user.id
        };

        //sendGroupMessage(messageRecieved);
    }

    return (
        <View>
            <TouchableHighlight onPress={aux}>
                <Text>Send</Text>
            </TouchableHighlight>

            <FlatList
                data={historico}
                renderItem={({ item }) =>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Text style={{ color: "black", marginTop: 10, marginRight: 16, fontFamily: "MadimiOneRegular", fontSize: 16 }}>item.sentAt</Text>
                        <View>
                            <Text style={{ ...styles.messageText, color: "black" }}>{item.body}</Text>
                        </View>
                    </View>
                }
                keyExtractor={(item, index) => index.toString()}
                inverted
            />
        </View>
    )
}

export default TestChatGrupal;