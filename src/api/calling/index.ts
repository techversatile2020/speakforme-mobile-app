import Urls from './api.url';
import httpService from '../https.service';

export const makeCall = (body: any) => {
  return httpService().post(Urls.makeCall, body);
};

export const sendMessage = (body: any) => {
  return httpService().post(Urls.sendMessage, body);
};

export const endCall = (body: any) => {
  return httpService().post(Urls.endCall, body);
};

export const getVonageVoices = () => {
  return httpService().get(Urls.vonageVoices);
};
