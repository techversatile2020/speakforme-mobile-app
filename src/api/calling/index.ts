import httpService from '../https.service';
import Urls from './api.url';

export const makeCall = async (body: any) => {
  const { data } = await httpService().post(Urls.makeCall, body);
  return data;
};
