import { Formik } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSelector } from 'react-redux';
import { Icons } from '../../../../assets';
import {
  CustomInput,
  Header,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import { CallingRoutes, SettingRoutes } from '../../../../constants';
import { useMakeCall } from '../../../../hooks';
import { getGreeting, navigationServices, SD } from '../../../../utils';
import { ContactPicker } from '../../components';

export const HomeScreen = () => {
  const { user } = useSelector((state: any) => state.auth);
  const greeting = getGreeting();

  const [modalVisible, setModalVisible] = useState(false);

  const { mutate: makeCall, isPending } = useMakeCall();

  const handleGoToSettings = () =>
    navigationServices.navigate(SettingRoutes['SettingScreen']);

  const formatPhoneNumber = (text: string) => {
    // Remove everything except digits
    const digits = text.replace(/\D/g, '');

    // Ensure we only take 10 digits max
    const limited = digits.slice(0, 10);

    // Format based on length
    if (limited.length === 0) return '';
    if (limited.length <= 3) return `(${limited}`;
    if (limited.length <= 6)
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(
      6,
    )}`;
  };

  function normalizePhoneNumber(num: any) {
    // Remove all non-digits
    const digits = num.replace(/\D/g, '');
    // Prepend country code +1 (assuming US numbers)
    return `+1${digits}`;
  }
  return (
    <MainContainer>
      <Header
        mainHeader
        title={greeting}
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
          initialValues={{
            // recipientsNumber: '4697577367',
            // yourNumber: '3463271231',
            recipientsNumber: '03090126236',
            yourNumber: '03322765604',
          }}
          onSubmit={values => {
            let makeCallPayload = {
              // to_number: normalizePhoneNumber(values.recipientsNumber),
              // self_number: normalizePhoneNumber(values.yourNumber),
              to_number: '03090126236',
              self_number: '03322765604',
            };
            makeCall(makeCallPayload);
          }}
        >
          {({ handleSubmit, values, errors, touched, setFieldValue }) => (
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: SD.hp(60), flex: 1 }}>
                <Text leftSpacing={5} regular size={14}>
                  Type Recipient’s Number
                </Text>
                <CustomInput
                  leftPrefix="+1"
                  autoCapitalize="none"
                  value={values.recipientsNumber}
                  // onChangeText={handleChange('recipientsNumber')}
                  onChangeText={text => {
                    setFieldValue('recipientsNumber', formatPhoneNumber(text));
                  }}
                  placeholder="(919) 555 8247"
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
                  leftPrefix="+1"
                  value={values.yourNumber}
                  // onChangeText={handleChange('yourNumber')}
                  onChangeText={text =>
                    setFieldValue('yourNumber', formatPhoneNumber(text))
                  }
                  placeholder="(919) 555 8247"
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
              <PrimaryButton
                title={'Start Call'}
                onPress={handleSubmit}
                isLoading={isPending}
              />
              <ContactPicker
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelect={contact => {
                  // setFieldValue('recipientsNumber', contact.phoneNumber)
                  let num = contact.phoneNumber;

                  // Remove all spaces, hyphens, etc.
                  // num = num.replace(/\s|-/g, '');

                  // If number starts with +something, remove it
                  if (num.startsWith('+')) {
                    // remove +countryCode (keep last 10 digits typically)
                    num = num.replace(/^\+\d+/, '');
                  }

                  setFieldValue('recipientsNumber', num);
                }}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};
