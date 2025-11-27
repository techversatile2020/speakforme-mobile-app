import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { MainContainer, PrimaryButton } from '../../../../components';
import { navigationServices, SD } from '../../../../utils';
import { ModalHeader } from '../ModalHeader';
import { VoicesCard } from '../VoicesCard';

export const ChooseStyleModal = ({ visible, onClose }: any) => {
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
        onIconPress={() => {
          navigationServices.goBack();
        }}
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
