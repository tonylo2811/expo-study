import React from "react";
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Stack, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

export default function previewImg() {
    const route = useRoute();
    const {garmentImgUri} = route.params;
    const navigation = useNavigation();

    const convertBase64 = async (imgUri) => {
        const file = await FileSystem.getInfoAsync(imgUri);
        const base64Img = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return base64Img;
    };

    return (
        <>
            <Stack.Screen options={{headerShown:true, title: "Preview"}} />
            <View style={styles.container}>
                <Image style={styles.img} source={{uri: garmentImgUri}} />
            </View>

            <View style={styles.ctrlContainer}>
                <View style={styles.ctrlRow}>
                    <Link href="/addScan/garmentCamera" asChild>
                        <TouchableOpacity style={styles.cfmBtn}>
                            <AntDesign name="close" size={16} color="#333" />
                            <Text style={styles.cfmBtnText}> Retake</Text>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity 
                        style={styles.cfmBtn}
                        onPress={async () => {
                            const cfmGarmentImg = await convertBase64(garmentImgUri);
                            navigation.navigate("index", {cfmGarmentImg});
                        }}
                    >
                        <AntDesign name="check" size={16} color="#333" />
                        <Text style={styles.cfmBtnText}> Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF', 
    },
    img: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
    ctrlContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF', 
        height: 100, 
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    ctrlRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    cfmBtn: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#333', 
        height: 35, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginLeft: 22,
        marginRight: 22,
      },
    cfmBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});