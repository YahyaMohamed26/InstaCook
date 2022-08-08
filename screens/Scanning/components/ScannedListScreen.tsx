import { Spinner, VStack } from 'native-base';
import React, { FC } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import MTabView from '../../../components/MTabView';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import Ingredient from '../../../models/ingredient';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../store/slices/authSlice';
import {
  addIngredientItem,
  selectIngredientsList,
  selectScannedIngredients,
} from '../../../store/slices/IngredientsListSlice';
import MissingIngredients from './MissingIngredients';
import NewIngredients from './NewIngredients';

interface IProps {
  scannedItems: Ingredient[];
  onDone: Function;
}

const ScannedListScreen: FC<IProps> = (props) => {
  const width = Dimensions.get('window').width;
  const dispatch = useAppDispatch();
  const scannedIngredients = useAppSelector(selectScannedIngredients);
  const user = useAppSelector(selectUser);
  const currentIngredients = useAppSelector(selectIngredientsList);
  const { scannedItems } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const tabs = [
    {
      name: 'Missing Ingredients',
      component: () => <MissingIngredients items={scannedItems} />,
    },
    {
      name: 'New Ingredients',
      component: () => <NewIngredients items={scannedItems} />,
    },
  ];

  const onAddAll = async () => {
    setIsLoading(true);
    const promises = scannedIngredients.map(async (item) => {
      if (
        !currentIngredients.some(
          (ing) => ing.name.toLowerCase() === item.name.toLowerCase()
        )
      ) {
        return dispatch(addIngredientItem({ userId: user.id, item }));
      }
    });
    await Promise.all(promises);
    setIsLoading(false);
    props.onDone();
  };

  const goBack = () => {
    props.onDone();
  };

  return (
    <View style={styles.container}>
      <VStack>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <Text
              style={{
                ...GlobalStyleSheet.title4,
                color: GlobalStyleSheet.themeColor.backgroundColor,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <Text style={[GlobalStyleSheet.title2, { left: width / 2 - 200 }]}>
            Scanned List
          </Text>
          {isLoading ? (
            <Spinner color={GlobalStyleSheet.themeColor.backgroundColor} />
          ) : (
            <TouchableOpacity onPress={onAddAll}>
              <Text
                style={{
                  ...GlobalStyleSheet.title4,
                  color: GlobalStyleSheet.themeColor.backgroundColor,
                }}
              >
                Add all
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.tabs}>
          {/* <MTabView tabs={tabs} /> */}
          <NewIngredients items={scannedItems} />
        </View>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('flex-1 w-full bg-white relative pt-8'),
  },
  header: {
    marginTop: 15,
    ...tailwind('w-full flex flex-row justify-between items-center mb-5 px-4'),
  },
  tabs: {
    height: '100%',
  },
});
export default ScannedListScreen;
