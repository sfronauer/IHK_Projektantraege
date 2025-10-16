import { getCookie } from 'cookies-next/client';
import RequestHandler from '../model/request/RequestHandler';
import { endpoints } from './Constants';

const AuthTokenHelper = async () => {

  const token = getCookie('token');
  if (!token) return null;

  const rep = await RequestHandler.getData(endpoints.VerifyUserToken, '');
  if (rep.data.success) {
    return {
      username: rep.data.data.ldapUsername,
      authenticated: rep.data.data.authenticated,
      role: rep.data.data.role,
      session: token,
    };
  }
  return null;
};

export default AuthTokenHelper;
