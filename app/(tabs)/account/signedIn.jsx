import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { Stack, useNavigation, useRouter, useLocalSearchParams} from "expo-router";
import axios from 'axios';
import {AUTH, GET, POST} from '../../../utils/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userInfo = () => {
  const [imgIdList, setImgIdList] = useState([]);
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const {userID,userName} = params;//get params from login || signup success
  
  const getData = async () => {
    //test function for getting data from async storage
    try {
      await AsyncStorage.getItem('imageKey')
        .then((jsonValue) => {
          let idList = []
          console.log('getting data',jsonValue)
          jsonValue = JSON.parse(jsonValue)
          for (let i = 0; i < jsonValue.length; i++) {
            console.log(jsonValue[i]._id)
            idList.push(jsonValue[i]._id)
          }
          setImgIdList(idList);
          console.log('idList length',idList.length)
        })
        .catch((err) => {
          console.log(err);
        }); 
    }
    catch(e) {
      console.log(e);
    }
  }

  const getImgList = async() => {
    //get garment id list from user id and store to async storage
    //hardcode value for now due to DB issue(created garment data with wrong user id)
    // await axios.get(`${GET?.GETIMGLIST}/6597e7ee84de12c962b23d39`)
    await axios.get(`${GET?.GETIMGLIST}/${userID}`)
      .then(async(res) => {

        let idList = res?.data?.data;
        setImgIdList(idList);
        
        try{
          console.log('storing data')
          const jsonValue = JSON.stringify(idList)
          await AsyncStorage.setItem('imageKey', jsonValue)
        }catch(e){
          console.log(e);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  }
  
  const logout = async () => {
    try{
      await AsyncStorage.removeItem('imageKey')
      router.replace({pathname:'/account/'})
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    navigation.setOptions({ headerShown:false,title: "Account" })
    getImgList();
  }, []);

  return (
    <>
      <View style={styles.mainCanvas}>
        <Button title='fetch data' onPress={getImgList}/>
        <Button title='show data' onPress={getData}/>
        <Text style={styles.nameTag}>Hello, {userName}!</Text>
        <Text style={styles.nameTag}>You have {imgIdList.length} garments</Text>
        <Pressable onPress={logout} style={({ pressed }) => [
                          {backgroundColor: pressed ? 'black' : 'transparent'},
                          styles.actionBtn]}>
          <Text style={styles.btnText}>Sign Out</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameTag: {
    fontSize: 24,
    alignSelf:'flex-start',
    fontWeight: 'bold',
  },
  mainCanvas:{
    paddingTop: 100,
    paddingLeft:30,
    paddingRight:30,
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    position: "relative",
  },
  actionBtn:{
    height:'auto',
    width:'100%',
    borderWidth:3,
    marginTop:20,
    color:"black",
    borderRadius:50,
    overflow:'hidden',
  },
  btnText:{
    textAlign:'center',
    fontWeight:"bold",
    color:"black",
    paddingBottom:3,
    fontSize:18,
  },
});

export default userInfo;
