import React from 'react';
import { Icons } from '../../../../assets';
import { Header, MainContainer, Text } from '../../../../components';
import { SettingsModalRoutes } from '../../../../constants';
import { navigationServices } from '../../../../utils';
import { SettingCard } from '../../components';

export const VoiceSettingScreen = () => {
  const optionsData = [
    {
      id: 1,
      title: 'Choose a Voice',
      subTitle: 'Emma - Natural Female',
      icon: Icons.mic,
      // onPress: () => setShowChooseVoiceModal(true),
      onPress: () =>
        navigationServices.navigate(SettingsModalRoutes['ChooseVoice']),
    },
    {
      id: 2,
      title: 'Choose a Style',
      subTitle: 'English (United States) - en-US ',
      icon: Icons.speakingStyle,
      // onPress: () => setShowChooseStyleModal(true),
      onPress: () =>
        navigationServices.navigate(SettingsModalRoutes['ChooseStyle']),
    },
    {
      id: 3,
      title: 'Choose a Language',
      subTitle: 'English (United States)',
      icon: Icons.language,
      // onPress: () => setShowChooseLanguageModal(true),
      onPress: () =>
        navigationServices.navigate(SettingsModalRoutes['ChooseLanguage']),
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
    </MainContainer>
  );
};
