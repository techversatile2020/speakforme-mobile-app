import React, { ReactNode } from 'react';
import {
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { SD } from '../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';

type MainContainerProps = {
  children?: ReactNode;
  customeStyle?: StyleProp<ViewStyle>;
  hidden?: boolean;
  mainContainerStyle?: StyleProp<ViewStyle>;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  barBg?: string;
  isFlatList?: boolean;
  coverWholeScreen?: boolean;
};

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  customeStyle,
  hidden = false,
  mainContainerStyle,
  barStyle = 'dark-content',
  barBg,
  isFlatList,
  coverWholeScreen = false,
}) => {
  const { AppTheme } = useTheme();

  const Wrapper = coverWholeScreen ? View : SafeAreaView;

  return (
    // <SafeAreaView
    //   style={[
    //     { flex: 1, backgroundColor: AppTheme.background },
    //     mainContainerStyle,
    //   ]}
    // >
    //   <StatusBar
    //     hidden={hidden}
    //     barStyle={barStyle}
    //     backgroundColor={barBg || AppTheme.background}
    //   />
    //   {!isFlatList ? (
    //     <View style={[styles.container, customeStyle]}>{children}</View>
    //   ) : (
    //     <View style={[styles.container, customeStyle]}>{children}</View>
    //   )}
    // </SafeAreaView>
    <Wrapper
      style={[
        { flex: 1, backgroundColor: AppTheme.background },
        mainContainerStyle,
      ]}
    >
      <StatusBar
        hidden={hidden}
        translucent={coverWholeScreen} // Allow content behind status bar
        barStyle={barStyle}
        backgroundColor={
          barBg || (coverWholeScreen ? 'transparent' : AppTheme.background)
        }
      />

      <View
        style={[
          styles.container,
          coverWholeScreen && { paddingTop: 0, paddingBottom: 0 }, // remove safe padding
          customeStyle,
        ]}
      >
        {children}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SD.wp(20),
    paddingTop: SD.hp(10),
  },
});
