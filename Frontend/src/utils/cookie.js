// utils/cookie.js
import Cookies from 'js-cookie';

export const setAuthCookie = (token) => {
  Cookies.set('auth_token', token, { expires: 1 });  // expires in 1 day
};

export const removeAuthCookie = () => {
  Cookies.remove('auth_token');
};

export const getAuthCookie = () => {
  return Cookies.get('auth_token');
};
