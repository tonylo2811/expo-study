import { Text, View, StyleSheet ,TextInput, Button, ScrollView, Pressable, Keyboard} from "react-native";
import { Stack, Link, router} from "expo-router";
import React, { useState} from "react";
import axios from "axios";
import { AUTH } from "../../../utils/apis";
import Toast from 'react-native-toast-message';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const account = () => {
  const [loginEmail, onChangeLoginEmail] = useState('');
  const [loginPW, onChangeLoginPW] = useState('');

  const login = () => {
    console.log("logging in");
    if (!loginEmail || !loginPW) {
      console.log("missing fields");
      return;
    }

    let body={
      email:loginEmail,
      password:loginPW
    }

    axios.post(AUTH?.LOGIN,body)
      .then((res)=>{
        if (res.data.success) {
          //login success
          Toast.show({
            type:'success',
            text1: 'Login Success',
            position:'top',
            autoHide:true,
            visibilityTime:1500,
            onHide:()=>{
              router.replace({pathname:'/account/signedIn/',
                          params:{userID:res.data.id, userName:res.data.username}})
              //fetch user data and save to json
            }
          })
        }else{
          //login failed, error message defined in backend
          Toast.show({
            type:'error',
            text1: res.data.message,
            position:'top',
            autoHide:true,
            visibilityTime:1500,
            onHide:()=>{
              onChangeLoginEmail('');
              onChangeLoginPW('')},
          })
        }
        console.log(res.data.message);
      })
  }

  return (
    <>
    <Stack.Screen options={{ headerShown:false,title: "Account" }} />
      <View style={styles.mainCanvas}>
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.signInForm}>
              <Text>Test: testing2@testmail.com, 9999</Text>
              
              <Text style={styles.title}>Sign In</Text>
              <View style={styles.formBody}>
                <Text style={styles.textTitle}>Email</Text>
                <TextInput 
                  style={styles.textfield} 
                  onChangeText={onChangeLoginEmail}
                  value={loginEmail}
                  placeholder="xxxxxxx@email.com" />

                <Text style={styles.textTitle}>Password</Text>
                <TextInput 
                  style={styles.textfield}
                  secureTextEntry={true}
                  onChangeText={onChangeLoginPW}
                  value={loginPW}
                  placeholder="Password" />

                {/* Button still available when keyboard is up, need to pair with 'keyboardShouldPersistTaps'*/}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <Pressable onPress={login} style={({ pressed }) => [
                          {backgroundColor: pressed ? 'black' : 'transparent'},
                          styles.actionBtn]}>
                    <Text style={styles.btnText}>Sign In</Text>
                  </Pressable>
                </TouchableWithoutFeedback>

                <Link style={styles.signupBtn} href={"/account/signup"}>
                  <Text >Sign up</Text>
                </Link>
              
              </View>{/* formBody end*/}
            </View>{/* Sign In form end*/}
        </ScrollView>
      </View>
      <Toast swipeable={true}/>
    </>
  );
};

const styles = StyleSheet.create({
  mainCanvas:{
    height: "100%",
    backgroundColor: "#fff",
  },
  signInForm: {
    paddingTop: 100,
    paddingLeft:30,
    paddingRight:30,
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    position: "relative",
  },
  title:{
    fontWeight: "bold",
    fontSize:40,
    alignSelf:'flex-start'
  },
  formBody:{
    margin:10,
    width: "100%",
  },
  textTitle:{
    fontSize:15,
    paddingTop:10,
    paddingBottom:2,
  },
  textfield:{
    height:40,
    width:"100%",
    borderWidth:3,
    padding:10,
    borderColor:"black",
    borderRadius:50,
    alignSelf:'flex-start'
  },
  actionBtn:{
    height:'auto',
    width:'auto',
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
  signupBtn:{
    paddingTop:20,
    backgroundColor: "white",
    alignSelf: 'flex-end',
    fontSize:15,
    fontWeight:"bold",
    textDecorationLine:"underline"
  }
});

export default account;
