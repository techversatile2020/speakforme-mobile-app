import { StyleSheet } from 'react-native';
import { lightColors } from '../../../../theme/colors';
import { SD } from '../../../../utils';

export const createStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    contentContainer: {
      // flex: 1,
      marginTop: SD.hp(10),
    },
    inputContainerStyles: {
      height: SD.hp(200),
      width: '100%',
      paddingLeft: SD.wp(10),
      paddingRight: SD.wp(10),
      padding: SD.wp(10),
    },
    inputStyles: {
      width: '100%',
    },
    cardView: {
      marginTop: SD.hp(20),
      // flexDirection: 'row',
      // flexWrap: 'wrap',
    },
    flatlistContainer: {
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      width: '100%',
    },
    buttonsView: {
      position: 'absolute',
      bottom: 10,
      backgroundColor: 'transparent',
      width: '100%',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    phoneButton: {
      width: SD.wp(58),
      height: SD.wp(58),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.red,
      borderRadius: 100,
      // marginRight:SD.wp(5)
    },
    sendButtonStyles: {
      width: '80%',
      height: SD.wp(58),
    },
  });
