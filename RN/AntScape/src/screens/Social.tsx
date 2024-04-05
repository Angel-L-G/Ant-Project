import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import NavBarBotton from '../components/NavBarBotton';
import NavBarTop from '../components/NavBarTop';

type Props = {
    navigation: any,
}

const Social = ({ navigation }: Props) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabPress = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    return (
        <View style={styles.container}>
            <NavBarTop navigation={navigation} />

            <View style={{ height: "93%", width: "100%", backgroundColor: "rgb(28, 64, 169)" }}>
                <View style={{ height: "93%", width: "100%" }}>
                    <View style={styles.tabsContainer}>
                        <TouchableHighlight
                            style={[styles.tab, activeTab === 0 && styles.activeTab]}
                            onPress={() => handleTabPress(0)}
                            underlayColor="transparent"
                        >
                            <Text style={styles.tabText}>Usuarios</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.tab, activeTab === 1 && styles.activeTab]}
                            onPress={() => handleTabPress(1)}
                            underlayColor="#transparent"
                        >
                            <Text style={styles.tabText}>Amigos</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.tab, activeTab === 2 && styles.activeTab]}
                            onPress={() => handleTabPress(2)}
                            underlayColor="#transparent"
                        >
                            <Text style={styles.tabText}>Clan</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <NavBarBotton navigation={navigation} icon='social' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    tabsContainer: {
        backgroundColor: "rgb(15, 47, 150)",
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(28, 64, 169)',
    },
    activeTab: {
        backgroundColor: 'rgba(255, 255, 0, 0.18)',
        borderBottomColor: 'yellow',
    },
    tabText: {
        fontSize: 18,
        fontFamily: 'MadimiOneRegular',
        color: 'yellow',
    },

    /*
    <View style={styles.tabsContainer}>
                <TouchableHighlight
                    style={[styles.tab, activeTab === 0 && styles.activeTab]}
                    onPress={() => handleTabPress(0)}
                    underlayColor="#E5E5E5"
                >
                    <Text style={styles.tabText}>Tab 1</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.tab, activeTab === 1 && styles.activeTab]}
                    onPress={() => handleTabPress(1)}
                    underlayColor="#E5E5E5"
                >
                    <Text style={styles.tabText}>Tab 2</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.tab, activeTab === 2 && styles.activeTab]}
                    onPress={() => handleTabPress(2)}
                    underlayColor="#E5E5E5"
                >
                    <Text style={styles.tabText}>Tab 3</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.tab, activeTab === 3 && styles.activeTab]}
                    onPress={() => handleTabPress(3)}
                    underlayColor="#E5E5E5"
                >
                    <Text style={styles.tabText}>Tab 4</Text>
                </TouchableHighlight>
            </View>
    */
});

export default Social;
