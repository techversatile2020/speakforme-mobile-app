import Toast from 'react-native-toast-message';

function success(message: string) {
  return Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    // topOffset: 50,
  });
}

function fail(message: string) {
  return Toast.show({
    type: 'error',
    text1: 'Request Failed',
    text2: message,
    topOffset: 50,
  });
}

function info(message: string) {
  return Toast.show({
    type: 'info',
    text1: 'Info',
    text2: message,
    topOffset: 50,
  });
}

export const toast = {
  success,
  fail,
  info,
};
