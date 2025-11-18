import { StyleSheet } from 'react-native';
import { lightColors } from '../../../../theme/colors';
import { SD } from '../../../../utils';

export const createStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    resendButton: {
      alignSelf: 'flex-end',
      marginVertical: SD.hp(10),
    },
  });
