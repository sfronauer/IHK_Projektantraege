import ResponseData from './ResponseData';
import { getCookie } from 'cookies-next/client';

class RequestHandler {
  static async getData(endpoint, user) {
    try {
      const jwt = getCookie('token');
      const response = await fetch(`/api/${endpoint}${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const json = await response.json();
      return new ResponseData(false, json);
    } catch (error) {
      return new ResponseData(true, {});
    }
  }

  static async postData(data, endpoint) {
    try {
      const jwt = getCookie('token');
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      const json = await response.json();
      return new ResponseData(false, json);
    } catch (error) {
      return new ResponseData(true, {});
    }
  }

  static async updateData(data, endpoint, username) {
    try {
      const jwt = getCookie('token');
      const response = await fetch(username != ' ' ? `/api/${endpoint}${username}` : `/api/${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      return new ResponseData(false, response.getData);
    } catch (error) {
      return new ResponseData(true, {});
    }
  }

  static async finalizeData(data, endpoint, username, ok) {
    try {
      const jwt = getCookie('token');
      const response = await fetch(`/api/${endpoint}?ldapUsernameStudent=${username}&accepted=${ok}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      return new ResponseData(false, response.getData);
    } catch (error) {
      return new ResponseData(true, {});
    }
  }
}

export default RequestHandler;
