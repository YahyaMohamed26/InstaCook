export default {
  expo: {
    name: 'InstaCook',
    slug: 'InstaCook',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/appIcon.png',
    splash: {
      image: './assets/mainSplash.png',
      resizeMode: 'contain',
      backgroundColor: '#FE6A42',
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission:
            'The app accesses your photos to let you share them with your friends.',
        },
      ],
    ],

    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'host.exp.exponent',
      config: {
        googleSignIn: {
          reservedClientId:
            'com.googleusercontent.apps.1022514908835-gnsjp9o7kpudohicfkct6he7fhak8fdm',
        },
      },
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/appIcon.png',
        backgroundColor: '#F8774A',
      },
      package: 'host.exp.exponent',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      ANDROID_CLIENT_ID:
        '1056653965534-u90bkd49h3r6i7o4g8toftpd3h09agk1.apps.googleusaercontent.com',
      IOS_CLIENT_ID:
        '1056653965534-6j015olrqgdq67d81617c8ric5vmnd62.apps.googleusercontent.com',
    },
  },
};
