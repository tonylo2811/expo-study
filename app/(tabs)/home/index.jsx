// temparary index page for starting development
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import axios from "axios";
import { AUTH, GET, POST } from "../../../utils/apis";
import { Link, router, Stack } from "expo-router";

export default function App() {
  const [getresponse, setGetResponse] = useState("");
  const [postresponse, setPostResponse] = useState("");
  const [authresponse, setAuthResponse] = useState("");

  const fetchData = async () => {
    console.log("fetching data");
    try {
      const getres = await axios.get(GET?.TESTGET);
      const postres = await axios.post(POST?.TESTPOST);
      const authres = await axios.get(AUTH?.TESTAUTH);
      console.log(getres.data.message);
      console.log(postres.data.message);
      console.log(authres.data.message);

      setGetResponse(getres.data.message);
      setPostResponse(postres.data.message);
      setAuthResponse(authres.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Stack.Screen options={{ headerShown:false,title: "Temp Home" }} />
      <View style={styles.container}>
        <Text>Index of home tab</Text>
        <Text>Hello World</Text>
        <Text>Response from test get: {getresponse}</Text>
        <Text>Response from test post: {postresponse}</Text>
        <Text>Response from test auth: {authresponse}</Text>
        <Button title="fetch Data" onPress={fetchData} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
