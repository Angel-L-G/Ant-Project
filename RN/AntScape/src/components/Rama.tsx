import { Alert, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { NestLevel } from './types'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import Globals from './Globals'
import { AppContext } from './AppContextProvider'

type Props = {
	lastLevel: NestLevel,
	updateEggs: Function,
	updateLevels: Function,
	actualLevel: NestLevel
}

const Rama = ({lastLevel, updateEggs, updateLevels, actualLevel}: Props) => {
	const {token, user} = useContext(AppContext);
	const [modalVisible, setModalVisible] = useState(false);
	const [actualLvl, setActualLvl] = useState<NestLevel>();
	const {ruta} = Globals();

	async function mejorar() {
		try {
			const response = await axios.put(ruta + "v2/nestlevels/levelup/" + actualLevel.id, null, {headers: { "Authorization": "Bearer " + token }});

			const responseGet = await axios.get(ruta + "v2/nestlevels/" + actualLevel.id, {headers: { "Authorization": "Bearer " + token }});
			setActualLvl(responseGet.data);

            const responseGetLevels = await axios.get(ruta + "v2/nests/own/" + user.name, {headers: { "Authorization": "Bearer " + token }});
			updateLevels(responseGetLevels.data[0].nestLevels);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<View style={{ backgroundColor: "#0099CA", margin: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

			<View>
				<TouchableHighlight style={{ justifyContent: 'center', alignItems: 'center', width: 60, height: 60, backgroundColor: "rgb(28, 64, 169)", margin: 10, borderRadius: 20, borderWidth: 2, borderColor: "yellow" }} onPress={() => setModalVisible(true)}>
					<Text style={{ color: "yellow", fontWeight: "bold" }}>Mejorar</Text>
				</TouchableHighlight>
			</View>
			<ImageBackground source={require('../assets/imgs/Rama.jpg')} style={{ margin: 10, height: 80, width: 270 }}>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
					{(actualLvl) ? 
						<ProgressBar duration={2000} lastLevel={actualLvl} updateEggs={updateEggs}/>
						: 
						<ProgressBar duration={2000} lastLevel={actualLevel} updateEggs={updateEggs}/>
					}
				</View>
			</ImageBackground>

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
						<Text style={{textAlign: 'center', fontFamily: "MadimiOneRegular", fontSize: 30, color: "yellow", marginBottom: 20}}>
							Datos Rama {actualLevel.name}
						</Text>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<LinearGradient colors={['rgba(0, 136, 185, 1)', 'rgba(0, 100, 100, 1)', 'rgba(0, 136, 185, 1)']}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
							style={{ marginBottom: 20, width: 109 }}>
								<Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center'}}>
									Nivel: {actualLevel.level}
								</Text>
							</LinearGradient>
							<LinearGradient colors={['rgba(0, 136, 185, 1)', 'rgba(0, 100, 100, 1)', 'rgba(0, 136, 185, 1)']}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
							style={{ marginBottom: 20, width: 109 }}>
								<Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center'}}>
									Nivel: {actualLevel.level + 1}
								</Text>
							</LinearGradient>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<LinearGradient colors={['rgba(0, 136, 185, 1)', 'rgba(0, 100, 100, 1)', 'rgba(0, 136, 185, 1)']}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
							style={{ marginBottom: 20, width: 109 }}>
								<Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center'}}>
									Produc.: {actualLevel.production}
								</Text>
							</LinearGradient>
							<LinearGradient colors={['rgba(0, 136, 185, 1)', 'rgba(0, 100, 100, 1)', 'rgba(0, 136, 185, 1)']}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
							style={{ marginBottom: 20, width: 109 }}>
								<Text style={{fontFamily: "MadimiOneRegular", fontSize: 18, color: "yellow", padding: 5, textAlign: 'center'}}>
									Produc.: {(actualLevel.production * actualLevel.multiplier).toFixed(2)}
								</Text>
							</LinearGradient>
						</View>
						<View style={{}}>
							<View style={{alignItems: 'center'}}>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => setModalVisible(!modalVisible)}>
									<Text style={styles.textStyle}>Volver</Text>
								</Pressable>
							</View>

							<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
								<View style={{ justifyContent: 'center', alignItems: 'center', width: 80, height: 60, backgroundColor: "rgb(28, 64, 169)", marginTop: 30, borderRadius: 20, borderWidth: 2, borderColor: "yellow" }}>
									<Text style={{ color: "yellow", fontFamily: "MadimiOneRegular", fontSize: 18, textAlign: 'center' }}>Coste: {actualLevel.cost}</Text>
								</View>
								<TouchableHighlight style={{ justifyContent: 'center', alignItems: 'center', width: 80, height: 60, backgroundColor: "rgb(28, 64, 169)", marginTop: 30, borderRadius: 20, borderWidth: 2, borderColor: "yellow" }} onPress={() => mejorar()}>
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
		height: 400,
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