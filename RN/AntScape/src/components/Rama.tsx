import { Alert, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { NestLevel } from './types'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import Globals from './Globals'
import { AppContext } from '../context/AppContextProvider'

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
			<ImageBackground source={require('../assets/imgs/Rama.jpg')} style={{ margin: 10, height: 80, width: 270 }}>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
					<ProgressBar duration={1000 * actualLvl.multiplier} lastLevel={internalState} updateEggs={updateEggs} ganarDinero={ganarDinero} />
				</View>
			</ImageBackground>

			<View style={{position: 'absolute', top: 12, right: 30}}>
				<Text style={{ color: "black", fontFamily: "MadimiOneRegular", fontSize: 18, textAlign: 'center' }}>Produc.: {actualLvl.production.toFixed(2)}</Text>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
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
									Produc.: {actualLvl.production.toFixed(2)}
								</Text>
							</LinearGradient>
							<LinearGradient colors={['rgba(0, 136, 185, 1)', 'rgba(0, 100, 100, 1)', 'rgba(0, 136, 185, 1)']}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								style={{ marginBottom: 20, width: 109 }}>
								<Text style={{ fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center' }}>
									Produc.: {(actualLvl.production * actualLvl.multiplier).toFixed(2)}
								</Text>
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