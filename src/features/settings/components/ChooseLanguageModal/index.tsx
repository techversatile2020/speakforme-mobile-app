import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import {
  CustomDropdown,
  CustomInput,
  CustomModal,
  PrimaryButton,
} from '../../../../components';
import { ModalHeader } from '../ModalHeader';
import { SD } from '../../../../utils';
import { Icons } from '../../../../assets';
import { VoicesCard } from '../VoicesCard';

export const ChooseLanguageModal = ({ visible, onClose }: any) => {
  const [language, setLanguage] = useState(null);

  const languageOptions = [
    { label: 'English (United States)', value: 'en-US' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
  ];
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      type="bottomsheet"
      modalHeight="90%"
    >
      <ModalHeader
        title="Choose a Language"
        subTitle="Pick your language to start communicating."
        onIconPress={onClose}
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
    </CustomModal>
  );
};
