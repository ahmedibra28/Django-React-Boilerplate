import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_CONRIM_SUCCESS,
  RESET_PASSWORD_CONRIM_FAILED,
} from "../actions/types";
import { createMessage, returnErrors } from "./messageActions";
import axios from "axios";

// const url = `http://192.168.8.250:80/`;
const url = `http://127.0.0.1:8000/`;

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get(`${url}rest-auth/user/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
}; 

// LOGIN USER
export const login = (values) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(`${url}rest-auth/login/`, values, config)
    .then((res) => {

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,

      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAILED,
      });
    });
};

// REGISER USER
export const register = (values) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(`${url}rest-auth/registration/`, values, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(createMessage(res.data))
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAILED,
      });
    });
};

// CHANGE PASSWORD
export const change_password = (values) => (
  dispatch,
  getState
) => {
  // const body = JSON.stringify({ old_password, new_password });
  axios
    .post(`${url}rest-auth/password/change/`, values, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage({
          changePassword: "Password Changed",
        })
      );
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CHANGE_PASSWORD_FAILED,
      });
    });
};

// RESET PASSWORD
export const reset_password = ( email ) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };


  axios
    .post(`${url}rest-auth/password/reset/`, email, config)
    .then((res) => {
      dispatch(
        createMessage({
          resetPassword: "Password Reset",
        })
      );
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};


// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post(`${url}rest-auth/logout/`, null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
        
      });
      // dispatch(createMessage(res.data))
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `token ${token}`;
  }
  return config;
};
