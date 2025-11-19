import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import {
  CustomInput,
  CustomModal,
  PrimaryButton,
} from '../../../../components';
import { ModalHeader } from '../ModalHeader';
import { SD } from '../../../../utils';
import { Icons } from '../../../../assets';
import { VoicesCard } from '../VoicesCard';

export const ChooseVoiceModal = ({ visible, onClose }: any) => {
  const [search, setSearch] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(null);

  const voicesCardData = [
    {
      id: 1,
      title: 'Amy',
      subTitle: 'Soft & Clear',
    },
    {
      id: 2,
      title: 'Brian',
      subTitle: 'Deep Male Voice',
    },
    {
      id: 3,
      title: 'Emma',
      subTitle: 'Natural Female',
    },
    {
      id: 4,
      title: 'Eric',
      subTitle: 'Warm Male',
    },
    {
      id: 5,
      title: 'Jennifer',
      subTitle: 'Friendly Female',
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
        title="Choose a Voice"
        subTitle="Pick the voice that best matches your style."
        onIconPress={onClose}
      />
      <View style={{ flex: 1, marginTop: SD.hp(30) }}>
        <CustomInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          leftIconSource={Icons.search}
          isIcon
          containerStyle={{ borderRadius: 8 }}
        />
        <FlatList
          data={voicesCardData}
          renderItem={({ item, index }) => (
            <VoicesCard
              data={item}
              isSelected={selectedVoice == item.id}
              setSelectedVoice={setSelectedVoice}
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
