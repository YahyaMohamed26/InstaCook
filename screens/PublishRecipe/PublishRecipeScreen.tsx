import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { useDisclose } from 'native-base';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import RecipesApi from '../../api/recipesApi';
import GlobalStyleSheet from '../../constants/GlobalStyleSheet';
import Ingredient from '../../models/ingredient';
import Recipe from '../../models/recipe';
import db from '../../services/db/db';
import { storage } from '../../services/firebase';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';
import { publishPost } from '../../store/slices/postsSlice';
import PublishRecipeTabs from './PublishRecipeTabs';
import UploadPhotoSelection from './UploadPhotoSelection';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface Details {
  calorie: string;
  time: string;
  quantity: string;
}

const PublishRecipeMain = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageTaken, setImageTaken] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useAppDispatch();

  const emptyPost: Recipe = {
    title: '',
    description: '',
    calorieInfo: '',
    image: '',
    tags: [],
    ingredients: [],
    directions: [],
    time: 0,
    likes: 0,
    missedIngredientCount: 0,
    id: '',
    isPublishedByUser: true,
  };

  const [recipeDetails, setRecipeDetails] = useState<Recipe>(emptyPost);

  const user = useAppSelector(selectUser);

  const goBack = () => {
    navigation.goBack();
  };

  const onPublish = async () => {
    recipeDetails.image = imageUrl;
    if (JSON.stringify(emptyPost) === JSON.stringify(recipeDetails)) {
      alert('Please fill in all the fields');
      return;
    }
    if (recipeDetails.image === '') {
      recipeDetails.image = RecipesApi.getIngredientUrl(recipeDetails.title);
    }
    const publishedRecipe = await dispatch(
      publishPost({ userId: user.id, recipe: recipeDetails })
    );
    goBack();
  };

  const openPhotoSelection = () => {
    setModalVisible(true);
  };
  const uploadPhoto = () => {
    console.log('asdlfkjsljdfjlk');
    pickImage();
    setModalVisible(false);
  };
  const takeAPhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.cancelled === false) {
        setImage(result.uri);
        setModalVisible(false);
        const fileName = result.uri.substring(result.uri.lastIndexOf('/') + 1);
        const storageRef = ref(storage, fileName);
        setImageUrl(fileName);

        const img = await fetch(result.uri);
        const bytes = await img.blob();

        const uploadTask = uploadBytesResumable(storageRef, bytes);

        recipeDetails.image = fileName;

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (error) => console.log(error),
          () => {
            console.log('err');
          }
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      const fileName = result.uri.substring(result.uri.lastIndexOf('/') + 1);
      const storageRef = ref(storage, fileName);
      setImageUrl(fileName);
      const img = await fetch(result.uri);
      const bytes = await img.blob();

      const uploadTask = uploadBytesResumable(storageRef, bytes);
      recipeDetails.image = fileName;

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
          console.log('err');
        }
      );
    }
  };

  const setIngredientList = (list: Array<Ingredient>) => {
    setRecipeDetails({ ...recipeDetails, ingredients: list });
  };

  const setDirectionList = (list: Array<string>) => {
    setRecipeDetails({ ...recipeDetails, directions: list });
  };

  const setTabList = (list: Array<string>) => {
    setRecipeDetails({ ...recipeDetails, tags: list });
  };

  const setDetails = (details: Details) => {
    console.log('details of the recipe', details);
    recipeDetails.calorieInfo = details.calorie;
    recipeDetails.time = +details.time;
    //recipeDetails.quantity = details.quantity;

    console.log('calorie', recipeDetails.calorieInfo);
  };

  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <View style={styles.container}>
      <View style={styles.pictureView}>
        <ImageBackground style={styles.image} source={{ uri: image }}>
          <TouchableOpacity
            onPress={() => {
              onOpen();
              uploadPhoto();
            }}
            style={{
              position: 'absolute',
              bottom: 100,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <AntDesign
              style={{ alignSelf: 'center' }}
              name="picture"
              size={24}
              color="white"
            />
            <Text style={{ fontSize: 16, color: 'white' }}>Upload a Photo</Text>
          </TouchableOpacity>
          <View style={styles.backBtnContainer}>
            <TouchableOpacity style={styles.backBtn} onPress={goBack}>
              <Entypo name="chevron-left" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPublish}
              style={{
                elevation: 4,
                height: 40,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 20,
                alignSelf: 'flex-end',
              }}
            >
              <Text style={{ fontSize: 16, color: 'white' }}>Publish</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.infoView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginTop: height / 12 + 20,
          }}
        >
          <PublishRecipeTabs
            currentDetails={recipeDetails}
            setIngredients={setIngredientList}
            setDirections={setDirectionList}
            setTabs={setTabList}
            setDetails={(item) => setDetails(item)}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.descriptionView}>
          <TextInput
            style={{
              fontSize: 16,
              borderColor: 'lightgray',
              borderBottomWidth: 1,
              height: height / 17,
              width: width / 2.3,
              textAlign: 'center',
            }}
            onChangeText={(val) => (recipeDetails.title = val)}
            placeholder="Name of the Recipe"
          ></TextInput>
          <TextInput
            multiline
            numberOfLines={3}
            maxLength={90}
            placeholder="Description"
            onChangeText={(val) => (recipeDetails.description = val)}
            style={{
              fontSize: 14,
              width: width / 2.3,
              height: height / 11,
              textAlign: 'center',
              color: 'gray',
            }}
          ></TextInput>
        </View>
        <View style={styles.detailsView}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <AntDesign name="clockcircleo" size={20} color="orange" />
            <TextInput
              style={{
                fontSize: 16,
                borderColor: 'lightgray',
                borderRadius: 10,
                borderWidth: 1,
                height: height / 17,
                textAlign: 'center',
                marginHorizontal: 10,
                padding: 5,
                width: 70,
              }}
              onChangeText={(val) => (recipeDetails.time = +val)}
              placeholder="Time"
              keyboardType="number-pad"
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Ionicons name="flame" size={20} color="orange" />
            <TextInput
              style={{
                fontSize: 16,
                borderColor: 'lightgray',
                borderRadius: 10,
                borderWidth: 1,
                height: height / 17,
                textAlign: 'center',
                marginHorizontal: 10,
                padding: 5,
                width: 70,
              }}
              onChangeText={(val) => (recipeDetails.calorieInfo = val)}
              placeholder="Calorie"
              keyboardType="number-pad"
            ></TextInput>
          </View>
        </View>
      </View>
      <UploadPhotoSelection
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        takePhoto={takeAPhoto}
        uploadPhoto={uploadPhoto}
      ></UploadPhotoSelection>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    width: width,
    height: height,
  },
  pictureView: {
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    width: width,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: width,
    resizeMode: 'cover',
  },
  topViewBox: {
    flex: 1,
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    height: 150,
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  topViewTextStyle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tagBox: {
    borderRadius: 10,
    height: 30,
    width: width / 5,
    padding: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  tagText: {
    fontSize: 10,
  },
  descriptionView: {
    backgroundColor: 'white',
    height: height / 6,
    width: width / 2,
    borderRadius: 30,
    bottom: -height / 3 + height / 3 + 20 + height / 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  detailsView: {
    backgroundColor: 'white',
    height: height / 6,
    width: width / 2.8,
    borderRadius: 30,
    bottom: -height / 3 + height / 3 + 20 + height / 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  infoView: {
    backgroundColor: 'white',
    width: width,
    height: (2.3 * height) / 3,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    top: height / 3 - 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    marginVertical: 10,
    width: width / 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  backBtnContainer: {
    ...tailwind(
      'absolute w-full flex flex-row justify-between items-center top-8 px-4'
    ),
  },
  backBtn: {
    ...tailwind('p-2 rounded-full'),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default PublishRecipeMain;
