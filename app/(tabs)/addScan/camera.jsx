import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, Dimensions, Image } from "react-native";
import { Link, router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Camera } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";

const cameraPage = () => {


    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);


    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            console.log(data.uri)
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
                        type={type}
                        autoFocus={true}
                        />

                    <TouchableOpacity
                        style={styles.flipButton}
                        onPress={() => {
                            console.log("Testing button clicked")
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text>Flip Button</Text>
                    </TouchableOpacity>

                </View>

                <Button title="Take Picture" onPress={() => takePicture()} />

                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}


            </View>
        </>

    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
        position: "relative",
        backgroundColor: "#f7daf5"
    },
    cameraRatio: {
        flex: 1,
        aspectRatio: 0.75
        // width: Dimensions.get('window').width - 100,
        // height: Dimensions.get('window').height - 100
        // width: 200,
        // height: 200
    },
    flipButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 2,

    },

});

export default cameraPage;
