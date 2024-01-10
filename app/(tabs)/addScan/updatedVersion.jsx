import { Text, View, Button, Pressable, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Dimensions} from "react-native";
import { Link, router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPicker, fromHsv } from "react-native-color-picker"; 
import Slider from "@react-native-community/slider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function App() {

  const [size, onChangeSize] = useState(''); 
  const [selectedColour, setSelectedColour] = useState('#FFFFFF'); 
  const [showColourPicker, setShowColourPicker] = useState(false); 
  const [brand, onChangeBrand] = useState(''); 
  const [price, onChangePrice] = useState(''); 
  const [remarks, onChangeRemarks] = useState('');

  const handleAddImg = () => {
    
  };
  
  const handleAddLabel = () => {
    
  };

  let categoriesBtnList = ["Top", "Outerwear", "Pants", "Overall", "Dress", "Skirt", "Other", "Other", "Other", "Other", "Other"]; 

  const categoriesList = () => {
    return (
    <View style={styles.btnRow}>
        {categoriesBtnList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleCategoriesBtn(item)}
          >
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
  )}; 

  const handleCategoriesBtn = () => {
    // handle cat
  };

  let seasonBtnList = ["Spring", "Summer", "Autumn", "Winter"]; 

  const seasonList = () => {
    return (
      <FlatList data={seasonBtnList} numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={handleSeasonBtn}>
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.btnRow} 
      />
  )}; 

  const handleSeasonBtn = () => {
    // handle season
  };

  let occasionBtnList = ["Casual", "Formal", "Work", "Sports", "Outdoor", "Other"]; 
  
  const occasionList = () => {
    return (
      <FlatList data={occasionBtnList} numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={handleOccasionBtn}>
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.btnRow}
      />
  )}; 

  const handleOccasionBtn = () => {
    // handle occasion
  };

  let colourBtnList = ["white", "grey", "black", "#572828", "#EFE8C7", "red", "pink", "orange", "yellow", "green", "#3360D5", "#B0D9F0", "#843990"]

  const handleColourPickerBtn = () => {
    setShowColourPicker(!showColourPicker);
  };

  const colourList = () => {
    return (
      <>
        <FlatList data={[...colourBtnList, 'picker']} numColumns={7}
          renderItem={({ item }) => item === 'picker' ? (
            <TouchableOpacity style={[styles.colourBtn, {backgroundColor: selectedColour}]} onPress={handleColourPickerBtn}>
              <AntDesign name="edit" size={16} color="#333" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.colourBtn, {backgroundColor: item}]} onPress={handleColourBtn}>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.btnRow}
        />
        {
        showColourPicker && (
          <ColorPicker
            sliderComponent={Slider}
            onColorChange={(selectedColour) => setSelectedColour(fromHsv(selectedColour))}
          />
        )}
      </>
    )
  }

  const handleColourBtn = () => {
    
  };

  const handleSave = () => {
    // handle save
  };

  return (
    <>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

            <View style={styles.addBtnRow}>
              <TouchableOpacity style={styles.addBtn} onPress={handleAddImg}>
                <AntDesign name="plus" size={16} color="#333" />
                <Text style={styles.addBtnText}> Add Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBtn} onPress={handleAddLabel}>
                <AntDesign name="plus" size={16} color="#333" />
                <Text style={styles.addBtnText}> Add Label</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.title}>Categories</Text>
              {categoriesList()}
            </View>

            {/* <View>
              <Text style={styles.title}>Season</Text>
              {seasonList()}
            </View>

            <View>
              <Text style={styles.title}>Occasion</Text>
              {occasionList()}
            </View>

            <View>
            <Text style={styles.title}>Size</Text>
              <TextInput style={styles.input} onChangeText={onChangeSize} value={Text} />
            </View>

            <View>
              <Text style={styles.title}>Colour</Text>
              {colourList()}
            </View> */}

            <View>
            <Text style={styles.title}>Brand</Text>
              <TextInput style={styles.input} onChangeText={onChangeBrand} value={Text} />
            </View>

            <View>
            <Text style={styles.title}>Price</Text>
              <TextInput style={styles.input} onChangeText={onChangePrice} value={Number} />
            </View>

            <View>
            <Text style={styles.title}>Remarks</Text>
              <TextInput multiline={true} style={[styles.input, {height: 100}, {borderRadius: 25}]} onChangeText={onChangeRemarks} value={Text} />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <AntDesign name="save" size={16} color="#333" />
                <Text style={styles.saveBtnText}> Save</Text>
              </TouchableOpacity>

        </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
    backgroundColor: '#FFF', 
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  addBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, 
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    height: 35, 
    borderColor: '#333', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  addBtnText: {
    color: '#333',
    fontSize: 14,
  },
  btnRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between', 
  },
  button: {
    // flex: 1, 
    // width: 80, 
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    height: 35, 
    borderColor: '#333', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // marginHorizontal: 4,
    marginRight: 4 ,
    marginLeft: 4,
    minWidth: (Dimensions.get('window').width / 4  )- 4 - 4 ,
    //Dimensions.get('window').width > 100% of the screen
    //The value will change when you tested in different devices since small or big phone ~
  },
  btnText: {
   color: '#333',
    fontSize: 13,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    height: 35, 
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    marginHorizontal: 4,
  },
  colourBtn: {
    flex: 1, 
    flexDirection: 'row',
    width: 35, 
    height: 35, 
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 8,
    marginHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  saveBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    height: 45, 
    borderColor: '#333', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 50,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});