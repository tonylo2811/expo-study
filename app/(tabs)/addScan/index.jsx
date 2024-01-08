import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Link, router, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

const addScan = () => {

  return (
    <>
      <Stack.Screen options={{ headerShown:false, title: "Add Clothes" }} />
      {/* <Stack.Screen options={{ headerShown:false, title: "Camera Page" }} /> */}
      <View >
        <Text>Add Clothes / Scan Tag</Text>
        {/* <Button title="Scan Tag" onPress={() => router.push("/addScan/scanTag")} /> */}
        <Link href={"/addScan/scanTag"}>
          <Text>Scan Tag</Text>
        </Link>

        <Link href={"/addScan/camera"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text>Camera ?</Text>
          </TouchableOpacity>
        </Link>



        
        <StatusBar style="auto" />

      </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio:{
    flex: 1,
    aspectRatio: 1
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default addScan;
