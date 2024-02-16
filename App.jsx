////////////////////////////////////////////////////
//this page is deprecated, use app/index.jsx instead
////////////////////////////////////////////////////

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { StatusBar } from 'expo-status-bar';
import React ,{ useEffect, useState }from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import axios from 'axios';
import {AUTH, GET, POST} from './utils/apis';

export default function App() {
  const [getresponse, setGetResponse] = useState('');
  const [postresponse, setPostResponse] = useState('');
  const [authresponse, setAuthResponse] = useState('');

  const fetchData = async () => {
          console.log('fetching data');
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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello World</Text>
      <Text>Response from test get: {getresponse}</Text>
      <Text>Response from test post: {postresponse}</Text>
      <Text>Response from test auth: {authresponse}</Text>
      <Button title="fetch Data" onPress={fetchData}/>

      <Button title="go page 1"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
