import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, NativeBaseProvider } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import MTabView from '../../components/MTabView';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import screens from '../../screens';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';
import MyPosts from './components/MyPosts';
import SavedRecipes from './components/SavedRecipes';
import { ImageBackground } from 'react-native';
import { Image } from 'native-base';
import { selectMyPosts } from '../../store/slices/postsSlice';
import { selectSavedRecipes } from '../../store/slices/postsSlice';
const postsTabs = [
  { name: 'Saved Recipes', component: () => <SavedRecipes /> },
  { name: 'My Posts', component: () => <MyPosts /> },
];

const UserProfileScreen = () => {
  const navigator = useNavigation();
  const user = useAppSelector(selectUser);
  const posts = useAppSelector(selectMyPosts);
  const saved = useAppSelector(selectSavedRecipes);

  const getUserInitials = () => {
    if (!user.name || !user.name.length) return 'N/A';
    const name = user.name.split(' ');
    if (name.length === 1) return name[0].substring(0, 1).toUpperCase();
    return (
      name[0].substring(0, 1).toUpperCase() +
      name[1].substring(0, 1).toUpperCase()
    );
  };

  const _buildActionBtn = (iconName: string, screen: string) => {
    return (
      <View style={tailwind('mx-3')}>
        <TouchableOpacity
          onPress={() => navigator.navigate({ name: screen as never, key: '' })}
        >
          <Feather name={iconName} size={28} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.actionBtns}>
          {/* SETTINGS */}
          {_buildActionBtn('edit', screens.ProfileDetails.name)}
          {_buildActionBtn('settings', screens.Settings.name)}
        </View>
        {/* ------------------ BODY CONTENT --------------- */}
        <View style={styles.body}>
          {/* --------------  PROFILE PICTURE ------------------- */}

          <View style={styles.userInfoBox}>
            <View style={styles.userPhoto}>
              <Image
                source={{ uri: user.picSrc }}
                style={{
                  borderRadius: 20,
                  width: Dimensions.get('window').height / 7,
                  height: Dimensions.get('window').height / 7,
                  resizeMode: 'cover',
                }}
              ></Image>
            </View>
            <View style={styles.userInfo}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text style={GlobalStyleSheet.title1}>{user.name}</Text>
              </View>
              <View style={{ flex: 1.5, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.postInfoBox,
                    {
                      borderRightWidth: 1,
                      borderColor:
                        GlobalStyleSheet.globalDescriptionColor.color,
                    },
                  ]}
                >
                  <Text>{saved.length}</Text>
                  <Text style={{ textAlign: 'center' }}>Saved Recipes</Text>
                </View>
                <View style={styles.postInfoBox}>
                  <Text>{posts.length}</Text>
                  <Text style={{ textAlign: 'center' }}>Published Recipes</Text>
                </View>
              </View>
            </View>
          </View>
          {/*
          <View style={styles.avatar}>
            <ImageBackground source={{ uri: user.picSrc }} style={{height:30,width:30}}>
              <Text
                style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}
              >
                {getUserInitials()}
              </Text>
            </ImageBackground>
          </View>
  */}
          {/* ---------------------  PROFILE INFO ----------------------- */}
          {/*<View style={styles.info}>
            <Text style={GlobalStyleSheet.title1}>{user.name}</Text>
            <Text style={GlobalStyleSheet.subtitle1}>
              {user.phoneNumber || ''}
            </Text>
          </View>*/}
          {/* --------------------  POSTS LIST  ----------------------*/}
          <View style={styles.tabs}>
            {/* <PostsTabs /> */}
            <MTabView tabs={postsTabs} />
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('flex-1 pt-2'),
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    position: 'relative',
    // paddingTop: StatusBar.currentHeight,
  },
  actionBtns: {
    ...tailwind('flex-row justify-end pt-6 pr-4'),
    height: '20%',
  },
  body: {
    ...tailwind('bg-white w-full flex-1 items-center'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'column',
    backgroundColor: 'white',
    // top: -10,
  },
  userInfoBox: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 1.3,
    marginTop: '-15%',
    borderRadius: 20,
    elevation: 5,
    flexDirection: 'row',
    padding: 10,
  },
  userPhoto: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  postInfoBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  avatar: {
    // To have the avatar half above the body container.
    // the avatar radius is 90, so top is 90/2 = 45
    marginTop: -45,
  },
  info: {
    ...tailwind('items-center pt-2'),
    backgroundColor: 'red',
  },
  tabs: {
    ...tailwind('flex-1 w-full'),
  },
});

export default UserProfileScreen;
