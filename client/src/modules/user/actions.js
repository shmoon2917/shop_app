import { userConstants as type } from './constants';

export const userActions = {
  login,
};

function login(body) {
  return { type: type.LOGIN_REQUEST, payload: body };
}

export const registerUser = (body) => ({
  type: type.REGISTER_USER,
  payload: body,
});

export const authUser = () => ({
  type: type.AUTH_USER,
});

export const clearUser = () => ({
  type: type.CLEAR_USER,
});

export const keepUserLoggedIn = (user) => ({
  type: type.KEEP_USER_LOGGED_IN,
  payload: user,
});
