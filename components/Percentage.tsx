import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import GlobalStyleSheet from '../constants/GlobalStyleSheet';

interface Props {
  // The percentage value to display
  percentage: number;
  // The label for the given percentage value (e.g. Like)
  percentageLabel: string;
  // The label for other compared item (e.g. Dislike)
  otherLabel: string;
}

/**
 * Renders a percentage bar with the given labels and percentage value
 * @param props
 * @returns
 */
const Percentage: FC<Props> = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={[styles.percentage, { width: props.percentage + '%' }]} />
      </View>
      <View style={styles.labelsContainer}>
        <Text style={styles.percentageLabel}>{props.percentageLabel}</Text>
        <Text style={styles.otherLabel}>{props.otherLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    height: 3,
    backgroundColor: '#ccc',
    width: '100%',
  },
  labelsContainer: {
    ...tailwind('flex-row justify-between items-center'),
  },
  percentageLabel: {
    fontSize: 11,
    color: GlobalStyleSheet.themeColor.backgroundColor,
  },
  otherLabel: {
    fontSize: 11,
  },
  percentage: {
    backgroundColor: GlobalStyleSheet.themeColor.backgroundColor,
    height: 3,
  },
});

export default Percentage;
