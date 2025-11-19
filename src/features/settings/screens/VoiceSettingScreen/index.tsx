import React, { useState } from 'react';
import { Header, MainContainer, Text } from '../../../../components';
import { Icons } from '../../../../assets';
import {
  ChooseLanguageModal,
  ChooseStyleModal,
  ChooseVoiceModal,
  SettingCard,
} from '../../components';

export const VoiceSettingScreen = () => {
  const [showChooseVoiceModal, setShowChooseVoiceModal] = useState(false);
  const [showChooseStyleModal, setShowChooseStyleModal] = useState(false);
  const [showChooseLanguageModal, setShowChooseLanguageModal] = useState(false);
  const optionsData = [
    {
      id: 1,
      title: 'Choose a Voice',
      subTitle: 'Emma - Natural Female',
      icon: Icons.mic,
      onPress: () => setShowChooseVoiceModal(true),
    },
    {
      id: 2,
      title: 'Choose a Style',
      subTitle: 'English (United States) - en-US ',
      icon: Icons.speakingStyle,
      onPress: () => setShowChooseStyleModal(true),
    },
    {
      id: 3,
      title: 'Choose a Language',
      subTitle: 'English (United States)',
      icon: Icons.language,
      onPress: () => setShowChooseLanguageModal(true),
    },
  ];

  return (
    <MainContainer>
      <Header />

      <Text bold size={26} topSpacing={20} bottomSpacing={20}>
        Voice Settings
      </Text>

      {optionsData.map(item => {
        return <SettingCard key={item?.id?.toString()} data={item} />;
      })}
      <ChooseVoiceModal
        visible={showChooseVoiceModal}
        onClose={() => setShowChooseVoiceModal(false)}
      />

      <ChooseStyleModal
        visible={showChooseStyleModal}
        onClose={() => setShowChooseStyleModal(false)}
      />
      <ChooseLanguageModal
        visible={showChooseLanguageModal}
        onClose={() => setShowChooseLanguageModal(false)}
      />
    </MainContainer>
  );
};
