import { TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '../../../../theme';
import { createStyles } from './styles';
import { Text } from '../../../../components';

export const BasicCommunicationCard = ({ data, setText }: any) => {
  const { AppTheme } = useTheme();
  const styles = createStyles(AppTheme);
  const { text } = data;
  return (
    <TouchableOpacity style={styles.container} onPress={() => setText(text)}>
      <Text centered regular size={14} color={AppTheme.primary}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
