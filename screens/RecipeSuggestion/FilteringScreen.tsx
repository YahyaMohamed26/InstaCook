import { Ionicons } from '@expo/vector-icons';
import { Spinner } from 'native-base';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import { dummyFilters, UserFilters } from '../../models/filter';
import Ingredient from '../../models/ingredient';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';
import { selectIngredientsList } from '../../store/slices/IngredientsListSlice';
import { selectFilters, setFilters } from '../../store/slices/recipeSlice';

interface Props {
  setModalVisible: (val: boolean) => void;
  modalVisible: boolean;
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FilteringScreen = (props: Props) => {
  const filters = dummyFilters;
  const ingItems = useAppSelector(selectIngredientsList);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedFilters, setSelectedFilters] = React.useState<UserFilters>(
    useAppSelector(selectFilters)
  );

  const toggleIngredientsToDiscard = (item: Ingredient) => {
    const tempList = [...selectedFilters.ingredientsToDiscard];
    const idx = tempList.findIndex((it) => it === item.name);
    if (idx > -1) {
      tempList.splice(idx, 1);
    } else {
      tempList.push(item.name);
    }
    setSelectedFilters({
      ...selectedFilters,
      ingredientsToDiscard: tempList,
    });
  };

  const renderIngredient = ({ item }) => {
    const color = selectedFilters.ingredientsToDiscard.includes(item.name)
      ? GlobalStyleSheet.themeColor.backgroundColor
      : '#000000';
    return (
      <TouchableOpacity
        style={{
          ...styles.discardSyle,
          borderColor: color,
        }}
        onPress={() => toggleIngredientsToDiscard(item)}
      >
        <View>
          <Text
            style={{
              color: color,
              textAlign: 'center',
              width: width / 4 - 3,
            }}
          >
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilter = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleDietryFilters({ item })}
      style={
        item.included
          ? styles.dietryRestCardIncluded
          : styles.dietryRestCardNotIncluded
      }
    >
      <View style={styles.vectorStyle}>
        {item.title == 'Vegan' && (
          <Image
            style={styles.vectorImage}
            source={require('../../assets/filter/vegan.png')}
          ></Image>
        )}
        {item.title == 'Vegetarian' && (
          <Image
            style={styles.vectorImage}
            source={require('../../assets/filter/vegeterian.png')}
          ></Image>
        )}
        {item.title == 'Lactose' && (
          <Image
            style={styles.vectorImage}
            source={require('../../assets/filter/lactose.png')}
          ></Image>
        )}
        {item.title == 'Gluten Free' && (
          <Image
            style={styles.vectorImage}
            source={require('../../assets/filter/glutenfree.png')}
          ></Image>
        )}
        {item.title == 'Ketogenic' && (
          <Image
            style={styles.vectorImage}
            source={require('../../assets/filter/keto.png')}
          ></Image>
        )}
        {item.title == 'Dairy Free' && (
          <Image
            style={styles.vectorImage}
            source={require('../../assets/filter/dairyfree.png')}
          ></Image>
        )}
      </View>
      <Text
        style={
          selectedFilters?.dietryRestrictions.includes(item.title)
            ? { color: GlobalStyleSheet.themeColor.backgroundColor }
            : { color: 'black' }
        }
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const toggleDietryFilters = ({ item }) => {
    const tempList = [...selectedFilters?.dietryRestrictions];
    const idx = tempList.findIndex((it) => it === item.title);
    if (idx > -1) {
      tempList.splice(idx, 1);
    } else {
      tempList.push(item.title);
    }
    setSelectedFilters({
      ...selectedFilters,
      dietryRestrictions: tempList,
    });
  };

  const applyFilters = async () => {
    setIsLoading(true);
    await dispatch(setFilters({ userId: user.id, filters: selectedFilters }));
    props.setModalVisible(false);
    setIsLoading(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropColor="transparent"
        coverScreen={true}
        isVisible={props.modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => props.setModalVisible(!props.modalVisible)}
                style={{ right: 5, alignItems: 'flex-start', flex: 0.5 }}
              >
                <Ionicons name="chevron-back" size={25} color="black" />
              </TouchableOpacity>
              <View style={styles.sortByViewTitle}>
                <Text
                  style={{
                    color: GlobalStyleSheet.globalTitleColor.color,
                    fontSize: 20,
                  }}
                >
                  Filters
                </Text>
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.filterTitles}>Dietry Restrictions</Text>
              <View style={{ height: height / 5 }}>
                <FlatList
                  data={filters}
                  renderItem={renderFilter}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  scrollEnabled={false}
                  updateCellsBatchingPeriod={4000}
                />
              </View>
              <Text style={[styles.filterTitles, { marginTop: 3 }]}>
                Calories
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.calorieInputBox}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Min Calorie"
                    onChangeText={(text) => {
                      setSelectedFilters({
                        ...selectedFilters,
                        minCalorie: parseInt(text),
                      });
                    }}
                    value={selectedFilters?.minCalorie.toString()}
                    style={{ padding: 2, textAlign: 'center' }}
                  ></TextInput>
                </View>
                <View style={styles.calorieInputBox}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Max Calorie"
                    onChangeText={(text) => {
                      setSelectedFilters({
                        ...selectedFilters,
                        maxCalorie: parseInt(text),
                      });
                    }}
                    value={selectedFilters?.maxCalorie.toString()}
                    style={{ padding: 2, textAlign: 'center' }}
                  ></TextInput>
                </View>
              </View>
              <Text style={[styles.filterTitles, { marginTop: 10 }]}>
                Missing Ingredients
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.calorieInputBox}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Minimum"
                    onChangeText={(text) => {
                      setSelectedFilters({
                        ...selectedFilters,
                        missingIngredientsMin: parseInt(text),
                      });
                    }}
                    value={selectedFilters?.missingIngredientsMin.toString()}
                    style={{ padding: 2, textAlign: 'center' }}
                  ></TextInput>
                </View>
                <View style={styles.calorieInputBox}>
                  <TextInput
                    keyboardType="number-pad"
                    onChangeText={(text) => {
                      setSelectedFilters({
                        ...selectedFilters,
                        missingIngredientsMax: parseInt(text),
                      });
                    }}
                    placeholder="Maximum"
                    style={{ padding: 2, textAlign: 'center' }}
                    value={selectedFilters?.missingIngredientsMax.toString()}
                  ></TextInput>
                </View>
              </View>
              <Text style={[styles.filterTitles, { marginTop: 10 }]}>
                Discard Ingredients
              </Text>
              <View style={{ height: height / 4 }}>
                <FlatList
                  data={ingItems}
                  renderItem={renderIngredient}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  scrollEnabled={false}
                  updateCellsBatchingPeriod={4000}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.applyButtonStyle}
              onPress={applyFilters}
            >
              {isLoading ? (
                <Spinner color={'white'} />
              ) : (
                <Text style={{ color: 'white', fontSize: 18 }}>
                  Apply Filters
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  vecotr: {},
  modalView: {
    width: width / 1.1,
    height: height / 1.04,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  sortByViewTitle: {
    width: width / 1.8,
    height: height / 24,
    borderRadius: 15,
    justifyContent: 'center',
    marginBottom: 15,
    flex: 0.7,
    alignSelf: 'flex-start',
  },
  applyButtonStyle: {
    width: width / 1.8,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    marginBottom: 15,
    flex: 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    top: '5%',
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
  },
  filtersViewTitle: {
    width: width / 1.8,
    height: height / 24,
    borderRadius: 15,
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  sortByCard: {
    width: width / 6,
    height: width / 6,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: 15,
  },
  sortBySection: {
    flexDirection: 'row',
  },
  dietryRestCardNotIncluded: {
    width: width / 3,
    height: height / 22,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 3,
    borderColor: GlobalStyleSheet.globalDescriptionColor.color,
    flexDirection: 'row',
  },
  dietryRestCardIncluded: {
    width: width / 3,
    height: height / 22,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 3,
    borderColor: GlobalStyleSheet.themeColor.backgroundColor,
    flexDirection: 'row',
  },
  calorieInputBox: {
    width: width / 4,
    height: width / 10,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: 10,
  },
  filterTitles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
  },
  missingIngBox: {
    width: width / 4,
    height: width / 8,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: 15,
  },
  vectorStyle: {
    alignItems: 'center',
    width: height / 22,
    height: height / 22,
    borderRadius: 15,
    justifyContent: 'center',
    marginHorizontal: 3,
    marginVertical: 3,
  },
  vectorImage: {
    width: height / 25,
    height: height / 25,
  },
  discardSyle: {
    width: width / 4,
    height: height / 22,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    borderColor: GlobalStyleSheet.globalDescriptionColor.color,
    flexDirection: 'row',
  },
});

export default FilteringScreen;
