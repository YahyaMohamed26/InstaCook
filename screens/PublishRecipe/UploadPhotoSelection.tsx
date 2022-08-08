import React from 'react';
import { Text, Box, Icon, Center, Button, Actionsheet } from 'native-base';
import { Path } from 'react-native-svg';
import { useDisclose } from 'native-base';
import { Foundation, Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider } from 'native-base';

import { MaterialIcons } from '@expo/vector-icons';

function PopFromBottom({ onOpen, onClose, isOpen, takePhoto, uploadPhoto }) {
  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={Foundation}
                color="trueGray.400"
                mr="1"
                size="6"
                name="photo"
              />
            }
            onPress={uploadPhoto}
          >
            Upload a Picture
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                color="trueGray.400"
                mr="1"
                size="6"
                name="add-a-photo"
              />
            }
            onPress={takePhoto}
          >
            Take a Photo
          </Actionsheet.Item>
          <Actionsheet.Item
            p={3}
            onPress={onClose}
            startIcon={
              <Icon
                color="trueGray.400"
                mr="1"
                h="24"
                w="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
              </Icon>
            }
          >
            Cancel
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
export default function UploadPhotoSelection({
  onOpen,
  onClose,
  isOpen,
  takePhoto,
  uploadPhoto,
}) {
  return (
    <NativeBaseProvider>
      <PopFromBottom
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        takePhoto={takePhoto}
        uploadPhoto={uploadPhoto}
      />
    </NativeBaseProvider>
  );
}
