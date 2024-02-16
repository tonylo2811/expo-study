import { View, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import { Stack, Link } from "expo-router";
import { Camera, CameraType } from "expo-camera"; 
import { useState } from "react"; 
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Svg, Defs, Rect, Mask, Text } from 'react-native-svg';

export default function labelCamera() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const navigation = useNavigation();
    let cameraRef = null;

    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const squareWidth = screenWidth * 0.6;
    const squareY = screenHeight / 5;

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
        if (cameraRef) {
          const {uri} = await cameraRef.takePictureAsync();
          navigation.navigate("previewLabelImg", {labelImgUri: uri});
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
            navigation.navigate("index", {importLabelImg: img.assets[0].base64});
          }
        })();
    };

    return(
        <>
            <Stack.Screen options={{headerShown:true, title: "Camera"}} />
            <View style={styles.container}>

                <Camera style={styles.camera} type={type} autoFocus={Camera.Constants.AutoFocus.on} ref={(ref) => (cameraRef = ref)}>
                    <Svg height="100%" width="100%">
                        <Defs>
                            <Mask id="mask" x="0" y="0" height="100%" width="100%">
                                <Rect height="100%" width="100%" fill="#FFF" />
                                {/* <Rect x="50%" y="50%" width="180" height="180" fill="#000" transform="translate(-90,-90)" /> */}
                                <Rect 
                                    x={(screenWidth - squareWidth) / 2}
                                    y={squareY}
                                    width={squareWidth}
                                    height={squareWidth}
                                    fill="#000"
                                />
                            </Mask>
                        </Defs>
                        <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.7)" mask="url(#mask)" fill-opacity="0" />
                        
                        <Text 
                            x="50%" 
                            y={screenHeight / 8} 
                            textAlign="center" 
                            textAnchor="middle" 
                            fill="white" 
                            fontSize="12"
                        >
                            Please place all the label symbols within the square. 
                        </Text>
                    </Svg>
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
    svgContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
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