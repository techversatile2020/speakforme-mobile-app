import React, { useState } from 'react';
import {
  CustomInput,
  Header,
  Image,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import { useTheme } from '../../../../theme';
import { createStyles } from './styles';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { BasicCommunicationCard } from '../../components';
import { basicCommunicationData, duringCallData } from './data';
import { Icons } from '../../../../assets';
import { SD } from '../../../../utils';
import { useEndCall, useSendMessage } from '../../../../hooks';

export const CallScreen = ({ route }: any) => {
  const { AppTheme } = useTheme();
  const styles = createStyles(AppTheme);
  const [text, setText] = useState('');
  const { data } = route?.params || {};

  const { mutate: sendCallMessage, isPending } = useSendMessage();
  const { mutate: endCall } = useEndCall();
  const handleSendCallMessage = () => {
    if (!text) return;
    sendCallMessage({
      tokenId: data?.tokenid,
      callId: data?.callid,
      message: text,
    });
  };

  const handleEndCall = () => {
    endCall({
      tokenId: data?.tokenid,
      callId: data?.callid,
    });
  };
  return (
    <MainContainer>
      <Header />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text bold size={26} bottomSpacing={10}>
          Type, so others can hear!
        </Text>
        <CustomInput
          value={text}
          onChangeText={setText}
          placeholder="Type here..."
          containerStyle={styles.inputContainerStyles}
          multiline
          customStyle={styles.inputStyles}
        />
        <View style={styles.cardView}>
          <Text regular size={11}>
            Basic Communication
          </Text>
          <FlatList
            data={basicCommunicationData}
            renderItem={({ item }) => (
              <BasicCommunicationCard data={item} setText={setText} />
            )}
            keyExtractor={item => item?.id?.toString()}
            contentContainerStyle={styles.flatlistContainer}
            numColumns={2}
          />
        </View>
        <View style={[styles.cardView, { height: SD.hp(300) }]}>
          <Text regular size={11}>
            During a Call
          </Text>
          <FlatList
            data={duringCallData}
            renderItem={({ item }) => (
              <BasicCommunicationCard data={item} setText={setText} />
            )}
            keyExtractor={item => item?.id?.toString()}
            contentContainerStyle={styles.flatlistContainer}
            numColumns={2}
          />
        </View>
      </ScrollView>
      <View style={[styles.buttonsView]}>
        <PrimaryButton
          title={'Send'}
          customStyles={styles.sendButtonStyles}
          iconSource={Icons.send}
          fontSize={17}
          onPress={handleSendCallMessage}
          isLoading={isPending}
        />
        <TouchableOpacity
          style={styles.phoneButton}
          activeOpacity={0.7}
          onPress={handleEndCall}
        >
          <Image source={Icons.phone} size={27} />
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};
