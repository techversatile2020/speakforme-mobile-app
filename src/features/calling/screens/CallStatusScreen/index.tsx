import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Icons, Images } from '../../../../assets';
import { Image, Text } from '../../../../components';
import { CallingRoutes } from '../../../../constants';
import { useEndCall } from '../../../../hooks';
import { cleanupCallSocket, onVonageEvent } from '../../../../services';
import { useTheme } from '../../../../theme';
import { navigationServices, SD } from '../../../../utils';

export const CallStatusScreen = ({ route }: any) => {
  const { AppTheme } = useTheme();
  const { phoneNumber, data } = route?.params || {};
  const [status, setStatus] = useState('Connecting...');
  const { mutate: endCall } = useEndCall();
  const handleEndCall = () => {
    endCall({
      tokenId: data?.tokenid,
      callId: data?.callid,
    });
  };

  useEffect(() => {
    onVonageEvent(event => {
      switch (event.status) {
        case 'ringing':
          setStatus('Ringing...');
          break;
        case 'answered':
          setStatus('Answered');
          setTimeout(() => {
            navigationServices.reset_0(CallingRoutes['CallScreen'], {
              data,
            });
          }, 300);
          break;
        case 'started':
          setStatus('Started');
          setTimeout(() => {
            navigationServices.reset_0(CallingRoutes['CallScreen'], {
              data,
            });
          }, 300);
          break;
        case 'failed':
          setStatus('Failed to connect');
          setTimeout(() => {
            cleanupCallSocket();
            navigationServices.reset_0(CallingRoutes['HomeScreen']);
          }, 300);
          break;
        case 'rejected':
          setStatus('Call Declined');
          setTimeout(() => {
            cleanupCallSocket();
            navigationServices.reset_0(CallingRoutes['HomeScreen']);
          }, 300);
          break;
        case 'unanswered':
          setStatus('Not answered');
          setTimeout(() => {
            cleanupCallSocket();
            navigationServices.reset_0(CallingRoutes['HomeScreen']);
          }, 300);
          break;
        case 'timeout':
          setStatus('Failed to connect');
          setTimeout(() => {
            cleanupCallSocket();
            navigationServices.reset_0(CallingRoutes['HomeScreen']);
          }, 300);
          break;
        case 'busy':
          setStatus('Busy');
          setTimeout(() => {
            cleanupCallSocket();
            navigationServices.reset_0(CallingRoutes['HomeScreen']);
          }, 300);
          break;

        case 'completed':
          setStatus('');
          cleanupCallSocket();
          navigationServices.reset_0(CallingRoutes['HomeScreen']);
          break;
        default:
          cleanupCallSocket();
          navigationServices.reset_0(CallingRoutes['HomeScreen']);
      }
    });

    // return cleanupCallSocket;
  }, []);

  return (
    <ImageBackground source={Images.callWallpaper} style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(235, 250, 255, 0.45)',
        }}
      />
      <View style={{ flex: 1, alignItems: 'center', paddingTop: SD.hp(100) }}>
        <Image
          source={Images.profilePlaceholder}
          size={100}
          radius={100}
          styles={{
            backgroundColor: AppTheme.inputBackground,
          }}
        />
        <Text topSpacing={10} bold size={18}>
          {phoneNumber}
        </Text>
        <Text topSpacing={5} regular size={15}>
          {status}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: '50%',
          height: SD.wp(58),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: AppTheme.red,
          borderRadius: 100,
          alignSelf: 'center',
          bottom: SD.hp(50),
          flexDirection: 'row',
          columnGap: SD.wp(10),
        }}
        activeOpacity={0.7}
        onPress={handleEndCall}
      >
        <Image source={Icons.phone} size={27} />
        <Text color={AppTheme.background} bold size={18}>
          End Call
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
