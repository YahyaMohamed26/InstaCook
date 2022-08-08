import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Skeleton } from 'native-base';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RecipeCardSkeleton = () => {
  return (
    <View>
      <Skeleton h="40" w="100%" isLoaded={false}>
        <View style={styles.imageContainer}></View>
      </Skeleton>
      <View style={styles.recipeDetailsContainer}>
        <View style={styles.recipeDetailTop}>
          <View style={styles.reciepDetailLeftSide}>
            <Skeleton.Text
              style={{ marginTop: 5 }}
              lines={1}
              px="4"
              isLoaded={false}
            ></Skeleton.Text>
            {/* <Skeleton.Text lineHeight={10} lines={1} px="4" isLoaded={false}>
              <Text numberOfLines={3} style={styles.description}>
              </Text>
            </Skeleton.Text> */}
          </View>
          <View style={styles.reciepDetailRightSide}>
            <Skeleton h="4" w="20" style={{ top: 5, left: 5 }} isLoaded={false}>
              <View style={styles.timeInfo}>
                <AntDesign name="clockcircleo" size={16} color="orange" />
                <Text style={{ left: 5, color: 'gray' }}></Text>
              </View>
            </Skeleton>
            <Skeleton
              h="4"
              w="20"
              style={{ top: 15, left: 5 }}
              isLoaded={false}
            >
              <View style={styles.calorieInfo}>
                <Ionicons name="flame" size={18} color="orange" />
                <Text style={{ left: 5, color: 'gray' }}></Text>
              </View>
            </Skeleton>
          </View>
        </View>

        <View style={styles.recipeDetailBottom}>
          <Skeleton.Text
            style={{
              flex: 1,
              top: 5,
              //   alignItems: 'center',
            }}
            w={width}
            lines={3}
            px="4"
            isLoaded={false}
          >
            <Text style={styles.missingItemInformation}></Text>
          </Skeleton.Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: '95%',
    height: height / 2.5,
    elevation: 10,
    shadowColor: 'black',
    marginVertical: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  imageContainer: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    overflow: 'hidden',
  },
  recipeDetailTop: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
  },
  recipeDetailBottom: {
    backgroundColor: 'white',
    flex: 0.5,
    width: width - 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopWidth: 0.5,
    borderColor: 'gray',
  },

  recipeDetailsContainer: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'column',
  },
  reciepDetailLeftSide: {
    flex: 1.8,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  reciepDetailRightSide: {
    flex: 0.8,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    width: width - 20,
    resizeMode: 'cover',
  },
  image2: {
    flex: 1,
    width: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    left: 20,
    top: 4,
    color: GlobalStyleSheet.globalTitleColor.color,
    width: width / 1.6,
  },
  description: {
    fontSize: 12,
    left: 20,
    width: width / 1.7,
    top: 8,
    color: GlobalStyleSheet.globalDescriptionColor.color,
  },
  likeDislikeRatioLine: {
    height: 2,
    width: width / 3,
    backgroundColor: 'black',
    top: 10,
    alignSelf: 'center',
    right: 5,
  },
  timeInfo: {
    flexDirection: 'row',
    top: 15,
    alignSelf: 'flex-end',
    right: 25,
    alignItems: 'center',
  },
  calorieInfo: {
    flexDirection: 'row',
    top: 30,
    alignSelf: 'flex-end',
    right: 20,
    alignItems: 'center',
  },
  calorieInfoText: {},
  missingItemInformation: {
    color: 'red',
    fontSize: 12,
    left: 25,
    flex: 1,
  },
  saveButton: {
    height: 30,
    width: 30,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dislikeButton: {
    height: 30,
    width: 30,
    marginRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecipeCardSkeleton;
