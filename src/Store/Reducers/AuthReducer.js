import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userDetails: {},
  token: null,
  deviceid: '',
  login_status: false,
  language: 'en',
};

export const authReducer = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setDeviceid: (state, action) => {
      state.deviceid = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.login_status = true;
    },
    setExtraUserDetails: (state, action) => {
      state.userDetails = {...state.userDetails, ...action.payload};
    },
    resetAuthData: state => {
      state.userDetails = {};
      state.token = '';
      state.deviceid = '';
      state.login_status = false;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {
  setToken,
  setUserDetails,
  setExtraUserDetails,
  resetAuthData,
  setDeviceid,
  setLanguage,
} = authReducer.actions;

export default authReducer.reducer;
