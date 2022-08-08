import {
  OleoScriptSwashCaps_400Regular,
  OleoScriptSwashCaps_700Bold,
} from '@expo-google-fonts/oleo-script-swash-caps';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import {
  Box,
  HStack,
  Icon,
  NativeBaseProvider,
  Spacer,
  Spinner,
  StatusBar,
  Text,
  View,
  VStack,
  ZStack,
} from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RecipesApi from '../../api/recipesApi';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import Recipe from '../../models/recipe';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';
import { selectIngredientsList } from '../../store/slices/IngredientsListSlice';
import {
  fetchAllPublishedRecipes,
  selectAllPosts,
} from '../../store/slices/postsSlice';
import {
  fetchFilters,
  fetchRecipeSuggestions,
  RecipeSuggestionProps,
  selectFilters,
  selectSuggestedRecipes,
  setSuggestedRecipes,
} from '../../store/slices/recipeSlice';
import FilteringScreen from './FilteringScreen';
import RecipeCard from './RecipeCard';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import RecipeSkeleton from './RecipeSkeleton';
import Search from './Search';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//import axios from 'axios'; //comment this and open the const axios to work
//const axios = require('axios');

const RecipeSuggestionScreen = ({ navigation }) => {
  const foodData = useAppSelector(selectSuggestedRecipes);
  const filters = useAppSelector(selectFilters);
  const [allData, setAllData] = React.useState([]);
  const ingredientsList = useAppSelector(selectIngredientsList);
  // const isLoading = useAppSelector(selectIsLoading);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  const [filteringOpen, setFilteringOpen] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  /**
   * Updates the suggested recipes based on the ingredients list.
   * Whenever the ingredients list changes, this function is called
   * and new suggestions are fetched.
   */
  const updateSuggestions = async () => {
    // dispatch(setLoading(true));
    setIsLoading(true);
    const ingredientNames = ingredientsList.map(
      (ingredient) => ingredient.name
    );

    const suggestionProps: RecipeSuggestionProps = {
      ingredientNames,
      filters,
      recipeCount: 5,
    };

    if (ingredientNames.length > 0) {
      await dispatch(fetchRecipeSuggestions(suggestionProps));
    } else {
      dispatch(setSuggestedRecipes([]));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    updateSuggestions();
  }, [ingredientsList, filters]);

  const data: Recipe[] = useAppSelector(selectAllPosts).map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      calorieInfo: item.calorieInfo,
      image: item.image,
      tags: item.tags,
      ingredients: item.ingredients,
      directions: item.directions,
      time: item.time,
      likes: item.likes,
      // missedIngredientCount: item.missedIngredientCount,

      missedIngredientCount: 2,
    };
  });
  const [isFetchingRecipes, setIsFetchingRecipes] = React.useState(false);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const getRecipes = async () => {
      setIsFetchingRecipes(true);
      await dispatch(fetchAllPublishedRecipes(user.id));
      setAllData((allData) => [...foodData, ...data]);

      setIsFetchingRecipes(false);
    };

    getRecipes();
  }, []);

  const openFilteringView = () => {
    setFilteringOpen(!filteringOpen);
  };
  const openPublishRecipeScreen = () => {
    navigation.navigate('Publish Recipe');
  };
  const openRecipeDetails = ({ item }) => {
    // console.log(item);
    navigation.navigate('Publish Recipe Details', {
      recipe: item,
    });
  };

  const buildLoadingIndicator = () => {
    return isLoading ? (
      <Box mt={3}>
        <Spinner
          color={GlobalStyleSheet.themeColor.backgroundColor}
          size="lg"
        />
      </Box>
    ) : null;
  };

  let [fontLoaded] = useFonts({
    OleoScriptSwashCaps_400Regular,
    OleoScriptSwashCaps_700Bold,
    Pacifico_400Regular,
  });

  const buildSearchFieldPlaceholder = () => {
    return (
      <TouchableOpacity onPressIn={() => setIsSearching(true)}>
        <HStack bg={'white'} py={2.5} rounded={10}>
          <Icon
            as={<MaterialIcons name="search" />}
            size={5}
            ml="2"
            color="muted.400"
          />
          <Text fontSize="sm" fontWeight="bold" color="muted.400" ml="2">
            Search recipes
          </Text>
        </HStack>
      </TouchableOpacity>
    );
  };

  const buildSearchAndFilterComponents = () => {
    return (
      <VStack px={4} space={2}>
        <HStack alignItems={'center'}>
          <Text
            textBreakStrategy="highQuality"
            // style={[styles.appNameText, { fontFamily: 'Pacifico_400Regular' }]}
            style={{
              fontSize: 30,
              paddingTop: 30,
              color: 'white',
              fontFamily: 'Pacifico_400Regular',
            }}
          >
            InstaCook
          </Text>
          <Spacer />
          <TouchableOpacity
            onPress={openPublishRecipeScreen}
            style={styles.buttonStyle}
          >
            <FontAwesome5
              name="plus"
              color={GlobalStyleSheet.themeColor.backgroundColor}
            ></FontAwesome5>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openFilteringView}
            style={styles.buttonStyle}
          >
            <FontAwesome5
              name="filter"
              color={GlobalStyleSheet.themeColor.backgroundColor}
            ></FontAwesome5>
          </TouchableOpacity>
        </HStack>
        <StatusBar
          backgroundColor={GlobalStyleSheet.themeColor.backgroundColor}
        />
        <View w={'100%'}>{buildSearchFieldPlaceholder()}</View>
        {/* <HStack pl={4} alignItems="center">

          <HStack w={'20%'}>
            <TouchableOpacity
              onPress={openPublishRecipeScreen}
              style={styles.buttonStyle}
            >
              <FontAwesome5
                name="plus"
                color={GlobalStyleSheet.themeColor.backgroundColor}
              ></FontAwesome5>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openFilteringView}
              style={styles.buttonStyle}
            >
              <FontAwesome5
                name="filter"
                color={GlobalStyleSheet.themeColor.backgroundColor}
              ></FontAwesome5>
            </TouchableOpacity>
          </HStack>
        </HStack> */}
      </VStack>
    );
  };

  // const buildSearchAndFilterComponents = () => {
  //   return (
  //     <HStack pl={4} alignItems="center">
  //       <View w={'70%'}>{buildSearchFieldPlaceholder()}</View>

  //       <HStack w={'20%'}>
  //         <TouchableOpacity
  //           onPress={openPublishRecipeScreen}
  //           style={styles.buttonStyle}
  //         >
  //           <FontAwesome5
  //             name="plus"
  //             color={GlobalStyleSheet.themeColor.backgroundColor}
  //           ></FontAwesome5>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           onPress={openFilteringView}
  //           style={styles.buttonStyle}
  //         >
  //           <FontAwesome5
  //             name="filter"
  //             color={GlobalStyleSheet.themeColor.backgroundColor}
  //           ></FontAwesome5>
  //         </TouchableOpacity>
  //       </HStack>
  //     </HStack>
  //   );
  // };

  const buildSuggestedList = () => {
    const emptyListComponent = (
      <View flex={1} mt="50%" alignItems="center">
        <Text>No suggestion available!</Text>
        <Text> Please add ingredients</Text>
      </View>
    );

    const suggestionList = (
      <FlatList
        data={foodData}
        renderItem={({ item }) => {
          return (
            <RecipeCard
              onPressFunction={() => openRecipeDetails({ item })}
              recipe={item}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 220 }}
      />
    );

    const loadingSkeleton = (
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        ItemSeparatorComponent={() => <Spacer height={7} />}
        renderItem={() => {
          return <RecipeCardSkeleton />;
        }}
        contentContainerStyle={{ paddingTop: 15 }}
      />
    );
    // return <View style={styles.recipeContainer}>{loadingSkeleton}</View>;

    if (foodData.length === 0 && !isLoading) {
      return <View style={styles.recipeContainer}>{emptyListComponent}</View>;
    }

    if (isLoading) {
      return <View style={styles.recipeContainer}>{loadingSkeleton}</View>;
    }

    return <View style={styles.recipeContainer}>{suggestionList}</View>;
  };

  return (
    <NativeBaseProvider>
      <View style={[styles.container, GlobalStyleSheet.themeColor]}>
        <ZStack>
          <VStack space={5}>
            {buildSearchAndFilterComponents()}
            {buildSuggestedList()}
          </VStack>
          {isSearching && <Search onCancel={() => setIsSearching(false)} />}
          <View>
            <FilteringScreen
              setModalVisible={openFilteringView}
              modalVisible={filteringOpen}
            ></FilteringScreen>
          </View>

          <View style={[styles.container, GlobalStyleSheet.themeColor]}>
            <View>
              <FilteringScreen
                setModalVisible={openFilteringView}
                modalVisible={filteringOpen}
              ></FilteringScreen>
            </View>
          </View>
        </ZStack>

        {/* if (!fontLoaded) {
    return (
      <NativeBaseProvider>
        <Text>Loading</Text>
      </NativeBaseProvider>
    );
  }
  return (
    <NativeBaseProvider>
      <View style={[styles.container, GlobalStyleSheet.themeColor]}>
        <View>
          <FilteringScreen
            setModalVisible={openFilteringView}
            modalVisible={filteringOpen}
          ></FilteringScreen>
        </View>

        <View style={[styles.container, GlobalStyleSheet.themeColor]}>
          <View>
            <FilteringScreen
              setModalVisible={openFilteringView}
              modalVisible={filteringOpen}
            ></FilteringScreen>
          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View
            style={{
              flexDirection: 'row',
              top: '10%',
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text
                style={[
                  styles.appNameText,
                  { fontFamily: 'Pacifico_400Regular' },
                ]}
              >
                InstaCook
              </Text>
            </View>
            <TouchableOpacity
              onPress={openPublishRecipeScreen}
              style={styles.buttonStyle}
            >
              <FontAwesome5
                name="plus"
                color={GlobalStyleSheet.themeColor.backgroundColor}
              ></FontAwesome5>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openFilteringView}
              style={styles.buttonStyle}
            >
              <FontAwesome5
                name="filter"
                color={GlobalStyleSheet.themeColor.backgroundColor}
              ></FontAwesome5>
            </TouchableOpacity>
          </View>

          <View style={styles.topContainer}>
            <View style={styles.searchBar}>
              <FontAwesome5 style={{ left: 20 }} size={15} name="search" />
              <TextInput
                placeholder="Search"
                style={{ flex: 1, left: 35, color: 'gray' }}
              ></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.recipeContainer}>
          {foodData.length < 1 && !isLoading ? (
            <View flex={1} mt="50%" alignItems="center">
              <Text>No suggestion available!</Text>
              <Text> Please add ingredients</Text>
            </View>
          ) : (
            <View style={{ marginBottom: height / 3 - 20, marginTop: 10 }}>
              <FlatList
                data={allData}
                style={{ width: width }}
                renderItem={({ item }) => {
                  return (
                    <RecipeCard
                      onPressFunction={() => openRecipeDetails({ item })}
                      recipe={item}
                    />
                  );
                }}
              ></FlatList>
            </View>
          )}
        </View>
>>>>>>> frontend_fix_selin
      </View> */}
      </View>
    </NativeBaseProvider>
  );
};

// console.log(StatusBar().)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight + 10,
    paddingTop: Constants.statusBarHeight,
  },
  topContainer: {
    backgroundColor: 'red',
  },
  recipeContainer: {
    width: width,
    height: height,
    backgroundColor: 'white',
    // borderTopStartRadius: 30,
    // borderTopEndRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  searchBar: {
    // width: width / 1.6,
  },
  buttonStyle: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  filterContainer: {},
  flatlistStyle: {
    width: width,
    height: height,
    flex: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: undefined,
    alignItems: undefined,
    margin: 0,
    position: 'absolute',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    height: height,
    width: width,
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
  appNameText: {
    fontSize: 30,
    padding: 25,
    top: '40%',
    color: 'white',
    left: 5,
  },
});

export default RecipeSuggestionScreen;
