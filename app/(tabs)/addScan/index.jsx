import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Stack, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ColorPicker from "react-native-wheel-color-picker";
import { useRoute, useNavigation } from "@react-navigation/native";
// import Popup from "../../../component/Popup";
// import commonStyles from "../../../style/common";
import axios from "axios"; 
import {POST} from "../../../utils/apis";

export default function addGarment() {
  const [selectedCategory, onChangeCategory] = useState("");
  const [selectedSeason, onChangeSeason] = useState([]);
  const [selectedOccasion, onChangeOccasion] = useState([]);
  const [size, onChangeSize] = useState(""); 
  const [selectedColours, onChangeColours] = useState([]); 
  const [pickedColour, onChangePickedColour] = useState("");
  const [showColourPicker, setShowColourPicker] = useState(false);
  const [addedColours, onChangeAddedColours] = useState([]);
  const [brand, onChangeBrand] = useState(""); 
  const [price, onChangePrice] = useState(""); 
  const [remarks, onChangeRemarks] = useState("");
  const [garmentImg, onChangeGarmentImg] = useState(null);
  const [labelImg, onChangeLabelImg] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      if (route.params.cfmGarmentImg) {
        const {cfmGarmentImg} = route.params;
        onChangeGarmentImg(cfmGarmentImg);
      }
  
      if (route.params.importGarmentImg) {
        const {importGarmentImg} = route.params;
        onChangeGarmentImg(importGarmentImg);
      }

      if (route.params.cfmLabelImg) {
        const {cfmLabelImg} = route.params;
        onChangeLabelImg(cfmLabelImg);
      }
  
      if (route.params.importLabelImg) {
        const {importLabelImg} = route.params;
        onChangeLabelImg(importLabelImg);
      }
    }
  }, [route.params]);
  
  let categoryBtnList = ["Top", "Outerwear", "Pants", "Overall", "Dress", "Skirt", "Other"]; 

  const categoryList = () => {
    return (
      <View style={styles.btnRow}>
        {categoryBtnList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedCategory.includes(item) ? styles.selectedBtn : null,
            ]}
            onPress={() => handlecategoryBtn(item)}
          >
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };  

  const handlecategoryBtn = (item) => {
    if (selectedCategory === item) {
      onChangeCategory("");
    } else {
      onChangeCategory(item);
    }
  };

  let seasonBtnList = ["Spring", "Summer", "Autumn", "Winter"]; 

  const seasonList = () => {
    return (
      <View style={styles.btnRow}>
        {seasonBtnList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedSeason.includes(item) ? styles.selectedBtn : null,
            ]}
            onPress={() => handleSeasonBtn(item)}
          >
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const handleSeasonBtn = (item) => {
    if (selectedSeason.includes(item)) {
      onChangeSeason(selectedSeason.filter((selectedItem) => selectedItem !== item));
    } else {
      onChangeSeason([...selectedSeason, item]);
    }
  };  

  let occasionBtnList = ["Casual", "Formal", "Work", "Sports", "Outdoor", "Other"]; 
  
  const occasionList = () => {
    return (
      <View style={styles.btnRow}>
        {occasionBtnList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedOccasion.includes(item) ? styles.selectedBtn : null,
            ]}
            onPress={() => handleOccasionBtn(item)}
          >
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleOccasionBtn = (item) => {
    if (selectedOccasion.includes(item)) {
      onChangeOccasion(selectedOccasion.filter((selectedItem) => selectedItem !== item));
    } else {
      onChangeOccasion([...selectedOccasion, item]);
    }
  };

  let colourBtnList = [
    "#FFFFFF", // white
    "#808080", // grey
    "#000000", // black
    "#572828", // brown
    "#EFE8C7", // beige
    "#FF0000", // red
    "#FFC0CB", // pink
    "#FFA500", // orange
    "#FFFF00", // yellow
    "#228B22", // green
    "#3360D5", // dark blue
    "#CFE8F6", // light blue
    "#843990" // purple
  ]

  const handleColourPickerBtn = () => {
    setShowColourPicker(!showColourPicker);
  };

  const colourList = () => {
    const handleResetColours = () => {
      onChangeColours([]);
    };

    return (
      <>
        <View style={styles.btnRow}>
          {colourBtnList.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.colourBtn,
                {backgroundColor: item},
                selectedColours.includes(item) ? {borderWidth: 4, borderColor: "#C3B1E1"} : null,
              ]}
              onPress={() => handleColourBtn(item)}
            ></TouchableOpacity>
          ))}

          {addedColours.map((colour, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colourBtn, 
                {backgroundColor: colour}, 
                selectedColours.includes(colour) ? {borderWidth: 4, borderColor: "#C3B1E1"} : null,
              ]}
              onPress={() => handleColourBtn(colour)}
            ></TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.colourBtn,
              {backgroundColor: "#FFF"},
              // selectedColours.includes(pickedColour) ? {backgroundColor: pickedColour, borderWidth: 4, borderColor: "#C3B1E1"} : null,
            ]}
            onPress={() => {
              // handleColourBtn(pickedColour);
              handleColourPickerBtn();
            }}
          >
            {showColourPicker ? (
              <AntDesign name="up" size={16} color="#333" />
            ) : (
              <AntDesign name="plus" size={16} color="#333" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.resetBtn}
          onPress={handleResetColours}
        >
          <Text style={styles.btnText}>Unselect All Colours</Text>
        </TouchableOpacity>

        {showColourPicker && (
          <>
            <ColorPicker
                sliderComponent={Slider}
                onColorChange={(pickedColour) =>
                  onChangePickedColour(pickedColour)
              }
            />
            <TouchableOpacity style={styles.addNewColourBtn} onPress={handleAddColour}>
              <Text>Add</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  };

  const handleColourBtn = (item) => {
    if (item === "") {
      return;
    }
    if (selectedColours.includes(item)) {
      onChangeColours(selectedColours.filter((selectedItem) => selectedItem !== item));
    } else {
      onChangeColours([...selectedColours, item]);
    }
  };

  const handleAddColour = () => { 
    if (pickedColour !== "") {
      onChangeAddedColours([...addedColours, pickedColour]);
      onChangePickedColour("");
    }
  };

  const handleSave = async() => {
    const formData = {
      category: selectedCategory,
      season: selectedSeason,
      occasion: selectedOccasion,
      size: size, 
      colour: selectedColours,
      brand: brand,
      price: price,
      remarks: remarks,
      labelImg: labelImg, 
      garmentImg: garmentImg, 
    };

    // const formData = new FormData();
    // add other fields to the form
    // formData.append("garmentImg", garmentImg);
    // formData.append("labelImg", labelImg);
    
    await axios.post(POST?.ADDGARMENT,formData,{ headers: { 'Content-Type': 'multipart/form-data' }})   
    .then((res)=>{
      if(res.data.success){
        console.log(res.data.message);
        //other logic
      }
      else{
        console.log("Add garment failed",res.data.message);
      }
    })
    .catch((err)=>{
        console.log("API call failed")
        console.log(err);
    })

    // console.log(selectedData); 
    // console.log(JSON.stringify(selectedData)); 

    onChangeCategory("");
    onChangeSeason([]);
    onChangeOccasion([]);
    onChangeSize("");
    onChangeColours([]);
    onChangePickedColour("");
    setShowColourPicker(false); 
    onChangeAddedColours([]); 
    onChangeBrand("");
    onChangePrice("");
    onChangeRemarks("");
    onChangeGarmentImg(null); 
    onChangeLabelImg(null); 
  };

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <Stack.Screen options={{headerShown:false}} />
        <View style={styles.container}>

          <View style={styles.addBtnRow}>
            <TouchableOpacity
              style={[
                styles.addBtn,
                garmentImg ? styles.addedImg : null,
              ]}
              onPress={() => navigation.navigate("garmentCamera")}
            >
              {garmentImg ? (
                <AntDesign name="check" size={16} color="#333" />
              ) : (
                <AntDesign name="skin" size={16} color="#333" />
              )}
              {garmentImg ? (
                <Text style={styles.addBtnText}> Image Added</Text>
              ) : (
                <Text style={styles.addBtnText}> Add Image</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.addBtn,
                labelImg ? styles.addedImg : null,
              ]}
              onPress={() => navigation.navigate("labelCamera")}
            >
              {labelImg ? (
                <AntDesign name="check" size={16} color="#333" />
              ) : (
                <AntDesign name="tago" size={16} color="#333" />
              )}
              {labelImg ? (
                <Text style={styles.addBtnText}> Label Added</Text>
              ) : (
                <Text style={styles.addBtnText}> Add Label</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Category</Text>
          {categoryList()}

          <Text style={styles.title}>Season</Text>
          {seasonList()}

          <Text style={styles.title}>Occasion</Text>
          {occasionList()}

          <Text style={styles.title}>Size</Text>
          <TextInput style={styles.input} onChangeText={onChangeSize} value={size} />

          <Text style={styles.title}>Colour</Text>
          {colourList()}

          <Text style={styles.title}>Brand</Text>
          <TextInput style={styles.input} onChangeText={onChangeBrand} value={brand} />

          <Text style={styles.title}>Price</Text>
          <TextInput style={styles.input} onChangeText={onChangePrice} value={price} keyboardType="numeric" />

          <Text style={styles.title}>Remarks</Text>
          <TextInput 
            multiline={true} 
            style={[styles.input, {height: 100}, {borderRadius: 25}]} 
            onChangeText={onChangeRemarks} 
            value={remarks} />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <AntDesign name="save" size={16} color="#333" />
            <Text style={styles.saveBtnText}> Save</Text>
          </TouchableOpacity>

          {/* <Popup
            popover={
              <ColorPicker
                sliderComponent={Slider}
                onColorChange={(selectedColours) =>
                  onChangeColours(selectedColours)
                }
              />
            }
            withPointer={true}
            width={Dimensions.get("window").width - 20}
            backgroundColor={"rgba(0,0,0,0.5)"}
            height={400}
            padding={20}

          >
            <Text>Testing button here</Text>
          </Popup> */}

        </View>
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
    borderColor: '#333', 
    width: ((Dimensions.get('window').width - 40) / 2 ) - 15, 
    height: 35, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#333',
    fontSize: 14,
  },
  addedImg: {
    borderWidth: 3, 
    borderColor: '#8AD38A',
    backgroundColor: '#AFE1AF', 
  }, 
  btnRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#333', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 5,
    marginLeft: 5,
    height: 35, 
    minWidth: ((Dimensions.get('window').width - 40) / 4 ) - 5 - 5,
  },
  resetBtn: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#333', 
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 2, 
    marginBottom: 8,
    marginLeft: 8, 
    marginRight: 8, 
    height: 35, 
    width: 180, 
  },
  addNewColourBtn: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#333', 
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16, 
    marginBottom: 8,
    marginLeft: 8, 
    marginRight: 8, 
    height: 35, 
    width: 180, 
  }, 
  selectedBtn: {
    borderWidth: 3, 
    borderColor: '#C3B1E1',
    backgroundColor: '#DFD6EF', 
  }, 
  btnText: {
   color: '#333',
    fontSize: 13,
    textAlign: 'center',
  },
  input: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#333',
    height: 35, 
    padding: 10,
    marginTop: 10,
    marginBottom: 8,
    marginHorizontal: 4,
  },
  colourBtn: {
    borderRadius: 100, 
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    minWidth: ((Dimensions.get('window').width - 40) / 7) - 8 - 8,
    minHeight: ((Dimensions.get('window').width - 40) / 7) - 8 - 8,
  }, 
  saveBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#333', 
    height: 45, 
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