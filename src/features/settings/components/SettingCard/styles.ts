import { StyleSheet } from 'react-native';
import { lightColors } from '../../../../theme/colors';
import { SD } from '../../../../utils';

export const createStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: SD.hp(20),
    },
    leftSideView: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: SD.wp(15),
    },
  });
