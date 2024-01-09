import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SvgXml } from "react-native-svg";

import { iconFlip, iconCamera } from '../assets/icons/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const iconMapping = {
    flip: iconFlip,
    camera: iconCamera
}


export default function Icon({ name, width, height, color = '#FFF', onPress, style }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...style }}>
            <SvgXml style={styles.container} xml={iconMapping[name]} width={width} height={height} fill={color} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});