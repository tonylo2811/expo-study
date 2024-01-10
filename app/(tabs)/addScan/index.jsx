import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Link, router, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

const addScan = () => {

  return (
    <>
      <View >
        <Text>Add Clothes / Scan Tag</Text>

        <Link href={"/addScan/scanTag"}>
          <Text>Scan Tag</Text>
        </Link>

        <Link href={"/addScan/camera"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text>Camera ?</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/addScan/h"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text>H - index.tsx</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/addScan/updatedVersion"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text>H - updatedVersion.tsx</Text>
          </TouchableOpacity>
        </Link>
        
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
