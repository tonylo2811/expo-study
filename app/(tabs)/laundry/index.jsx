import { Text, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
const laundry = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown:false,title: "Laundry" }} />
      <View>
        <Text>Laundry Recommendation page</Text>
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

export default laundry;
