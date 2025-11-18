import {
  ImageSource,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { lightColors } from '../../theme/colors';
import { useTheme } from '../../theme';
import { Text } from '../text';
import { Image } from '../Image';
import { Icons } from '../../assets';
import { navigationServices, SD } from '../../utils';

type HeaderProps = {
  title?: string;
  hideBackButton?: boolean;
  mainHeader?: boolean;
  subHeading?: string;
  iconSource?: ImageSourcePropType;
  onIconPress?: (d?: any) => void;
};

export const Header = ({
  title,
  hideBackButton,
  mainHeader,
  subHeading,
  onIconPress,
  iconSource,
}: HeaderProps) => {
  const { AppTheme } = useTheme();
  const styles = createStyles(AppTheme);
  const handleGoBack = () => navigationServices.goBack();
  return (
    <View style={styles.container}>
      {mainHeader ? (
        <View style={styles.mainHeaderContainer}>
          <View style={styles.leftSideView}>
            <Text bold size={26}>
              {title}
            </Text>
            <Text regular size={14} color={AppTheme.textSecondary}>
              {subHeading}
            </Text>
          </View>
          {iconSource && (
            <TouchableOpacity style={styles.backButton} onPress={onIconPress}>
              <Image source={iconSource} size={16} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          {!hideBackButton && (
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Image source={Icons.backArrow} size={16} />
            </TouchableOpacity>
          )}
          {title && (
            <Text centered style={styles.title}>
              Forgot Password
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const createStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: SD.hp(15),
    },
    backButton: {
      width: SD.wp(40),
      height: SD.wp(40),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 100,
    },
    title: {
      width: '70%',
    },
    mainHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    leftSideView: {},
  });
