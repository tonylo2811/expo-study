import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image, Modal, ScrollView, TouchableWithoutFeedback} from "react-native";
import CheckBox from 'expo-checkbox';
import { Stack } from "expo-router";
import { SearchBar, Badge } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';
import {host} from '../../../utils/apis';

const laundry = () => {
  const [clothes, setClothes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  //const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Controls the modal visibility of the selected clothes
  const [suggestionModalVisible, setSuggestionModalVisible] = useState(false); // Controls the modal visibility of the washing suggestions
  const [collapsed, setCollapsed] = useState(true);
  //const [filteredData, setFilteredData] = useState(clothes);

  useEffect(() => {
    getData();
  }, []);
  const getData = ()  => {
    fetch(`${host}/api/garments`)
    .then((response) => response.json())
    .then((data) => setClothes(data.map(item => ({ ...item, isSelected: false }))))
    .catch((error) => console.error(error));
  };
  // Responsible for handling the checkbox state
  const handleCheckboxChange = (id, isSelected) => {
    const updatedClothes = clothes.map(item => {
      if (item._id === id) {
        return { ...item, isSelected: isSelected };
      } else {
        return item;
      }
    });
    setClothes(updatedClothes);
    if (isSelected) {
      const selectedItem = updatedClothes.find(item => item._id === id);
      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      setSelectedItems(selectedItems.filter(item => item._id !== id));
    }
  };
  // Handle the Next button press
  const handleNextPress = () => {
    setModalVisible(false); // Close the modal after go to Next page
    setSuggestionModalVisible(true);
  };
  const handleBackPress = () => {
    setModalVisible(true); 
    setSuggestionModalVisible(false);
  };

  const handleSelectAllPress = () => {
    const updatedClothes = clothes.map(item => ({ ...item, isSelected: true }));
    setClothes(updatedClothes);
    setSelectedItems(updatedClothes);
  };
  
  const handleClearPress = () => {
    const updatedClothes = clothes.map(item => ({ ...item, isSelected: false }));
    setClothes(updatedClothes);
    setSelectedItems([]);
  };

  const labelDescriptions = {
    "30C": "Wash it in maximum temperature of 30°C (86°F)",
    "40C": "Wash it in maximum temperature of 40°C (104°F)",
    "50C": "Wash it in maximum temperature of 50°C (122°F)",
    "60C": "Wash it in maximum temperature of 60°C (140°F)",
    "70C": "Wash it in maximum temperature of 70°C (158°F)",
    "95C": "Wash it in maximum temperature of 95°C (203°F)",
    "Bleach": "Able to Bleach it",
    "non_chlorine_belach": "Use non-chlorine bleach is allowed",
    "DN_Bleach": "Do not bleach",
    "Chorine bleach": "Use chlorine bleach is allowed",
    "DN_dry": "Do not dry",
    "DN_dry_clean": "Do not dry clean",
    "DN_iron": "Do not iron it",
    "DN_steam": "Do not steam it",
    "DN_tumble_dry": "Do not tumble dry it",
    "DN_wash": "Do not wash",
    "Dry_clean": "Able to Dry clean",
    "Dry_clean_petrol_only": "Dry clean with petrol only",
    "Dry_clean_any_solvent": "Dry clean with any solvent",
    "Dry_clean_any_solvent_execpt_trichloroethylene": "Dry clean with any solvent except trichloroethylene",
    "Dry_clean_low_heat": "Dry clean with low heat",
    "Dry_clean_no_steam":"Dry clean with no steam",
    "Dry_clean_short_cycle": "Dry clean with short cycle",
    "Dry_clean_reduced_moisture": "Dry clean with reduced moisture",
    "hand_wash": "Hand wash is allowed",
    "Steam": "Steam is allowed (Any Temperature)",
    "Wet_clean": "Wet clean is allowed",
    "Iron": "Iron is allowed (Any Temperature,Steam,Dry)",
    "iron_low":"Iron it in a temperature between 110°C (230°F) and 150°C (300°F)",
    "iron_medium":"Iron it in a temperature between 150°C (300°F) and 180°C (350°F)",
    "iron_high":"Iron it in a temperature between 180°C (350°F) and 210°C (410°F)",
    "machine_wash": "Machine wash is allowed",
    "machine_wash_permanent_press": "Machine wash with permanent press (Wash in medium speed with reduced time)",
    "machine_wash_delicate": "Machine wash with delicate (Wash in low speed with high levels of cold water)",
    "tumble_dry": "Tumble dry is allowed",
    "tumble_dry_normal": "Tumble dry in maximum temperature of 80°C (176°F)",
    "tumble_dry_low": "Tumble dry in in maximum temperature of 55°C (131°F)",
    "tumble_dry_medium": "Tumble dry in in maximum temperature of 70°C (158°F)",
    "tumble_dry_no_heat": "Tumble dry with no heat",
    "Wring": "Wring is allowed",
    "DN_wring": "Do not wring it",
    "shade_dry": "Dry the clothes in shade",
    "line_dry": "Dry the clothes in line",
    "line_dry_in_shade": "Dry the clothes in line and shade",
    "drip_dry": "Dry the clothes in drip",
    "dry_flat": "Dry the clothes in flat",
    "NoTemperatureLabel": "There is no temperature label on the clothes, please wash it in cold water",
  };

  const washingAlgorithms = () => {
    const temperatureLabels = ["30C", "40C", "50C", "60C", "70C", "95C"];
    const bleachLabels = ["Bleach", "non_chlorine_belach", "DN_Bleach","Chorine bleach"];
  
    // Initialize an object to store clothes grouped by care label
    const classifiedItems = {};
  
    // Iterate through each temperature label
    temperatureLabels.forEach((tempLabel) => {
      // Iterate through each bleach label
      bleachLabels.forEach((bleachLabel) => {
        // Create a key based on the combination of temperature and bleach labels
        const key = `${tempLabel}_${bleachLabel}`;
  
        // Filter clothes that match the current combination of temperature and bleach labels
        const matchingClothes = selectedItems.filter((item) =>
          item.labels.includes(tempLabel) && item.labels.includes(bleachLabel)
        );
  
        // Add the matching clothes to the corresponding bucket in the classifiedItems object
        if (matchingClothes.length > 0) {
          classifiedItems[key] = matchingClothes;
        }
      });
    });
    // Filter clothes without a temperature label
    const clothesWithoutTempLabel = selectedItems.filter(
      (item) =>
        !item.labels.some((label) => temperatureLabels.includes(label)) &&
        item.labels.some((label) => bleachLabels.includes(label))
    );
  
    // Add clothes without a temperature label to the 'NoTemperatureLabel' bucket
    if (clothesWithoutTempLabel.length > 0) {
      classifiedItems["NoTemperatureLabel"] = clothesWithoutTempLabel;
    }

    return classifiedItems;
  };

  const getLabelDescriptionsByCategory = (items, category) => {
    const labelCategoryMap = {
      "pre-wash": ["30C", "40C", "50C", "60C", "70C", "95C", "Bleach", "non_chlorine_belach", "DN_Bleach"],
      "post-wash": Object.keys(labelDescriptions).filter(label => !["30C", "40C", "50C", "60C", "70C", "95C", "Bleach", "non_chlorine_belach", "DN_Bleach"].includes(label)),
    };
  
    const labelDescriptionsByCategory = {};
  
    // Iterate through each item in the group
    items.forEach((item) => {
      // Iterate through labels of the current item
      item.labels.forEach((label) => {
        // Check if the label is in the specified category
        if (labelCategoryMap[category].includes(label)) {
          if (!labelDescriptionsByCategory[label]) {
            labelDescriptionsByCategory[label] = labelDescriptions[label];
          }
        }
      });
    });
  
    // Convert labelDescriptionsByCategory object to an array of [label, description] pairs
    return Object.entries(labelDescriptionsByCategory);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown:false,title: "Laundry" }} />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={handleSelectAllPress}>
            <Text style={styles.buttonText}>Select All</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleClearPress}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          data={clothes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
          <View style={styles.flatStyle}>  
            <View style={styles.itemContainer}>
              <Text>ID: {item._id}</Text> 
              <Text>Owner: {item.owner}</Text>
              <Text>Category: {item.categories}</Text>
              <Text>Price: {item.price}</Text>
              <Text>Season: {item.season.join(", ")}</Text>
              <Text>Occasion: {item.occasion.join(", ")}</Text>
              <Text>Colour: {item.colour.join(", ")}</Text>
              <Text>Brand: {item.brand}</Text>
              <Text>Label: {item.labels.join(", ")}</Text>
              <Text>Image: </Text>
              <Image
                style={styles.image}
                source={{ uri: `data:image/jpeg;base64,${item.image}` }}
              />
            </View>
            <View style={styles.checkbox}>
            <CheckBox 
              value={item.isSelected}
              onValueChange={isSelected => handleCheckboxChange(item._id, isSelected)}
            />
            </View>
          </View>
          )}
        />
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.iconContainer}>
              <Badge value={selectedItems.length} status="error" containerStyle={styles.badgeContainer} />
              <View style={styles.iconFrame}>
                <FontAwesome5 name="tshirt" size={30} color="#009688" />
              </View>
        </View>
        </TouchableWithoutFeedback>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.titleText}>Selected Clothes</Text>
              <ScrollView>
              {selectedItems.map((item, index) => (
              <View key={index}>
                <Image
                style={styles.image}
                source={{ uri: `data:image/jpeg;base64,${item.image}` }}
              />
              {item.labels && <Text>Label: {item.labels.join(", ")}</Text>}
              {item.colour && <Text>Colour: {item.colour}</Text>}
              </View>
              ))}
              </ScrollView>
      <View style={styles.buttonContainer}>          
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleNextPress}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableWithoutFeedback>
      </View>
            </View>
          </View>
        </Modal>

      <Modal 
      animationType="slide"
      transparent={true}
      visible={suggestionModalVisible} 
      onRequestClose={() => setSuggestionModalVisible(false)}>
      <View style={[styles.centeredView,{width: '100%'}]}>
        <View style={[styles.modalView, {width: '100%'}]}>
          <Text style={styles.titleText}>Washing Suggestions</Text>
          <ScrollView>
  <View>
    {Object.entries(washingAlgorithms()).map(([label, items], index) => (
      <View key={label} style={styles.result}>
        <Text style={styles.laundryText}>Laundry Bucket {index+1}</Text>
        <Text>{label}</Text>
        <View style={styles.itemRow}>
          {items.map((item) => (
            <View key={item._id}>
              <View style={{padding: 10}}>
              <Image
                style={styles.image}
                source={{ uri: `data:image/jpeg;base64,${item.image}` }}
              />
              
              </View>
            </View>
          ))}
        </View>
        <TouchableWithoutFeedback onPress={() => setCollapsed(!collapsed)}>
              <Text style={styles.instructionText}>Instructions On Wash & Post-Wash</Text>
          </TouchableWithoutFeedback>
          <Collapsible collapsed={collapsed}>
          <Text style={styles.preWashText}>Wash Instructions:</Text>
          {getLabelDescriptionsByCategory(items, "pre-wash").map(([label, description]) => (
            <View key={label} style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', paddingRight: 5 }}>{label}:</Text>
              <Text>{description}</Text>
            </View>
          ))}
          <Text style={styles.postWashText}>Post-Wash Instructions:</Text>
          {getLabelDescriptionsByCategory(items, "post-wash").map(([label, description]) => (
            <View key={label} style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', paddingRight: 5 }}>{label}:</Text>
              <Text>{description}</Text>
            </View>
          ))}
        </Collapsible>
      </View>
    ))}
  </View>
</ScrollView>
          <View style={styles.buttonContainer}>          
            <TouchableWithoutFeedback onPress={() => setSuggestionModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleBackPress}>
              <Text style={styles.nextText}>Back</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        </View>
      </Modal>  
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },

  itemContainer: {
    // backgroundColor: '#f9c2ff',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  
  flatStyle:{
    width: '90%',
    paddingBottom: 20,
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },

  iconContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    alignItems: 'center',
  },

  iconFrame: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeContainer: {
    position: 'absolute',
    top: -7,
    right: -7,
  },
  
  image: {
    width: 100,
    height: 100,
  },

  checkbox: {
    flex: 1,
    alignItems: 'flex-end',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "75%",
    width: "100%"
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  closeText: {
    color: "red",
    textAlign: "right",
    marginTop: 10
  },
  nextText: {
    color: "blue",
    textAlign: "right",
    marginTop: 10
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },

  buttonText: {
    color: "blue",
  },

  laundryText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 5,
  },

  instructionText:{
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },

  itemRow: {
    flexDirection: "row",
  },

  result: {
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    padding: 10,
    margin: 5,
  },

});

export default laundry;
