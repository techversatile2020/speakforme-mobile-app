import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStyles } from './styles';
import { useTheme } from '../../theme';

export const UnderDevelopmentScreen = () => {
    const {AppTheme} = useTheme();
    const styles = createStyles(AppTheme)
  return (
    <View style={styles.container}>
      <Text>Screen is under development</Text>
    </View>
  )
}
