import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import {
  AudioPlayer,
  CustomModal,
  PrimaryButton,
} from '../../../../components';
import { ModalHeader } from '../ModalHeader';
import { SD } from '../../../../utils';
import { VoicesCard } from '../VoicesCard';

export const ChooseStyleModal = ({ visible, onClose }: any) => {
  const [selectedVoice, setSelectedVoice] = useState(null);

  const voicesCardData = [
    {
      id: 1,
      title: 'English (United States)',
      subTitle: 'en-US',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: 2,
      title: 'English (United States)',
      subTitle: 'en-US',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: 3,
      title: 'English (United States)',
      subTitle: 'en-US',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
  ];

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      type="bottomsheet"
      modalHeight="80%"
    >
      <ModalHeader
        title="Choose a Style"
        subTitle="Pick a speaking style that feels right."
        onIconPress={onClose}
      />
      <View style={{ flex: 1, marginTop: SD.hp(30) }}>
        <FlatList
          data={voicesCardData}
          renderItem={({ item, index }) => (
            <VoicesCard
              data={item}
              isSelected={selectedVoice == item.id}
              setSelectedVoice={setSelectedVoice}
              voice
            />
          )}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: SD.hp(100) }}
        />
        <PrimaryButton
          title={'Save'}
          customStyles={{
            bottom: 30,
            position: 'absolute',
            width: '100%',
            alignSelf: 'center',
          }}
        />
      </View>
    </CustomModal>
  );
};
