import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dashboardDetails: {},
  appLanguage: 'en',
  following: false, // Add following state
};

export const commonReducer = createSlice({
  name: 'commonData',
  initialState,
  reducers: {
    setDashboardDetails: (state, action) => {
      state.dashboardDetails = action.payload;
    },
    setAppLanguage: (state, action) => {
      state.appLanguage = action.payload;
    },
    followUser: state => {
      // Add new action to toggle follow status
      state.following = !state.following;
    },
  },
});

export const {setDashboardDetails, setAppLanguage, followUser} =
  commonReducer.actions;

export default commonReducer.reducer;
