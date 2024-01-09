import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, Dimensions, Image } from "react-native";
import { Link, router, Stack } from "expo-router";
import { Camera } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";


import Icon from '../../../component/Icon';

const cameraPage = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);


    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <>
            {/* <Stack.Screen options={{ headerShown: false, title: "CameraPage" }} /> */}
            <View style={styles.pageContainer}>

                <View style={styles.cameraContainer}>
                    <Camera
                        ref={ref => setCamera(ref)}
                        style={styles.cameraRatio}
                        type={cameraType}
                        autoFocus={true}
                    />
                </View>


                <View style={styles.controlsContainer}>
                    <Icon
                        name='camera'
                        width="50"
                        height="50"
                        onPress={()=>{takePicture()}}
                        style={styles.cameraButton}
                    />

                    <Icon
                        name='flip'
                        width="50"
                        height="50"
                        style={styles.flipButton}
                        onPress={()=>{
                            setCameraType(
                                cameraType === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            )
                        }}
                    />
                </View>

                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}


            </View>
            
        </>

    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#000",
        // alignItems: "center",
        justifyContent: 'center'
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'col',
        position: "relative",
        backgroundColor: "#f7daf5"
    },
    cameraRatio: {
        flex: 1,
        aspectRatio: 0.75
    },
    controlsContainer: {
        backgroundColor: "#d4a8f9",
        flexDirection: "row",
        justifyContent: "space-between", // Update this line to add space between buttons
        padding: 16,
    },

    cameraButton: {
        alignSelf: "center", // Align the button in the center vertically
    },

    flipButton: {
        alignSelf: "flex-end", // Align the button to the right side
    },

});

export default cameraPage;
