import { MaterialIcons } from '@expo/vector-icons';
import {
  HStack,
  Icon,
  Input,
  View,
  Text,
  VStack,
  Image,
  PresenceTransition,
  Divider,
  Spinner,
} from 'native-base';
import React, { FC } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import RecipesApi, { SearchResult } from '../../api/recipesApi';
import { debounce } from 'lodash';
import { FlatList } from 'react-native-gesture-handler';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import { useNavigation } from '@react-navigation/native';
import Recipe from '../../models/recipe';

interface IProps {
  onCancel: () => void;
}

const fetchData = async (query: string, cb: Function) => {
  const res = await RecipesApi.searchRecipeByName(query);
  console.log(res);
  cb(res);
};

const debouncedFetchData = debounce((query, cb) => {
  fetchData(query, cb);
}, 500);

const Search: FC<IProps> = (props) => {
  const { width, height } = Dimensions.get('window');
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (query.length > 2) {
      debouncedFetchData(query, (res: SearchResult[]) => {
        setResults(res);
        setIsSearching(false);
      });
    }
  }, [query]);

  const openRecipeDetails = (recipeId: string) => {
    const recipe: Recipe = {
      id: recipeId,
      title: '',
      directions: [],
      image: '',
      ingredients: [],
      tags: [],
      missedIngredientCount: 0,
    };

    navigation.navigate('Publish Recipe Details', {
      recipe,
    });
  };

  const buildResults = () => {
    return (
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => openRecipeDetails(item.id)}>
              <HStack alignItems={'center'} w="60%" space={3}>
                <Image
                  source={{ uri: item.image }}
                  width={100}
                  height={50}
                  alt={item.name}
                />
                <Text style={GlobalStyleSheet.title3}>
                  {(item as SearchResult).title}
                </Text>
              </HStack>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 150,
        }}
        ItemSeparatorComponent={() => <Divider my={2} />}
        ListHeaderComponent={() =>
          isSearching ? (
            <Spinner
              my={3}
              color={GlobalStyleSheet.themeColor.backgroundColor}
            />
          ) : null
        }
      ></FlatList>
    );
  };

  return (
    <VStack>
      <HStack alignItems="center" bg={'white'}>
        {/* <FontAwesome5 style={{ left: 20 }} size={15} name="search" /> */}
        <View w={'100%'}>
          <Input
            bg={'white'}
            py={3.5}
            rounded={0}
            autoFocus={true}
            onChangeText={(value) => {
              setQuery(value);
              setIsSearching(true);
            }}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="search" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  setQuery('');
                  props.onCancel();
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            }
            placeholder="Name"
          />
        </View>
      </HStack>

      <PresenceTransition
        visible={true}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,

          transition: {
            duration: 300,
          },
        }}
      >
        <View w={width} h={height} bg={'white'}>
          {buildResults()}
        </View>
      </PresenceTransition>
    </VStack>
  );
};

export default Search;
