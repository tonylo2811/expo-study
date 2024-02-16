import { Text, View, StyleSheet ,TextInput, Button, ScrollView, Pressable, Keyboard,TouchableOpacity} from "react-native";
import { Stack ,router} from "expo-router";
import React, { useState } from "react";
import axios from "axios";
import { AUTH } from "../../../utils/apis";
import Toast from "react-native-toast-message";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const signUp = () =>{
  const [regName, onChangeRegName] = useState('');
  const [regPW, onChangeRegPW] = useState('');
  const [email, onChangeEmail] = useState('');
  const [confirmRegPW, onChangeConfirmRegPW] = useState('');

  const register = () => {
    console.log("registering");
    if (!regName || !email || !regPW || !confirmRegPW) {
      console.log("missing fields");
      Toast.show({
        type:'error',
        text1: `${regName==''?'Username':email==''?'Email':regPW==''?'Password':'Confirm Password'} is required`,
        position:'top',
        autoHide:true,
        visibilityTime:1500,
      })
      return;
    }
    if (regPW != confirmRegPW) {
      console.log("passwords don't match");
      Toast.show({
        type:'error',
        text1: `Passwords don't match`,
        position:'top',
        autoHide:true,
        visibilityTime:1500,
      })
      return;
    }
    let body={
      username:regName,
      email:email,
      password:regPW,
      confirm_password:confirmRegPW
    }
    axios.post(AUTH?.REGISTER,body)
      .then((res)=>{
        if (res.data.success) {
          console.log(res.data.id)
          console.log(res.data.username)
          //backend return user id and name, pass to userInfo as props
          Toast.show({
            type:'success',
            text1: res.data.message,
            position:'top',
            autoHide:true,
            visibilityTime:1500,
            onHide:()=>{
              router.replace({pathname:'/account/signedIn/',
                          params:{userID:res.data.id, userName:res.data.username}})
              //fetch user data and save to jso
            }
          })
        }else{
          Toast.show({
            type:'error',
            text1: res.data.message,
            position:'top',
            autoHide:true,
            visibilityTime:1500,
          })
        }
      })
  }

  return (
    <>
      <View style={styles.mainCanvas}>
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.signUpForm}>
              <Text style={styles.title}>Sign Up</Text>
                <View style={styles.formBody}>

                  <Text style={styles.textTitle}>Username:</Text>
                  <TextInput 
                    style={styles.textfield} 
                    onChangeText={onChangeRegName}
                    value={regName}
                    placeholder="Username" />
                  
                  <Text style={styles.textTitle}>Email:</Text>
                  <TextInput 
                    style={styles.textfield} 
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="user@email.com" />

                  <Text style={styles.textTitle}>Password:</Text>
                  <TextInput 
                    style={styles.textfield}
                    secureTextEntry={true}
                    onChangeText={onChangeRegPW}
                    value={regPW}
                    placeholder="Password" />
                  
                  <Text style={styles.textTitle}>Confirm Password:</Text>
                  <TextInput 
                    style={styles.textfield} 
                    secureTextEntry={true}
                    onChangeText={onChangeConfirmRegPW}
                    value={confirmRegPW}
                    placeholder="Enter the Password again" />
                  
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Pressable onPress={register} 
                        style={({ pressed }) => [
                          {backgroundColor: pressed ? 'black' : 'transparent'},
                          styles.actionBtn]}>
                      <Text style={styles.btnText}>Sign Up</Text>
                    </Pressable>
                  </TouchableWithoutFeedback>

                </View>
            </View>
        </ScrollView>
      </View>
      <Toast swipeable={true}/>
    </>
  );
}

const styles = StyleSheet.create({
  mainCanvas:{
    height: "100%",
    backgroundColor: "#fff",
  },
  signUpForm: {
    paddingTop: 50,
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
    // color:"black",
    paddingBottom:3,
    fontSize:18,
  },
});

export default signUp;