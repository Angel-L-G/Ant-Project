import { Alert, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ProgressBar from './ProgressBar'
import { NestLevel } from '../types/types'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import Globals from './Globals'
import { AppContext } from '../context/AppContextProvider'
import WebView from 'react-native-webview'

type Props = {
	lastLevel: NestLevel,
	updateEggs: Function,
	updateLevels: Function,
	actualLevel: NestLevel,
	ganarDinero: Function,
	eg: number
}

const Rama = ({ lastLevel, updateEggs, updateLevels, actualLevel, ganarDinero, eg }: Props) => {
	const { token, user } = useContext(AppContext);
	const [modalVisible, setModalVisible] = useState(false);
	const [actualLvl, setActualLvl] = useState<NestLevel>(actualLevel);
	const { ruta } = Globals();
	const [internalState, setInternalState] = useState<NestLevel>(actualLvl);

	const [key, setKey] = useState(0);
	const rnd = useRef(0);
	const [loading, setLoading] = useState(true);
	const [gifPath, setGifPath] = useState();

	const aux = [
		require('../assets/gifs/Cortadoras_Dia_1.gif'),
		require('../assets/gifs/Cortadoras_Dia_2.gif'),
		require('../assets/gifs/Cortadoras_Noche_1.gif'),
		require('../assets/gifs/Cortadoras_Noche_2.gif'),
		require('../assets/gifs/Negras_Dia_1.gif'),
		require('../assets/gifs/Negras_Dia_2.gif'),
		require('../assets/gifs/Negras_Dia_3.gif'),
		require('../assets/gifs/Negras_Dia_4.gif'),
	];

	useEffect(() => {
		async function generateGifNumber() {
			rnd.current = Math.floor(Math.random() * 8);
			setGifPath(aux[rnd.current]);
			setLoading(false);
		}

		const interval = setInterval(() => {
			setKey(prevKey => prevKey + 1);
		}, 10000);

		generateGifNumber();
		return () => clearInterval(interval);
	}, [])

	useEffect(() => {
		setInternalState(actualLvl);
	}, [actualLvl]);

	async function mejorar() {
		try {
			const levelToUpgrade = actualLvl || actualLevel;
			if (eg >= levelToUpgrade.cost) {
				const response = await axios.put(ruta + "v2/nestlevels/levelup/" + levelToUpgrade.id, null, { headers: { "Authorization": "Bearer " + token } });

				const responseGet = await axios.get(ruta + "v2/nestlevels/" + levelToUpgrade.id, { headers: { "Authorization": "Bearer " + token } });
				setActualLvl(responseGet.data);
				console.log("Upgrade: " + actualLvl.production);

				const responseGetLevels = await axios.get(ruta + "v2/nests/own/" + user.name, { headers: { "Authorization": "Bearer " + token } });
				updateLevels(responseGetLevels.data[0].nestLevels);

				ganarDinero(-levelToUpgrade.cost);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<View style={{ backgroundColor: "#0099CA", margin: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>


			<View>
				<TouchableHighlight underlayColor={'rgb(10, 40, 142)'} style={{ justifyContent: 'center', alignItems: 'center', width: 60, height: 60, backgroundColor: "rgb(28, 64, 169)", margin: 10, borderRadius: 20, borderWidth: 2, borderColor: "yellow" }} onPress={() => setModalVisible(true)}>
					<Text style={{ color: "yellow", fontWeight: "bold" }}>Mejorar</Text>
				</TouchableHighlight>
			</View>
			<View style={{ margin: 10, height: 120, width: 270 }}>
				{
					(loading) ?
						<Text style={{ width: "100%", height: "100%" }}>Loading...</Text>
						:
						<WebView
							source={gifPath}
							style={{ width: "100%", height: "100%" }}
							containerStyle={{ width: "100%", height: "100%" }}

						/>
				}

				<View style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 4, marginTop: 4 }}>
					<ProgressBar duration={1000 * actualLvl.multiplier} lastLevel={internalState} updateEggs={updateEggs} ganarDinero={ganarDinero} />
				</View>
			</View>

			<View style={{ position: 'absolute', top: 12, right: 30 }}>
				<Text style={{ color: "white", fontFamily: "MadimiOneRegular", fontSize: 18, textAlign: 'center' }}>Produc.: {actualLvl.production.toFixed(0)}</Text>
			</View>

			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={{ textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 30, color: "yellow", marginBottom: 20 }}>
							Datos Rama {actualLvl.name}
						</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<LinearGradient colors={['rgba(0, 136, 185, 1)', 'rgba(0, 100, 100, 1)', 'rgba(0, 136, 185, 1)']}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								style={{ marginBottom: 20, width: 109 }}>
								<Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center' }}>
									Nivel: {actualLvl.level}
								</Text>
							</LinearGradient>
							<LinearGradient colors={['rgba(0, 136, 185, 1)', 'rgba(0, 100, 100, 1)', 'rgba(0, 136, 185, 1)']}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								style={{ marginBottom: 20, width: 109 }}>
								<Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center' }}>
									Nivel: {actualLvl.level + 1}
								</Text>
							</LinearGradient>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<LinearGradient colors={['rgba(0, 136, 185, 1)', 'rgba(0, 100, 100, 1)', 'rgba(0, 136, 185, 1)']}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								style={{ marginBottom: 20, width: 109 }}>
								<Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center' }}>
									Produc.: {Math.round(actualLvl.production)}
								</Text>
							</LinearGradient>
							<LinearGradient colors={['rgba(0, 136, 185, 1)', 'rgba(0, 100, 100, 1)', 'rgba(0, 136, 185, 1)']}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								style={{ marginBottom: 20, width: 109 }}>
								{(actualLvl.production * actualLvl.multiplier <= actualLvl.production + 1) ?
									<Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center' }}>Produc.: {Math.round(actualLvl.production + 1)}</Text>
									:
									<Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center' }}>{Math.round(actualLvl.production * actualLvl.multiplier)}</Text>
								}
							</LinearGradient>
						</View>
						<View style={{}}>
							<View style={{ alignItems: 'center' }}>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => setModalVisible(!modalVisible)}>
									<Text style={styles.textStyle}>Volver</Text>
								</Pressable>
							</View>

							<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
								<View style={{ justifyContent: 'center', alignItems: 'center', width: 80, height: 60, backgroundColor: "rgb(28, 64, 169)", marginTop: 30, borderRadius: 20, borderWidth: 2, borderColor: "yellow" }}>
									<Text style={{ color: "yellow", fontFamily: "MadimiOneRegular", fontSize: 18, textAlign: 'center' }}>Coste: {actualLvl.cost}</Text>
								</View>
								<TouchableHighlight underlayColor={'rgb(10, 40, 142)'} style={{ justifyContent: 'center', alignItems: 'center', width: 80, height: 60, backgroundColor: "rgb(28, 64, 169)", marginTop: 30, borderRadius: 20, borderWidth: 2, borderColor: "yellow" }} onPress={() => mejorar()}>
									<Text style={{ color: "yellow", fontFamily: "MadimiOneRegular", fontSize: 18 }}>Mejorar</Text>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}

export default Rama

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: '#00a8d6',
		borderRadius: 20,
		padding: 35,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		height: 'auto',
		width: 350
	},
	button: {
		width: 100,
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginTop: 10
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});