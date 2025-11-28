import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import {
  AudioPlayer,
  CustomModal,
  MainContainer,
  PrimaryButton,
} from '../../../../components';
import { ModalHeader } from '../ModalHeader';
import { navigationServices, SD } from '../../../../utils';
import { VoicesCard } from '../VoicesCard';
import { Audios } from '../../../../assets';

export const ChooseStyleModal = () => {
  const [selectedVoice, setSelectedVoice] = useState(null);

  const voicesCardData = [
    {
      id: 1,
      title: 'English (United States)',
      subTitle: 'en-US',
      audio: 'voice1.mp3',
    },
    {
      id: 2,
      title: 'English (United States)',
      subTitle: 'en-US',
      audio: 'voice2.mp3',
    },
    {
      id: 3,
      title: 'English (United States)',
      subTitle: 'en-US',
      audio: 'voice3.mp3',
    },
  ];

  return (
    <MainContainer>
      <ModalHeader
        title="Choose a Style"
        subTitle="Pick a speaking style that feels right."
        onIconPress={() => navigationServices.goBack()}
        containerStyles={{ paddingTop: SD.hp(40) }}
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
    </MainContainer>
  );
};
