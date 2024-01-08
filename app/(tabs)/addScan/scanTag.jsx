import { Text, View } from "react-native";
import { Link, router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const scanTag = () => {
  return (
    <>
    <Stack.Screen options={{ headerShown:false,title: "Scan Tag" }} />
      <View>
        <Text>Scan Tag Page, sub page of Add/Scan</Text>
      </View>
      <StatusBar style="auto" />
    </>
  );
}

export default scanTag;