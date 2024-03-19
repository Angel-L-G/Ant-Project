import { View, Text, Image, FlatList, TouchableHighlight, Modal, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../themes/styles'
import UseUser from '../hooks/UseUser'
import { useAppContext } from '../components/AppContextProvider'
import { Button, Input } from 'react-native-elements'

type Props = {
    navigation: any
}

const Profile = ({navigation}: Props) => {
    const {user} = useAppContext();
    const {friends,findFriends,addFriend} = UseUser();
    const [modalVisible, setModalVisible] = useState(false);
    const [nameFriend, setNameFriend] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        findFriends();
    }, [])
    
    function showModal() {
        setModalVisible(true);
    }

    function closeModal(){
        setModalVisible(false);
    }

    function handleRefresh(){
        findFriends();
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainConatiner}>
                <Image
                    style={styles.bigProfilePicture}
                    source={require('../assets/imgs/profile.png')}
                />

                <Text style={styles.title}>{user.nombre}</Text>

                <View style={styles.textBodyContainer}>
                    <Text style={styles.textBody}>
                       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima illo, nemo neque repellat perferendis cupiditate molestiae error fuga dolorum cum fugiat saepe iste deserunt esse minus non architecto exercitationem placeat.
                    </Text>
                </View>

                <View style={styles.friendProfileList}>
                    <FlatList 
                        data={friends}
                        renderItem={({item}) => (
                            <TouchableHighlight onPress={() => navigation.navigate("Social")}>
                                <Text style={styles.friendProfileItem}>
                                    {item.nombre}
                                </Text>
                            </TouchableHighlight>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing = {refreshing}
                                onRefresh={handleRefresh}
                            />
                        }
                    />
                </View>

                <View style={{margin: 10}}>
                    <TouchableHighlight style={styles.button} onPress={showModal}>
                        <Text style={styles.textBody}>
                            Añadir Amigo
                        </Text>
                    </TouchableHighlight>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.subTitle}>Nombre Del Amigo Al Que Quieras Añadir</Text>
                        <Input onChangeText={setNameFriend} placeholder='Name'/>

                        <Button title="Añadir" onPress={() => {addFriend(nameFriend), closeModal()}} />
                        <Button title="Cerrar" onPress={() => closeModal()} />
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default Profile