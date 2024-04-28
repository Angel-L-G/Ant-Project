import { StyleSheet, Text, View, TouchableHighlight, Touchable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBotton from '../components/NavBarBotton'
import Globals from '../components/Globals'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'
import { ClanType } from '../types/types'
import { Icon, Image } from 'react-native-elements';

type Props = {
    navigation: any,
}

const Clan = ({ navigation }: Props) => {
    const { ruta } = Globals();
    const { token, user } = useContext(AppContext);
    const [clan, setClan] = useState<ClanType>({} as ClanType);
    const [tieneClan, setTieneClan] = useState(false);
    const [clanId, setClanId] = useState(0);

    useEffect(() => {
        async function carga() {
            console.log("UseEffect");

            if (user.id_guild != null) {
                console.log("Tiene Clan");
                getClan(user.id_guild);
                setTieneClan(true);
            } else {
                console.log("No tieneClan o es lider");

                try {
                    const response = await axios.get(ruta + "v2/guilds", { headers: { "Authorization": "Bearer " + token } });
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].leader == user.id) {
                            setTieneClan(true);
                            setClanId(response.data[i].id);

                            console.log("Es lider");

                            try {
                                const response2 = await axios.get(ruta + "v2/guilds/" + response.data[i].id, { headers: { "Authorization": "Bearer " + token } });
                                setClan(response2.data);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        carga();


    }, [])

    async function getClan(id: Number) {
        try {
            const response = await axios.get(ruta + "v2/guilds/" + id, { headers: { "Authorization": "Bearer " + token } });
            setClan(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <View style={{ width: "100%", height: "100%" }}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                {(tieneClan) ?
                    <View style={{ height: "93%", width: "100%" }}>
                        
                        <View style={{position: "absolute", width: "20%", height: "15%", bottom: 0, right: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableHighlight underlayColor={"orange"} onPress={() => navigation.navigate("Atacar", {clan: clan})} style={{width: 70, height: 70, backgroundColor: "yellow", borderRadius: 100, elevation: 10, justifyContent: 'center'}}>
                                <Image source={require('../assets/imgs/sword.png')} style={{ width: "70%", height: "80%", marginLeft: 10, marginTop: 5}} />
                            </TouchableHighlight>
                        </View>

                        <View style={{position: "absolute", top: 10, left: 10}}>
                            <TouchableHighlight underlayColor={"rgb(24, 50, 150)"} onPress={() => navigation.navigate("ClanProfile", {clan: clan})} style={{width: 100, height: 30, backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 20, justifyContent: "center", alignContent: 'center', elevation: 10}}>
                                <Text style={{textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow"}}>Clan</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    
                    :
                    <View style={{ height: "93%", width: "100%" }}>
                        <View style={{ alignItems: 'center', marginTop: 180 }}>
                            <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 26, color: "yellow", textAlign: 'center' }}>No perteneces a ningún Clan</Text>
                            <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 26, color: "yellow", textAlign: 'center' }}>Unete a uno ahora o crea el tuyo propio</Text>
                        </View>
                        <View style={{ marginTop: 100, flexDirection: "row", justifyContent: 'space-evenly' }}>
                            <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("CrearClan")} style={{ height: 60, width: 90, borderWidth: 4, borderColor: "rgba(200, 50, 50, 1)", backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 25, justifyContent: "center", alignItems: 'center' }}>
                                <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", textAlign: 'center' }}>Crear       Clan</Text>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Social", { tab: 2 })} style={{ height: 60, width: 90, borderWidth: 4, borderColor: "rgba(50, 180, 120, 1)", backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 25, justifyContent: "center", alignItems: 'center' }}>
                                <Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", textAlign: 'center' }}>Buscar    Clan</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                }
                <NavBarBotton navigation={navigation} icon='clan' />
            </View>
        </View>
    );
};

export default Clan

