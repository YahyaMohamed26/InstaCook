import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import GlobalStyleSheet from './constants/GlobalStyleSheet';
import AuthScreen from './screens/Auth/AuthScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ScannedList from './screens/Scanning/components/ScannedListScreen';
import ProfileDetails from './screens/UserProfile/components/ProfileDetails';
import SettingsScreen from './screens/UserProfile/settings/SettingsScreen';

// Change options here when headerShow is not diabled.
// This is the default header style.
const headerOptions: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: 'black',
  },
  headerTintColor: GlobalStyleSheet.themeColor.backgroundColor,
};

const screens = {
  Home: {
    name: 'HomeScreen',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  ProfileDetails: {
    name: 'ProfileDetailsScreen',
    component: ProfileDetails,
    options: {
      title: 'Profile',
      ...headerOptions,
    },
  },

  Settings: {
    name: 'SettingsScreen',
    component: SettingsScreen,
    options: {
      title: 'Settings',
      ...headerOptions,
    },
  },

  // Auth: {
  //   name: 'AuthSceen',
  //   component: AuthScreen,
  //   options: {
  //     ...headerOptions,
  //     headerShown: false,
  //   },
  // },

  ScannedList: {
    name: 'ScannedListScreen',
    component: ScannedList,
    options: {
      title: 'Scanned List',
      ...headerOptions,
    },
  },
};

export default screens;
