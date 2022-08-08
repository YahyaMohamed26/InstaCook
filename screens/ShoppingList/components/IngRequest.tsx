import { Button, HStack, Spacer, View } from 'native-base';
import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import GlobalStyleSheet from '../../../constants/GlobalStyleSheet';
import IngredientRequest from '../../../models/ingReq';
import TimeSelector from './timeSelector';

interface IProps {
  ingRequest: IngredientRequest;
}
const IngRequest: FC<IProps> = (props) => {
  const { ingRequest } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [pickedTime, setTime] = React.useState(0);
  const acceptRequest = () => {
    setIsOpen(true);
  };

  const onModalClosed = (val: number) => {
    setIsOpen(false);
    setTime(val);
  };

  return (
    <View style={styles.reqItem}>
      <TimeSelector isOpen={isOpen} onPress={onModalClosed} />
      <HStack space={2} style={styles.hStackStyle}>
        <Text style={styles.descriptionStyle}>
          <Text style={GlobalStyleSheet.title3}>{ingRequest.userName} </Text>
          <Text style={styles.descriptionStyle}>wants {ingRequest.item}</Text>
        </Text>
        <Spacer />
        <Button
          colorScheme="orange"
          style={styles.buttonStyle}
          onPress={acceptRequest}
        >
          <Text style={styles.textStyle}>Accept</Text>
        </Button>
        <Button
          colorScheme="orange"
          variant="outline"
          style={styles.rejectButtonStyle}
        >
          <Text style={styles.rejectTextStyle}>Reject</Text>
        </Button>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  reqItem: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonStyle: {
    borderWidth: 2,
    borderRadius: 20,
    width: 75,
    height: 40,
    borderColor: 'white',
  },
  rejectButtonStyle: {
    borderWidth: 2,
    borderRadius: 20,
    width: 75,
    height: 40,
    borderColor: 'orange',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  rejectTextStyle: {
    color: 'orange',
    fontWeight: 'bold',
  },

  descriptionStyle: {
    fontSize: 15,
    width: '50%',
  },
  hStackStyle: {
    alignItems: 'center',
  },
});
export default IngRequest;
