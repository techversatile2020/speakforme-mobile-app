import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../theme';
import { AudioPlayer, Text } from '../../../../components';
import { SD } from '../../../../utils';

type VoicesCardPropsType = {
  data: {
    title: string;
    subTitle: string;
    id: string | number;
    audio?: string;
  };
  isSelected?: boolean;
  setSelectedVoice?: (d: any) => void;
  voice?: boolean;
};

export const VoicesCard = ({
  data,
  isSelected,
  setSelectedVoice,
  voice,
}: VoicesCardPropsType) => {
  const { AppTheme } = useTheme();
  const { title, subTitle, id, audio } = data || {};
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('IsLoading -> ', isLoading);
  }, [isLoading]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setSelectedVoice?.(id)}
    >
      <View style={[styles.innerContainer, !voice && { alignItems: 'center' }]}>
        <View style={styles.leftSideView}>
          <Text bold size={18}>
            {title}
          </Text>
          <Text regular size={16}>
            {subTitle}
          </Text>
        </View>
        <View
          style={[
            styles.radioButton,
            isSelected && {
              borderColor: AppTheme.primary,
              borderWidth: 7,
            },
          ]}
        />
      </View>
      {voice && (
        <AudioPlayer
          url={audio}
          id={id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#EFF0F7',
    // height: SD.hp(88),
    borderRadius: 16,
    padding: SD.wp(15),
    marginVertical: SD.hp(5),
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SD.hp(10),
  },
  leftSideView: {
    // rowGap:SD.wp(1)
  },
  radioButton: {
    width: SD.wp(28),
    height: SD.wp(28),
    borderWidth: 1,
    borderColor: '#D9DADB',
    borderRadius: 100,
  },
  selectedRadioButton: {},
});
