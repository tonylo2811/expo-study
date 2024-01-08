import { Text, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
const account = () => {
  return (
    <>
    <Stack.Screen options={{ headerShown:false,title: "Account" }} />
      <View>
        <Text>Login / User Account Info  page</Text>
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
});

export default account;
