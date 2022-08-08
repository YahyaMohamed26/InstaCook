import { Entypo } from '@expo/vector-icons';
import { HStack, Icon, IconButton, Text } from 'native-base';
import React, { FC } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import tailwind from 'tailwind-rn';
import GlobalStyleSheet from '../constants/GlobalStyleSheet';

interface IProps {
  value: number;
  increment: () => void;
  decrement: () => void;
  containerStyles?: ViewStyle;
}
export const IncDecButton: FC<IProps> = (props) => {
  const { containerStyles } = props;
  return (
    <HStack space={2} style={[styles.hStackStyle, containerStyles]}>
      <IconButton
        colorScheme="trueGray"
        style={styles.decrementButton}
        icon={
          <Icon
            as={Entypo}
            name="minus"
            size="sm"
            color={GlobalStyleSheet.themeColor.backgroundColor}
          />
        }
        onPress={props.decrement}
      />
      <Text fontSize={16} textAlign="center">
        {props.value}
      </Text>
      <IconButton
        colorScheme="trueGray"
        style={styles.incrementButton}
        icon={
          <Icon
            as={Entypo}
            name="plus"
            size="sm"
            color={GlobalStyleSheet.themeColor.backgroundColor}
          />
        }
        onPress={props.increment}
      />
    </HStack>
  );
};

const styles = StyleSheet.create({
  hStackStyle: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: GlobalStyleSheet.themeColor.backgroundColor,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  incrementButton: {
    borderColor: 'orange',
    width: 20,
    height: 20,

    ...tailwind('flex flex-row justify-center items-center'),
  },
  decrementButton: {
    borderColor: 'orange',
    width: 20,
    height: 20,
    ...tailwind('flex flex-row justify-center items-center'),
  },
});

export default IncDecButton;
