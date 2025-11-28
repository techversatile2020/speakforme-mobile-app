import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MainContainer, PrimaryButton } from '../../../../components';
import { useGetUserData, useUpdateProfile } from '../../../../hooks';
import { useTheme } from '../../../../theme';
import { navigationServices, SD, toast } from '../../../../utils';
import { ModalHeader } from '../ModalHeader';
import { VoicesCard } from '../VoicesCard';

type Voice = {
  code: string;
  language: string;
  name: string;
  style: string;
  url: string;
};

export const ChooseStyleModal = () => {
  const { AppTheme } = useTheme();
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const { user } = useSelector((state: { auth: any }) => state.auth);
  console.log(user);
  const { data, isLoading, isError, refetch } = useGetUserData();
  const { mutate: updateProfileMutation, isPending } = useUpdateProfile(() =>
    navigationServices.goBack(),
  );
  const handleSave = () => {
    if (!selectedVoice) {
      toast.fail('Please select a voice');
      return;
    }

    // ✅ Mutation call
    updateProfileMutation({
      selectedVoice: {
        code: selectedVoice.code,
        language: selectedVoice.language,
        name: selectedVoice.name,
        style: selectedVoice.style,
        url: selectedVoice.url,
      },
    });
  };

  useEffect(() => {
    if (user.selectedVoice) {
      setSelectedVoice(user?.selectedVoice);
    }
  }, [user]);

  return (
    <MainContainer>
      <ModalHeader
        title="Choose a Style"
        subTitle="Pick a speaking style that feels right."
        onIconPress={() => navigationServices.goBack()}
        containerStyles={{ paddingTop: SD.hp(40) }}
      />
      <View style={{ flex: 1, marginTop: SD.hp(30) }}>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color={AppTheme.primary} />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <VoicesCard
                data={item}
                isSelected={selectedVoice?.url == item?.url}
                setSelectedVoice={setSelectedVoice}
                voice
              />
            )}
            keyExtractor={item => item?.url?.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: SD.hp(60) }}
          />
        )}

        <PrimaryButton
          title={'Save'}
          onPress={handleSave}
          isLoading={isPending}
          customStyles={{
            marginTop: SD.hp(10),
            width: '100%',
            alignSelf: 'center',
          }}
        />
      </View>
    </MainContainer>
  );
};
