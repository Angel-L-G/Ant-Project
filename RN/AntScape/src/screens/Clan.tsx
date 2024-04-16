import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBotton from '../components/NavBarBotton'
import Globals from '../components/Globals'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'
import { ClanType } from '../types/types'

type Props = {
    navigation: any,
}

const Clan = ({navigation}: Props) => {
    const {ruta} = Globals();
    const {token, user} = useContext(AppContext);
    const [clan, setClan] = useState<ClanType>({} as ClanType);
    const [tieneClan, setTieneClan] = useState(false);

    useEffect(() => {
        async function getC() {
            try {
                const response = await axios.get(ruta + "v2/guilds/" + user.id_guild, { headers: { "Authorization": "Bearer " + token } });
                setClan(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        if (user.id_guild != null) {
            console.log("Tiene Clan");
            getC();
            setTieneClan(true);
        } else {
            console.log("No tiene Clan");
            setTieneClan(false);
        }
    }, [])

    return (
        <View style={{width: "100%", height: "100%"}}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                {(tieneClan) ? 
                        <View style={{ height: "93%", width: "100%" }}>
                            <View>
                                <Text>{clan.name}</Text>
                            </View>
                        </View>
                    :
                        <View style={{ height: "93%", width: "100%" }}>
                            <View style={{alignItems: 'center', marginTop: 180}}>
                                <Text style={{fontFamily: "MadimiOneRegular", fontSize: 26, color: "yellow", textAlign: 'center'}}>No perteneces a ningún Clan</Text>
                                <Text style={{fontFamily: "MadimiOneRegular", fontSize: 26, color: "yellow", textAlign: 'center'}}>Unete a uno ahora o crea el tuyo propio</Text>
                            </View>
                            <View style={{marginTop: 100, flexDirection: "row", justifyContent: 'space-evenly'}}>
                                <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("CrearClan")} style={{height: 60, width: 90, borderWidth: 4, borderColor: "rgba(200, 50, 50, 1)", backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 25, justifyContent: "center", alignItems: 'center'}}>
                                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", textAlign: 'center'}}>Crear       Clan</Text>
                                </TouchableHighlight>

                                <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate("Social", {tab: 2})} style={{height: 60, width: 90,  borderWidth: 4, borderColor: "rgba(50, 180, 120, 1)", backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 25, justifyContent: "center", alignItems: 'center'}}>
                                    <Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", textAlign: 'center'}}>Buscar    Clan</Text>
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

