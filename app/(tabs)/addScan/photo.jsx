import React, { useState, useEffect } from "react";
import { Link, router, Stack, useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { Text, View, Button, StyleSheet, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import commonStyles from "../../../styles/common";


const Photo = () => {
    const {image} = useLocalSearchParams();

    // console.log(params)
    return (
        <>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

            <View style={styles.controlsContainer}>
                    <TouchableOpacity style={commonStyles.button}>
                        <Text>Retake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={commonStyles.button}>
                        <Text>Done</Text>
                    </TouchableOpacity>
                </View>
        </>
    )
}

const styles = StyleSheet.create({
    controlsContainer:{
        flexDirection: 'row',
        justifyContent: "space-between"
    },

})


export default Photo;