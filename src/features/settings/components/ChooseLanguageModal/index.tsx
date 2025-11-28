import React, { useState } from 'react';
import { View } from 'react-native';
import {
  CustomInput,
  MainContainer,
  PrimaryButton,
} from '../../../../components';
import { navigationServices, SD } from '../../../../utils';
import { ModalHeader } from '../ModalHeader';

export const ChooseLanguageModal = () => {
  const [language, setLanguage] = useState(null);

  const languageOptions = [
    { label: 'English (United States)', value: 'en-US' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
  ];
  return (
    <MainContainer>
      <ModalHeader
        title="Choose a Language"
        subTitle="Pick your language to start communicating."
        onIconPress={() => navigationServices.goBack()}
        containerStyles={{ paddingTop: SD.hp(40) }}
      />
      <View style={{ flex: 1, marginTop: SD.hp(30) }}>
        {/* <CustomDropdown
          label="Language"
          data={languageOptions}
          value={language}
          onChange={setLanguage}
          placeholder="Select language"
        />  */}
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
