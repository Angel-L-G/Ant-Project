import { StyleSheet, Text, TouchableOpacity, View, TouchableHighlight, Touchable, Modal, Alert, ToastAndroid, Animated, ImageBackground, BackHandler } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Globals from '../components/Globals'
import { AppContext } from '../context/AppContextProvider'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { ClanType, ResultAttack } from '../types/types'
import { Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VictoryAnimation from '../components/VictoryAnimaion';

type Props = NativeStackScreenProps<RootStackParamList, "Atacar">;
const AnimatedText = Animated.createAnimatedComponent(Text);

const Atacar = ({ navigation, route }: Props) => {
    const clan = route.params.clan;
    const { ruta } = Globals();
    const { token, user, setGoldenEggsContext, goldenEggsContext } = useContext(AppContext);
    const [enemigo, setEnemigo] = useState<ClanType>({} as ClanType);
    const [ultimasTiradas, setUltimasTiradas] = useState<Array<number>>([]);
    const [sumaTotal, setSumaTotal] = useState<number>(0);
    const [rangoInferior, setRangoInferior] = useState<number>(0);
    const [rangoSuperior, setRangoSuperior] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalSalirVisible, setModalSalirVisible] = useState(false);
    const [victoria, setVictoria] = useState(false);
    const [resultado, setResultado] = useState<ResultAttack>({} as ResultAttack)
    const [conclusion, setConclusion] = useState("");

    const [currentNumber, setCurrentNumber] = useState(0);
    const [repetitions, setRepetitions] = useState(0);
    const maxRepetitions = 12;
    const [animationRunning, setAnimationRunning] = useState(false);

    const [animation] = useState(new Animated.Value(0));
    const delayBeforeClose = 1500; // 5 segundos antes de cerrar el modal
    const transitionDuration = 1; // Duración de la transición en milisegundos

    const handleBackPress = () => {
        setModalSalirVisible(true);

        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 6) + 1; // Generar números del 1 al 6
    };

    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: transitionDuration,
            useNativeDriver: true,
        }).start(() => {
            // Si aún no se han generado suficientes números aleatorios
            if (repetitions < maxRepetitions - 1) {
                const newNumber = generateRandomNumber();
                setCurrentNumber(newNumber);
                setRepetitions(prevRepetitions => prevRepetitions + 1);
            } else {
                // Si se han generado suficientes números, detener la animación
                // y esperar antes de cerrar el modal
                setTimeout(() => {
                    setAnimationRunning(false);

                    if (ultimasTiradas.length < 4) {
                        setUltimasTiradas([...ultimasTiradas, currentNumber]);
                    } else {
                        const nuevasTiradas = ultimasTiradas.slice(1);
                        setUltimasTiradas([...nuevasTiradas, currentNumber]);
                    }

                    setSumaTotal(prevTotal => prevTotal + currentNumber);
                }, delayBeforeClose);
            }
        });
    };

    useEffect(() => {
        if (animationRunning && repetitions < maxRepetitions) {
            startAnimation();
        }
    }, [animationRunning, repetitions]);

    const startAnimationOnPress = () => {
        setAnimationRunning(true);
        setCurrentNumber(0);
        setRepetitions(0);
    };

    const animatedStyles = {
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
    };

    useEffect(() => {
        async function buscarOponente() {
            try {
                const response = await axios.get(ruta + "v2/guilds/" + clan.id + "/seekChallenger", { headers: { "Authorization": "Bearer " + token } });
                console.log(response.data);
                setEnemigo(response.data);
                let [inferior, superior] = response.data.defenseRange.split("-");
                setRangoSuperior(superior);
                setRangoInferior(inferior);
            } catch (error) {
                console.log(error);
            }
        }

        buscarOponente();
    }, [])

    async function comprobarResultados() {
        try {
            const params = {
                attackNumber: sumaTotal,
            }
            const response = await axios.put(ruta + "v2/guilds/" + clan.id + "/attack/" + enemigo.id, null, { params: params, headers: { Authorization: "Bearer " + token } });
            console.log(response.data);
            setResultado(response.data);
            setGoldenEggsContext(goldenEggsContext + response.data.goldenEggs)
            if (response.data.trophys > 10) {
                setConclusion("Victoria");
            } else if (response.data.trophys > 0) {
                setConclusion("Pirrica");
            } else {
                setConclusion("Derrota");
            }
        } catch (error) {
            console.log(error);
        }

        setModalVisible(true);
    }

    function salir() {
        setModalVisible(false);
        setSumaTotal(0);
        setUltimasTiradas([]);
        navigation.navigate("Clan", {numero: 15});
    }

    async function cancelarAtaque() {
        setModalSalirVisible(false);

        if (ultimasTiradas.length > 0) {
            try {
                const params = {
                    attackNumber: -1000,
                }
                const response = await axios.put(ruta + "v2/guilds/" + clan.id + "/attack/" + enemigo.id, null, { params: params, headers: { Authorization: "Bearer " + token } });
                console.log(response.data);
                setResultado(response.data);
                if (response.data.trophys > 10) {
                    setConclusion("Victoria");
                } else if (response.data.trophys > 0) {
                    setConclusion("Pirrica");
                } else {
                    setConclusion("Derrota");
                }
            } catch (error) {
                console.log(error);
            }

            setModalVisible(true);
        } else {
            setModalVisible(true);
        }
    }

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
            <View style={{ width: "100%", height: "7%", backgroundColor: "rgb(28, 64, 169)", justifyContent: "space-around", alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1 }}>
                <View style={{ width: "11%", height: "80%" }}>
                    <Image source={{ uri: ruta + "v1/files/" + user.img }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                </View>
                <View>
                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>{enemigo.name}</Text>
                </View>
                <View style={{ width: "20%", height: "60%" }}>
                    <Image source={require('../assets/imgs/tablon.png')} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0, 0, 0, 0.6)", width: "100%", height: "100%", borderRadius: 100, flexDirection: 'row' }}>
                        <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>{enemigo.trophys}</Text>
                        <View style={{ width: "18%", height: "60%", marginLeft: 5 }}>
                            <Image source={require('../assets/imgs/Trophy.png')} style={{ width: "100%", height: "100%" }} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: "100%", height: "82%", alignItems: "center" }}>

                <ImageBackground source={require('../assets/imgs/Fondo.jpg')} style={{ width: "100%", height: "100%" }}>
                    <View style={{ height: "33%", width: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                        <TouchableHighlight style={{ width: "40%", height: "70%", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: "100%", height: "100%" }}>
                                <Image source={require('../assets/imgs/Entrance.png')} style={{ width: "100%", height: "100%" }} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ height: "34%", width: "100%", justifyContent: "center" }}>
                        <TouchableHighlight style={{ width: "40%", height: "70%", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: "100%", height: "100%" }}>
                                <Image source={require('../assets/imgs/Attack.png')} style={{ width: "100%", height: "100%" }} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ height: "33%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <TouchableHighlight style={{ width: "40%", height: "70%", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: "100%", height: "100%" }}>
                                <Image source={require('../assets/imgs/FoodStorage.png')} style={{ width: "100%", height: "100%" }} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </ImageBackground>

                <View style={{ position: "absolute", width: "62%", height: "18%", alignItems: "center" }}>
                    <View style={{ width: "100%", justifyContent: 'center', alignItems: "center", marginTop: "2%", borderRadius: 25, backgroundColor: "rgba(20, 40, 140, 0.9)", elevation: 6 }}>
                        <Text style={{ color: "yellow", fontSize: 16, fontFamily: "MadimiOneRegular", textAlign: 'center' }}>Posible Rango de Victoria</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "yellow", fontSize: 16, fontFamily: "MadimiOneRegular" }}>{Number(rangoInferior) - 2} </Text>
                            <Text style={{ color: "yellow", fontSize: 16, fontFamily: "MadimiOneRegular" }}>- {Number(rangoSuperior) + 2}</Text>
                        </View>
                    </View>

                    <View style={{ width: "70%", justifyContent: 'center', alignItems: "center", marginVertical: "3%", borderRadius: 25, backgroundColor: "rgba(20, 40, 140, 0.9)", elevation: 6 }}>
                        <Text style={{ color: "yellow", fontSize: 16, fontFamily: "MadimiOneRegular" }}>Rango enemigo</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "yellow", fontSize: 16, fontFamily: "MadimiOneRegular" }}>{rangoInferior} </Text>
                            <Text style={{ color: "yellow", fontSize: 16, fontFamily: "MadimiOneRegular" }}>- {rangoSuperior}</Text>
                        </View>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        {(conclusion == "Derrota") &&
                            <View style={{ position: "absolute", flexDirection: "row", justifyContent: "center" }}>
                                <View style={{ bottom: "35%", left: "0%", justifyContent: 'center', alignItems: "center", flex: 1 }}>
                                    <Image source={require('../assets/imgs/TrofeoDerrota.png')} style={{ width: 120, height: 200 }} />
                                </View>
                                <View style={{ bottom: "35%", right: "5%", justifyContent: 'center', alignItems: "center", flex: 1 }}>
                                    <Image source={require('../assets/imgs/TrofeoDerrota.png')} style={{ width: 120, height: 200 }} />
                                </View>
                                <View style={{ position: "absolute", bottom: "100%" }}>
                                    <Text style={{ color: "yellow", fontSize: 50, fontFamily: "MadimiOneRegular", width: 300, textAlign: 'center' }}>Derrota</Text>
                                </View>
                            </View>
                        }
                        {(conclusion == "Pirrica") &&
                            <View style={{ position: "absolute", flexDirection: "row", justifyContent: "center" }}>
                                <View style={{ bottom: "35%", left: "0%", justifyContent: 'center', alignItems: "center", flex: 1 }}>
                                    <Image source={require('../assets/imgs/TrofeoVictoria.png')} style={{ width: 120, height: 200 }} />
                                </View>
                                <View style={{ bottom: "35%", right: "5%", justifyContent: 'center', alignItems: "center", flex: 1 }}>
                                    <Image source={require('../assets/imgs/TrofeoVictoria.png')} style={{ width: 120, height: 200 }} />
                                </View>
                                <View style={{ position: "absolute", bottom: "100%" }}>
                                    <Text style={{ color: "yellow", fontSize: 50, fontFamily: "MadimiOneRegular", width: 300, textAlign: 'center' }}>Victoria Pírrica</Text>
                                </View>
                            </View>
                        }
                        {(conclusion == "Victoria") &&
                            <View style={{ position: "absolute", flexDirection: "row", justifyContent: "center" }}>
                                <VictoryAnimation />
                                <View style={{ bottom: "35%", left: "0%", justifyContent: 'center', alignItems: "center", flex: 1 }}>
                                    <Image source={require('../assets/imgs/TrofeoVictoria.png')} style={{ width: 120, height: 200 }} />
                                </View>
                                <View style={{ bottom: "35%", right: "5%", justifyContent: 'center', alignItems: "center", flex: 1 }}>
                                    <Image source={require('../assets/imgs/TrofeoVictoria.png')} style={{ width: 120, height: 200 }} />
                                </View>
                                <View style={{ position: "absolute", bottom: "100%" }}>
                                    <Text style={{ color: "yellow", fontSize: 50, fontFamily: "MadimiOneRegular", width: 300, textAlign: 'center' }}>Victoria Heroica</Text>
                                </View>
                            </View>
                        }
                        <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1.25 }}
                            style={stylesModal.modalView}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: "100%", width: "100%" }}>
                                    <View style={{ width: "100%", height: "100%" }}>
                                        {(conclusion == "Derrota") &&
                                            <View style={{ width: "100%", height: "100%" }}>
                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", width: 40, textAlign: 'center' }}>{resultado.eggs}</Text>
                                                    <Image source={require('../assets/imgs/FireAntEgg.webp')} style={{ width: 20, height: 30 }} />
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center", marginVertical: 10 }}>
                                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", width: 42, textAlign: 'center' }}>{resultado.goldenEggs}</Text>
                                                    <Image source={require('../assets/imgs/GoldenAntEgg2.png')} style={{ width: 18, height: 23 }} />
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", width: 35, textAlign: 'center' }}>{resultado.trophys}</Text>
                                                    <Image source={require('../assets/imgs/Trophy.png')} style={{ width: 25, height: 30 }} />
                                                </View>
                                            </View>
                                        }
                                        {(conclusion == "Pirrica") &&
                                            <View style={{ width: "100%", height: "100%" }}>
                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", width: 40, textAlign: 'center' }}>{resultado.eggs}</Text>
                                                    <Image source={require('../assets/imgs/FireAntEgg.webp')} style={{ width: 20, height: 30 }} />
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center", marginVertical: 10 }}>
                                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", width: 42, textAlign: 'center' }}>{resultado.goldenEggs}</Text>
                                                    <Image source={require('../assets/imgs/GoldenAntEgg2.png')} style={{ width: 18, height: 23 }} />
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", width: 35, textAlign: 'center' }}>{resultado.trophys}</Text>
                                                    <Image source={require('../assets/imgs/Trophy.png')} style={{ width: 25, height: 30 }} />
                                                </View>
                                            </View>
                                        }
                                        {(conclusion == "Victoria") &&
                                            <View style={{ width: "100%", height: "100%" }}>
                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", width: 40, textAlign: 'center' }}>{resultado.eggs}</Text>
                                                    <Image source={require('../assets/imgs/FireAntEgg.webp')} style={{ width: 20, height: 30 }} />
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center", marginVertical: 10 }}>
                                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", width: 42, textAlign: 'center' }}>{resultado.goldenEggs}</Text>
                                                    <Image source={require('../assets/imgs/GoldenAntEgg2.png')} style={{ width: 18, height: 23 }} />
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                                    <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", width: 35, textAlign: 'center' }}>{resultado.trophys}</Text>
                                                    <Image source={require('../assets/imgs/Trophy.png')} style={{ width: 25, height: 30 }} />
                                                </View>
                                            </View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                        <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 100, marginTop: "5%" }}>
                            <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => salir()} style={{ width: 40, height: 40, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 26 }}>X</Text>
                            </TouchableHighlight>
                        </LinearGradient>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalSalirVisible}
                    onRequestClose={() => {
                        setModalSalirVisible(!modalSalirVisible);
                    }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGradient colors={['rgba(30, 70, 200, 1)', 'rgba(20, 40, 140, 1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1.25 }}
                            style={stylesModal.modalSalirView}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: "60%", width: "100%" }}>
                                    <View style={{ width: "100%", height: "100%" }}>
                                        <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
                                            {(ultimasTiradas.length > 0) ?
                                                <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 18 }}>Si cancelas ahora no podras volver a atacar hasta dentro de 1 hora y el ataque contará como derrota</Text>
                                                :
                                                <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 20 }}>Si cancelas ahora no podras volver a atacar hasta dentro de 1 hora</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', height: "38%", width: "100%", marginTop: "2%" }}>
                                    <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => setModalSalirVisible(false)} style={{ width: 160, marginBottom: 10, padding: 5, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(50, 180, 120, 1)" }}>
                                        <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 18 }}>Continuar ataque</Text>
                                    </TouchableHighlight>
                                    {(ultimasTiradas.length > 0) ?
                                        <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => cancelarAtaque()} style={{ width: 160, padding: 5, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                            <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 18 }}>Cancelar ataque</Text>
                                        </TouchableHighlight>
                                        :
                                        <TouchableHighlight underlayColor={"rgba(30, 70, 200, 1)"} onPress={() => navigation.navigate("Clan", {numero: 10})} style={{ width: 160, padding: 5, borderRadius: 100, justifyContent: "center", borderWidth: 3, borderColor: "rgba(200, 50, 50, 1)" }}>
                                            <Text style={{ fontFamily: "MadimiOneRegular", textAlign: 'center', color: "yellow", fontSize: 18 }}>Cancelar ataque</Text>
                                        </TouchableHighlight>
                                    }
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </Modal>

            </View>
            <View style={{ width: "100%", height: "11%", borderTopWidth: 2 }}>
                <View style={{ flexDirection: "row", width: "100%", height: "100%" }}>
                    <View style={{ width: "37.5%", height: "100%" }}>
                        <View style={{ height: "100%", width: "100%" }}>
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular", textAlign: 'center' }}>Total: {sumaTotal}</Text>
                            </View>
                            <FlatList
                                data={ultimasTiradas}
                                renderItem={({ item }) =>
                                    <View style={{ marginHorizontal: "2%", width: "21%", height: 30, backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: 100, borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: "yellow", fontSize: 20, fontFamily: "MadimiOneRegular" }}>{item}</Text>
                                    </View>
                                }
                                style={{ width: "100%", height: "100%" }}
                                numColumns={4}
                            />

                            <Modal
                                transparent={true}
                                visible={animationRunning}
                                onRequestClose={() => setAnimationRunning(false)} // Cierra el modal cuando se pulsa fuera de él
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <Animated.Text style={[{ fontSize: 48, padding: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, width: 100, textAlign: 'center', color: "white" }, animatedStyles]}>
                                        {currentNumber}
                                    </Animated.Text>
                                </View>
                            </Modal>
                        </View>
                    </View>
                    <View style={{ width: "25%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
                        <TouchableHighlight underlayColor={"orange"} onPress={startAnimationOnPress} style={{ height: "80%", width: "74%", backgroundColor: "yellow", borderRadius: 100, alignItems: 'center', justifyContent: "center", borderWidth: 2 }}>
                            <Icon name="dice" size={40} color={"black"}></Icon>
                        </TouchableHighlight>
                    </View>
                    <View style={{ width: "37.5%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        {(sumaTotal < rangoInferior) ?
                            <TouchableHighlight underlayColor={"rgb(24, 50, 150)"} onPress={() => ToastAndroid.show("Sigue tirando, todavía no estás dentro del rango enemigo", ToastAndroid.LONG)} style={{ width: 100, height: 30, backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 20, justifyContent: "center", alignContent: 'center', marginBottom: 10 }}>
                                <Text style={{ textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow" }}>Terminar</Text>
                            </TouchableHighlight>
                            :
                            <TouchableHighlight underlayColor={"rgb(24, 50, 150)"} onPress={() => comprobarResultados()} style={{ width: 100, height: 30, backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 20, justifyContent: "center", alignContent: 'center', marginBottom: 10 }}>
                                <Text style={{ textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow" }}>Terminar</Text>
                            </TouchableHighlight>
                        }
                        <TouchableHighlight underlayColor={"rgb(24, 50, 150)"} onPress={() => setModalSalirVisible(true)} style={{ width: 100, height: 30, backgroundColor: "rgba(20, 40, 140, 1)", borderRadius: 20, justifyContent: "center", alignContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow" }}>Cancelar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Atacar

const stylesModal = StyleSheet.create({
    modalView: {
        backgroundColor: '#00a8d6',
        borderRadius: 20,
        padding: 5,
        elevation: 15,
        width: "40%",
        height: "15%",
        borderWidth: 2,
    },
    modalSalirView: {
        backgroundColor: '#00a8d6',
        borderRadius: 20,
        padding: 15,
        elevation: 15,
        width: "60%",
        height: "30%",
        borderWidth: 2,
    },
})