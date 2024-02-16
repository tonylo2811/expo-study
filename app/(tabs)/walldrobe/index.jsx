import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { GET } from '../../../utils/apis';

const Wardrobe = () => {
  const [fetchedImg, setFetchedImg] = useState([]);
  const [categories, setCategories] = useState(['top', 'outerwear', 'pants', 'overall', 'dress', 'skirt', 'other']);
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [tempSelectedCategories, setTempSelectedCategories] = useState(selectedCategories);
  const [seasons, setSeasons] = useState(['spring', 'summer', 'autumn', 'winter']);
  const [selectedSeasons, setSelectedSeasons] = useState(['All']);
  const [tempSelectedSeasons, setTempSelectedSeasons] = useState(selectedSeasons);
  const [occasions, setOccasions] = useState(['casual', 'formal', 'work', 'sports', 'outdoor', 'other']);
  const [selectedOccasions, setSelectedOccasions] = useState(['All']);
  const [tempSelectedOccasions, setTempSelectedOccasions] = useState(selectedOccasions);
  const [sizes, setSizes] = useState(['xs', 's', 'm', 'l', 'xl', 'xxl']);
  const [selectedSizes, setSelectedSizes] = useState(['All']);
  const [tempSelectedSizes, setTempSelectedSizes] = useState(selectedSizes);
  const [brands, setBrands] = useState(['Zara', 'H&M', 'GAP', 'Uniqlo', 'Adidas', 'Puma', 'other']);
  const [selectedBrands, setSelectedBrands] = useState(['All']);
  const [tempSelectedBrands, setTempSelectedBrands] = useState(selectedBrands);
  const [priceRanges] = useState(['Below $100', '$101~$300', '$301~$500', '$501~$1000', 'Above $1001']);
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [tempSelectedPriceRange, setTempSelectedPriceRange] = useState(selectedPriceRange);
  const [error, setError] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imagesPerRow, setImagesPerRow] = useState(3);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [tempFavoritesFilterActive, setTempFavoritesFilterActive] = useState(favoritesFilterActive);
  const [favoritesFilterActive, setFavoritesFilterActive] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editableItemDetails, setEditableItemDetails] = useState(null);
  const [isCategoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [isSeasonDropdownVisible, setSeasonDropdownVisible] = useState(false);
  const [isOccasionDropdownVisible, setOccasionDropdownVisible] = useState(false);
  const [isSizeDropdownVisible, setSizeDropdownVisible] = useState(false);
  const [isBrandDropdownVisible, setBrandDropdownVisible] = useState(false);

  useEffect(() => {
    const getImgList = async () => {
      try {
        const response = await axios.get(`${GET?.GETIMG}/6597e7ee84de12c962b23d39`);
        const garments = response.data.data;
        setFetchedImg(garments);
        setError('');
      } catch (err) {
        setError('Failed to load images.');
        console.error(err);
      }
    };
    getImgList();
  }, []);


  const tempFilterByCategory = (category) => {
    setTempSelectedCategories(prevTempSelectedCategories => {
      if (category === 'All') {
        return ['All'];
      }
      const isAlreadySelected = prevTempSelectedCategories.includes(category);
      const newTempSelectedCategories = isAlreadySelected
        ? prevTempSelectedCategories.filter(c => c !== category)
        : [...prevTempSelectedCategories.filter(c => c !== 'All'), category];
      return newTempSelectedCategories.length > 0 ? newTempSelectedCategories : ['All'];
    });
};

const tempFilterBySeason = (season) => {
  setTempSelectedSeasons(prevTempSelectedSeasons => {
    if (season === 'All') {
      return ['All'];
    }
    const isAlreadySelected = prevTempSelectedSeasons.includes(season);
    const newTempSelectedSeasons = isAlreadySelected
      ? prevTempSelectedSeasons.filter(s => s !== season)
      : [...prevTempSelectedSeasons.filter(s => s !== 'All'), season];
    return newTempSelectedSeasons.length > 0 ? newTempSelectedSeasons : ['All'];
  });
};

const tempFilterByOccasion = (occasion) => {
  setTempSelectedOccasions(prevTempSelectedOccasions => {
    if (occasion === 'All') {
      return ['All'];
    }
    const isAlreadySelected = prevTempSelectedOccasions.includes(occasion);
    const newTempSelectedOccasions = isAlreadySelected
      ? prevTempSelectedOccasions.filter(o => o !== occasion)
      : [...prevTempSelectedOccasions.filter(o => o !== 'All'), occasion];
    return newTempSelectedOccasions.length > 0 ? newTempSelectedOccasions : ['All'];
  });
};

const tempFilterBySize = (size) => {
  setTempSelectedSizes(prevTempSelectedSizes => {
    if (size === 'All') {
      return ['All'];
    }
    const isAlreadySelected = prevTempSelectedSizes.includes(size);
    const newTempSelectedSizes = isAlreadySelected
      ? prevTempSelectedSizes.filter(s => s !== size)
      : [...prevTempSelectedSizes.filter(s => s !== 'All'), size];
    return newTempSelectedSizes.length > 0 ? newTempSelectedSizes : ['All'];
  });
};

const tempFilterByBrand = (brand) => {
  setTempSelectedBrands(prevTempSelectedBrands => {
    if (brand === 'All') {
      return ['All'];
    }
    const isAlreadySelected = prevTempSelectedBrands.includes(brand);
    const newTempSelectedBrands = isAlreadySelected
      ? prevTempSelectedBrands.filter(b => b !== brand)
      : [...prevTempSelectedBrands.filter(b => b !== 'All'), brand];
    return newTempSelectedBrands.length > 0 ? newTempSelectedBrands : ['All'];
  });
};

const tempFilterByPriceRange = (range) => {
  setTempSelectedPriceRange(prevTempSelectedPriceRange => {
    if (range === 'All') {
      return 'All';
    } else if (prevTempSelectedPriceRange === range) {
      return 'All';
    } else {
      return range;
    }
  });
};

  const filteredImages = fetchedImg.filter(item => {

    const matchesCategory = selectedCategories.includes('All') ||
      selectedCategories.map(c => c.toLowerCase()).includes(
        Array.isArray(item.categories) ?
          item.categories.map(cat => cat.trim().toLowerCase()) :
          item.categories.trim().toLowerCase()
      );

    const matchesSeason = selectedSeasons.includes('All') ||
      (item.season && item.season.some(season =>
        selectedSeasons.map(s => s.toLowerCase()).includes(season.trim().toLowerCase())
      ));

    const matchesOccasion = selectedOccasions.includes('All') ||
      (item.occasion && item.occasion.some(occasion =>
        selectedOccasions.map(o => o.toLowerCase()).includes(occasion.trim().toLowerCase())
      ));

    const matchesSize = selectedSizes.includes('All') ||
      (item.size && selectedSizes.map(sz => sz.toLowerCase()).includes(item.size.trim().toLowerCase()));


    const matchesBrand = selectedBrands.includes('All') ||
      (item.brand && selectedBrands.map(b => b.toLowerCase()).includes(item.brand.trim().toLowerCase()));

    let matchesPriceRange = true;
    if (selectedPriceRange !== 'All') {
      const itemPrice = parseFloat(item.price);
      switch (selectedPriceRange) {
        case 'Below $100':
          matchesPriceRange = itemPrice < 100;
          break;
        case '$100~$300':
          matchesPriceRange = itemPrice >= 100 && itemPrice <= 300;
          break;
        case '$301~$500':
          matchesPriceRange = itemPrice >= 301 && itemPrice <= 500;
          break;
        case '$501~$1000':
          matchesPriceRange = itemPrice >= 501 && itemPrice <= 1000;
          break;
        case 'Above $1001':
          matchesPriceRange = itemPrice > 1001;
          break;
        default:
          matchesPriceRange = true;
      }
    }

    const isFavorite = !favoritesFilterActive  || favorites.includes(item._id);

    return matchesCategory && matchesSeason && matchesOccasion && matchesSize && matchesBrand & matchesPriceRange && isFavorite;
  });

  const handleImagePress = (item) => {
    setSelectedItem(item);
    setDetailModalVisible(true);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelectImagesPerRow = (num) => {
    setImagesPerRow(num);
    toggleDropdown();
  };

  const toggleFavoritesFilter = () => {
    setTempFavoritesFilterActive(!tempFavoritesFilterActive);
  };

  const handleEditPress = (item) => {
    setEditMode(true);
    setEditableItemDetails({ ...item });
    setDetailModalVisible(true);
  };

  const handleCloseButton = () => {
    setSelectedCategories(tempSelectedCategories);
    setSelectedSeasons(tempSelectedSeasons);
    setSelectedOccasions(tempSelectedOccasions);
    setSelectedSizes(tempSelectedSizes);
    setSelectedBrands(tempSelectedBrands);
    setSelectedPriceRange(tempSelectedPriceRange);
    setFavoritesFilterActive(tempFavoritesFilterActive);
    
    setFilterModalVisible(false);
  };

  const handleSaveEdit = () => {
    if (editableItemDetails && editableItemDetails._id) {
      const updatedImages = fetchedImg.map(item => {
        if (item._id === editableItemDetails._id) {
          return { ...item, ...editableItemDetails };
        }
        return item;
      });

      setFetchedImg(updatedImages);
  
      setEditMode(false);
      setDetailModalVisible(false);
  
      setEditableItemDetails(null);
    }
};

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditableItemDetails(null);
    setDetailModalVisible(true);
  };

  const handleFavoriteToggle = (itemId) => {
    setFavorites((currentFavorites) => {
      const isAlreadyFavorited = currentFavorites.includes(itemId);
      if (isAlreadyFavorited) {
        return currentFavorites.filter(id => id !== itemId);
      } else {
        return [...currentFavorites, itemId];
      }
    });
  };

  const renderImage = ({ item }) => (
    <View style={[styles.imageWrapper, { width: `${92 / imagesPerRow}%` }]}>
      <TouchableOpacity onPress={() => handleImagePress(item)}>
        <Image
          source={{ uri: `data:image/gif;base64,${item.image}` }}
          style={styles.clothesImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={() => handleFavoriteToggle(item._id)}
      >
        <Text style={favorites.includes(item._id) ? styles.favorited : styles.notFavorited}>
          {favorites.includes(item._id) ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderFilterOptions = (label, data, selectedData, onSelect) => {
    return (
      <View>
        <Text style={styles.filterLabel}>{label}</Text>
        <FlatList
          horizontal
          data={['All', ...data]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedData.includes(item) ? styles.selectedCategory : {}
              ]}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.categoryButtonText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  const RenderImagesPerRowOptions = () => (
    <>
      <TouchableOpacity
        style={styles.ImgPerRowButton}
        onPress={toggleDropdown}
      >
        <Text style={styles.ImgPerRowButtonText}>Columns</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={toggleDropdown}
      >
        <View style={styles.RowdropdownContainer}>
          {[2, 3, 4, 5].map(num => (
            <TouchableOpacity
              key={num}
              style={styles.RowdropdownItem}
              onPress={() => handleSelectImagesPerRow(num)}
            >
              <Text style={imagesPerRow === num ? styles.RowdropdownItemSelected : styles.RowdropdownItemText}>
                {num} images per row
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );

  const renderFavoritesFilter = () => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        tempFavoritesFilterActive ? styles.selectedCategory : {}
      ]}
      onPress={toggleFavoritesFilter}
    >
      <Text style={styles.categoryButtonText}>
        {tempFavoritesFilterActive ? "Show ALL" : "Show Favorites Only"}
      </Text>
    </TouchableOpacity>
  );

  const renderModalContent = () => (
    <View style={styles.modalContent}>
      {renderFilterOptions('Categories', categories, tempSelectedCategories, tempFilterByCategory)}
      {renderFilterOptions('Seasons', seasons, tempSelectedSeasons, tempFilterBySeason)}
      {renderFilterOptions('Occasions', occasions, tempSelectedOccasions, tempFilterByOccasion)}
      {renderFilterOptions('Sizes', sizes, tempSelectedSizes, tempFilterBySize)}
      {renderFilterOptions('Brands', brands, tempSelectedBrands, tempFilterByBrand)}
      {renderFilterOptions('Price Range', priceRanges, tempSelectedPriceRange, tempFilterByPriceRange)}
      {renderFavoritesFilter()}
      <TouchableOpacity
        style={styles.DetailButton}
        onPress={handleCloseButton}>
        <Text style={styles.DetailButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDetailModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={detailModalVisible}
      onRequestClose={() => {
        setDetailModalVisible(false);
        setEditMode(false);
      }}
    >
      <View style={styles.detailModalContent}>
        <ScrollView>
          <Image
            source={{ uri: `data:image/gif;base64,${selectedItem?.image}` }}
            style={styles.detailImage}
          />
          {editMode ? (
            <>
              <Text style={styles.inputLabel}>Category:</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setCategoryDropdownVisible(!isCategoryDropdownVisible)}>
                <Text>{editableItemDetails?.categories || 'Select a category'}</Text>
              </TouchableOpacity>

              {isCategoryDropdownVisible && (
                <View style={styles.dropdownMenuContainer}>
                  <ScrollView>
                    {categories.map((category, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownMenuItem}
                        onPress={() => {
                          setEditableItemDetails({ ...editableItemDetails, categories: category });
                        }}>
                        <Text style={styles.dropdownItemText}>{category}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <Text style={styles.inputLabel}>Season:</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setSeasonDropdownVisible(!isSeasonDropdownVisible)}>
                <Text>{editableItemDetails?.season.join(', ') || 'Select seasons'}</Text>
              </TouchableOpacity>

              {isSeasonDropdownVisible && (
                <View style={styles.dropdownMenuContainer}>
                  <ScrollView>
                    {seasons.map((season, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownMenuItem}
                        onPress={() => {
                          const newSeasons = [...(editableItemDetails?.season || [])];
                          const index = newSeasons.indexOf(season);
                          if (index > -1) {
                            newSeasons.splice(index, 1);
                          } else {
                            newSeasons.push(season);
                          }
                          setEditableItemDetails({ ...editableItemDetails, season: newSeasons });
                        }}>
                        <Text style={styles.dropdownItemText}>{season}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <Text style={styles.inputLabel}>Occasion:</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setOccasionDropdownVisible(!isOccasionDropdownVisible)}>
                <Text>{editableItemDetails?.occasion.join(', ') || 'Select occasions'}</Text>
              </TouchableOpacity>

              {isOccasionDropdownVisible && (
                <View style={styles.dropdownMenuContainer}>
                  <ScrollView>
                    {occasions.map((occasion, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownMenuItem}
                        onPress={() => {
                          const newOccasion = [...(editableItemDetails?.occasion || [])];
                          const index = newOccasion.indexOf(occasion);
                          if (index > -1) {
                            newOccasion.splice(index, 1);
                          } else {
                            newOccasion.push(occasion);
                          }
                          setEditableItemDetails({ ...editableItemDetails, occasion: newOccasion });
                        }}>
                        <Text style={styles.dropdownItemText}>{occasion}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <Text style={styles.inputLabel}>Size:</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setSizeDropdownVisible(!isSizeDropdownVisible)}>
                <Text>{editableItemDetails?.size || 'Select size'}</Text>
              </TouchableOpacity>

              {isSizeDropdownVisible && (
                <View style={styles.dropdownMenuContainer}>
                  <ScrollView>
                    {sizes.map((size, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownMenuItem}
                        onPress={() => {
                          setEditableItemDetails({ ...editableItemDetails, size });
                          setSizeDropdownVisible(false);
                        }}>
                        <Text style={styles.dropdownItemText}>{size}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <Text style={styles.inputLabel}>Brand:</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setBrandDropdownVisible(!isBrandDropdownVisible)}>
                <Text>{editableItemDetails?.brand || 'Select brand'}</Text>
              </TouchableOpacity>

              {isBrandDropdownVisible && (
                <View style={styles.dropdownMenuContainer}>
                  <ScrollView>
                    {brands.map((brand, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownMenuItem}
                        onPress={() => {
                          setEditableItemDetails({ ...editableItemDetails, brand });
                          setBrandDropdownVisible(false);
                        }}>
                        <Text style={styles.dropdownItemText}>{brand}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <Text style={styles.inputLabel}>Remarks:</Text>
              <TextInput
                style={styles.detailTextInput}
                multiline={true}
                numberOfLines={4}
                value={editableItemDetails?.remarks}
                onChangeText={(text) =>
                  setEditableItemDetails({ ...editableItemDetails, remarks: text })
                }
              />

            </>
          ) : (
            <>
              <Text style={styles.detailText}>Category: {selectedItem?.categories}</Text>
              <Text style={styles.detailText}>Season: {selectedItem?.season.join(', ')}</Text>
              <Text style={styles.detailText}>Occasion: {selectedItem?.occasion.join(', ')}</Text>
              <Text style={styles.detailText}>Size: {selectedItem?.size}</Text>
              <Text style={styles.detailText}>Brand: {selectedItem?.brand}</Text>
              <Text style={styles.detailText}>Remarks: {selectedItem?.remarks}</Text>
            </>
          )}
        </ScrollView>
        {editMode ? (
          <>
            <TouchableOpacity
              style={styles.DetailButton}
              onPress={handleSaveEdit}
            >
              <Text style={styles.DetailButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.DetailButton}
              onPress={handleCancelEdit}
            >
              <Text style={styles.DetailButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => handleEditPress(selectedItem)}
          >
            <Text style={styles.editIconText}>✎</Text>
          </TouchableOpacity>
        )}
        {!editMode && (
          <TouchableOpacity
            style={styles.DetailButton}
            onPress={() => {
              setDetailModalVisible(false);
            }}
          >
            <Text style={styles.DetailButtonText}>Close</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterModalButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text style={styles.filterModalButtonText}>Filters</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        {renderModalContent()}
      </Modal>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={filteredImages}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        key={imagesPerRow}
        numColumns={imagesPerRow}
      />
      {RenderImagesPerRowOptions()}
      {renderDetailModal()}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  filterLabel: {
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  categoryButton: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#DFD6EF',
    borderWidth: 3,
    borderColor: '#C3B1E1',
  },
  categoryButtonText: {
    color: '#333',
  },
  imageWrapper: {
    width: '32%',
    height: 200,
    marginBottom: 10,
    marginHorizontal: '1%',
  },
  clothesImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  mainView: {
    marginTop: 10,
  },
  filterModalButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1000,
  },
  filterModalButtonText: {
    color: '#333',
    textAlign: 'center',
  },
  filterOption: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ddd',
    margin: 5,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilterOption: {
    backgroundColor: '#007bff',
  },
  filterOptionText: {
    color: 'black',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    marginTop: 100,
    borderWidth: 1,
    borderColor: '#333',
  },
  detailModalContent: {
    margin: 20,
    marginTop: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  detailText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  DetailButton: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DetailButtonText: {
    color: '#333',
    fontSize: 16
  },
  ImgPerRowButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1000,
  },
  ImgPerRowButtonText: {
    color: '#333',
    textAlign: 'center',
  },
  RowdropdownContainer: {
    marginTop: 22,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    position: 'absolute',
    left: 10,
    bottom: 150,
    zIndex: 2,
    elevation: 2,
  },
  RowdropdownItem: {
    padding: 10,
  },
  RowdropdownItemText: {
    fontSize: 16,
  },
  RowdropdownItemSelected: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  favorited: {
    fontSize: 22,
    color: 'red',
  },
  notFavorited: {
    fontSize: 22,
    color: 'gray',
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  editIconText: {
    fontSize: 50,
    color: 'black',
  },
  dropdown: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  dropdownMenuContainer: {
    maxHeight: 100, 
    borderWidth: 1,
    borderColor: 'gray',
  },
  dropdownMenuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  detailTextInput: {
    width: 200, // Replace this with the fixed width you desire
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default Wardrobe;
