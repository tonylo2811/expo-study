import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Stack, Link } from "expo-router";
import { Camera, CameraType } from "expo-camera"; 
import { useState, useRef } from "react"; 
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
// import { previewImg } from "./previewImg";

export default function garmentCamera() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const navigation = useNavigation();
    const cameraRef = useRef(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
        <View style={styles.msgContainer}>
            <Text style={styles.msgText}>This app would like to access the camera.</Text>
            <TouchableOpacity style={styles.msgBtn} onPress={requestPermission}>
                <Text style={styles.msgBtnText}>Allow</Text>
            </TouchableOpacity>
        </View>
        );
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePic = async () => {
        if (cameraRef.current) {
          const {uri} = await cameraRef.current.takePictureAsync();
          navigation.push("previewImg", {garmentImgUri: uri});
        }
    };

    const importImg = () => {
        (async () => {
          const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Unable to access photos. Please enable access.");
            return;
          }
      
          let img = await ImagePicker.launchImageLibraryAsync( {
                base64: true, 
            });

          if (!img.canceled) {
            navigation.navigate("index", {importGarmentImg: img.assets[0].base64});
          }
        })();
    };

    return(
        <>
            <Stack.Screen options={{headerShown:true, title: "Camera"}} />
            <View style={styles.container}>

                <Camera style={styles.camera} type={type} autoFocus={Camera.Constants.AutoFocus.on} ref={cameraRef}>
                </Camera>

            </View>

            <View style={styles.ctrlContainer}>
                <TouchableOpacity style={[styles.cameraBtn, {width: 45, height: 45}]} onPress={toggleCameraType}>
                        <AntDesign name="sync" size={18} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cameraBtn} onPress={takePic}>
                    <AntDesign name="camera" size={25} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.cameraBtn, {width: 45, height: 45}]} onPress={importImg}>
                    <AntDesign name="picture" size={18} color="#333" />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    msgContainer: {
        flex: 1, 
        padding: 20, 
        justifyContent: 'center',
        backgroundColor: '#FFF', 
    },
    msgText: {
        fontSize: 16,
        textAlign: 'center', 
    }, 
    msgBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    msgBtn: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#333', 
        height: 45, 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginHorizontal: 50,
    },
    container: {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: '#FFF', 
    },
    camera: {
        flex: 1,
    },
    ctrlContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF', 
        height: 100, 
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    cameraBtn: {
        backgroundColor: '#DFD6EF', 
        borderColor: '#C3B1E1', 
        borderWidth: 2, 
        borderRadius: 100, 
        width: 60, 
        height: 60,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 35,
        marginLeft: 35,
    }, 
}); 