import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

/**
 * @description This class includes functions to pick image from the device's gallery or camera
 */
class ImageUtils {
  /**
   * Opens the device's camera to take a picture.
   * @returns ImageInfo object containing the image's path and other information.
   *          Thre `uri` field in ImageInfo object should be used to render the image.
   * @throws Error if the user cancels the image selection.
   */
  static async pickImageFromCamera(): Promise<ImageInfo> {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (result.cancelled === false) return result;
    } catch (error) {
      // console.log('Error: ', error);
      throw error;
    }
  }

  /**
   * Opens the device's gallery to pick an image.
   * @returns ImageInfo object containing the image's path and other information.
   *          Thre `uri` field in ImageInfo object should be used to render the image.
   * @throws Error if the user cancels the image selection.
   */
  static async pickImageFromGallery(): Promise<ImageInfo> {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (result.cancelled === false) return result;
    } catch (error) {
      // console.log('Error: ', error);
      throw error;
    }
  }
}

export default ImageUtils;
