import {
  Box,
  Button,
  Center,
  Image,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import React from 'react';

const RecipeSkeleton = () => {
  return (
    <Center w="100%">
      <Box w="90%" maxWidth="400">
        <VStack
          maxWidth="400"
          borderWidth="1"
          space={8}
          overflow="hidden"
          rounded="md"
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        >
          <Skeleton h="40" isLoaded={false}>
            <Image
              h="40"
              source={{
                uri: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
              }}
            />
          </Skeleton>
          <Skeleton.Text lines={4} px="4" isLoaded={false}>
            <Text px="4" fontSize={'md'} lineHeight={'20px'}>
              askfjalskfjsaljkf
            </Text>
          </Skeleton.Text>
          <Skeleton
            px="4"
            mb="4"
            rounded="md"
            startColor="primary.100"
            isLoaded={false}
          >
            <Button m="4">Explore</Button>
          </Skeleton>
        </VStack>
      </Box>
    </Center>
  );
};

export default RecipeSkeleton;
