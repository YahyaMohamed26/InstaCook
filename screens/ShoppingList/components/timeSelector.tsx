import React, { FC } from 'react';
import { AlertDialog, Button, Center, NativeBaseProvider } from 'native-base';
import { Text, StyleSheet } from 'react-native';

interface IProps {
  isOpen: boolean;
  onPress: (pickedTime: number) => void;
}

export const TimeSelector: FC<IProps> = (props) => {
  const cancelRef = React.useRef(null);
  return (
    <Center>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={props.isOpen}>
        <AlertDialog.Content>
          <AlertDialog.Header>Ingredient Pick Up Time</AlertDialog.Header>
          <AlertDialog.Body>
            When would you like to provide the ingredient?
          </AlertDialog.Body>
          <Button.Group space={2} style={styles.groupStyle}>
            <Button
              variant="outline"
              colorScheme="orange"
              onPress={() => props.onPress(5)}
              ref={cancelRef}
            >
              5 mins
            </Button>
            <Button
              variant="outline"
              colorScheme="orange"
              onPress={() => props.onPress(10)}
              ref={cancelRef}
            >
              10 mins
            </Button>
            <Button
              variant="outline"
              colorScheme="orange"
              onPress={() => props.onPress(15)}
              ref={cancelRef}
            >
              15 mins
            </Button>
          </Button.Group>
          <AlertDialog.Footer>
            <Button
              variant="unstyled"
              colorScheme="red"
              onPress={() => props.onPress(0)}
              ref={cancelRef}
            >
              Cancel
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

const styles = StyleSheet.create({
  groupStyle: {
    marginBottom: 7,
    justifyContent: 'center',
  },
});

export default TimeSelector;
