import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ClanType } from './types'

type Props = {
    clan: ClanType
}

const ClanCard = ({clan}: Props) => {
    return (
        <View>
            <Text>ClanCard</Text>
        </View>
    )
}

export default ClanCard

const styles = StyleSheet.create({})