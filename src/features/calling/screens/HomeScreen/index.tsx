import React, { useState } from 'react';
import {
  CustomInput,
  Header,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import { Icons } from '../../../../assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { navigationServices, SD } from '../../../../utils';
import { Formik } from 'formik';
import { View } from 'react-native';
import { CallingRoutes, SettingRoutes } from '../../../../constants';
import { ContactPicker } from '../../components';
import { useSelector } from 'react-redux';

export const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {  user } = useSelector((state: any) => state.auth);

  const handleGoToSettings = () =>
    navigationServices.navigate(SettingRoutes['SettingScreen']);

  return (
    <MainContainer>
      <Header
        mainHeader
        title="Good Morning"
        subHeading={user?.username}
        iconSource={Icons.settings}
        onIconPress={handleGoToSettings}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={SD.hp(50)}
      >
        <Formik
          initialValues={{ recipientsNumber: '', yourNumber: '' }}
          onSubmit={values => {
            navigationServices.navigate(CallingRoutes['CallScreen']);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: SD.hp(60), flex: 1 }}>
                <Text leftSpacing={5} regular size={14}>
                  Type Recipient’s Number
                </Text>
                <CustomInput
                  autoCapitalize="none"
                  value={values.recipientsNumber}
                  onChangeText={handleChange('recipientsNumber')}
                  placeholder="+1 (234) 567 890"
                  isIcon
                  customStyle={{ fontSize: SD.customFontSize(14) }}
                  returnKeyType="next"
                  error={
                    touched.recipientsNumber && errors.recipientsNumber
                      ? errors.recipientsNumber
                      : undefined
                  }
                  keyboardType="phone-pad"
                  iconImage={Icons.contact}
                  iconImageStyles={{
                    width: SD.wp(24),
                    height: SD.wp(24),
                  }}
                  isPressableIcon
                  onBtnPress={() => setModalVisible(true)}
                />
                <Text leftSpacing={5} regular size={14} topSpacing={20}>
                  Your Number
                </Text>
                <CustomInput
                  value={values.yourNumber}
                  onChangeText={handleChange('yourNumber')}
                  placeholder="+1 (234) 567 890"
                  customStyle={{ fontSize: SD.customFontSize(14) }}
                  returnKeyType="done"
                  error={
                    touched.yourNumber && errors.yourNumber
                      ? errors.yourNumber
                      : undefined
                  }
                  keyboardType="phone-pad"
                />
              </View>
              <PrimaryButton title={'Start Call'} onPress={handleSubmit} />
              <ContactPicker
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelect={contact =>
                  setFieldValue('recipientsNumber', contact.phoneNumber)
                }
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};
