import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '../Screens';
import DrawerNavigation from './DrawerNavigation';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import ForgotPass from '../Screens/Auth/ForgotPass';
import UpdatePass from '../Screens/Auth/UpdatePass';
import OtpInputPage from '../Screens/Auth/OtpInputPage';
import UploadGovtID from '../Screens/Auth/UploadGovtId';
import {AppState} from 'react-native'

const Stack = createNativeStackNavigator();

function AuthNavigation() {
  return (

    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{animation: 'none'}}>
     
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login} /><Stack.Screen
          name="Signup"
          options={{ headerShown: false }}
          component={Signup} /><Stack.Screen
          name="ForgotPass"
          options={{ headerShown: false }}
          component={ForgotPass} /><Stack.Screen
          name="UpdatePass"
          options={{ headerShown: false }}
          component={UpdatePass} /><Stack.Screen
          name="OtpInputPage"
          options={{ headerShown: false }}
          component={OtpInputPage} /><Stack.Screen
          name="UploadGovtID"
          options={{ headerShown: false }}
          component={UploadGovtID} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
