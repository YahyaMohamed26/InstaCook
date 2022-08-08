import {
  Box,
  Divider,
  HStack,
  NativeBaseProvider,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const width = Dimensions.get('window').width;

export default function DirectionsTab({ directions }) {
  const [mode, setMode] = useState('Basic');

  return (
    <NativeBaseProvider>
      <Box bg="white" flex="1" safeAreaTop>
        <Basic directions={directions} />
      </Box>
    </NativeBaseProvider>
  );
}

function Basic({ directions }) {
  const [listData, setListData] = useState(directions);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box key={item.id}>
      <Pressable onPress={() => console.log('You touched me')} bg="white">
        <Box pl="3" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Text color="warmGray.600" fontSize="16px">
              {index + 1}
            </Text>
            <VStack>
              <Text
                fontSize="16px"
                color="warmGray.600"
                _dark={{ color: 'warmGray.50' }}
              >
                {item}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Pressable>
      <Divider />
    </Box>
  );

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        onRowDidOpen={onRowDidOpen}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </Box>
  );
}
