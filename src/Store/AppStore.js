import {configureStore} from '@reduxjs/toolkit';
import {authReducer, commonReducer} from './Reducers';
// import { authReducer } from './Reducers/AuthReducer'

export const store = configureStore({
  reducer: {
    authData: authReducer,
    commonData: commonReducer,
  },
});
