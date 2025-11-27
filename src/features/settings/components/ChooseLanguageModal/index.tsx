import React, { useState } from 'react';
import { View } from 'react-native';
import {
  CustomInput,
  MainContainer,
  PrimaryButton,
} from '../../../../components';
import { navigationServices, SD } from '../../../../utils';
import { ModalHeader } from '../ModalHeader';

export const ChooseLanguageModal = ({ visible, onClose }: any) => {
  const languageOptions = [
    { label: 'English (United States)', value: 'en-US' },
  ];
  const [language, setLanguage] = useState(languageOptions[0]);
  return (
    <MainContainer>
      <ModalHeader
        title="Choose a Language"
        subTitle="Pick your language to start communicating."
        onIconPress={() => {
          navigationServices.goBack();
        }}
      />
      <View style={{ flex: 1, marginTop: SD.hp(30) }}>
        {/* <CustomDropdown
          label="Language"
          data={languageOptions}
          value={language}
          onChange={setLanguage}
          placeholder="Select language"
        /> */}
        <CustomInput value="English (United States)" editable={false} />
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
