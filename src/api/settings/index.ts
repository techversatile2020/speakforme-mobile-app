import Urls from './api.url';
import httpService from '../https.service';

export const changeUserPassword = (body: any) => {
  return httpService().patch(Urls.changePassword, body);
};

export const updateProfile = (body: any) => {
  return httpService().patch(Urls.updateProfile, body);
};

export const deleteUserAccount = () => {
  return httpService().delete(Urls.deleteUser);
};
