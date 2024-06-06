import {StyleSheet, Text, View} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/Store/AppStore';
import {ThemeProvider} from './src/Constants/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/Navigation/MainNavigation';
import NavigationService from './src/Services/Navigation';
import {
  PESDK,
  PhotoEditorModal,
  Configuration,
} from 'react-native-photoeditorsdk';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setToken, setUserDetails} from './src/Store/Reducers/AuthReducer';
import {SplashScreen} from './src/Screens';
import AuthNavigation from './src/Navigation/AuthNavigation';
import {getData} from './src/Services/LocalStorage';
import {I18nextProvider} from 'react-i18next';
import i18next from './src/Utils/i18.config';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
export const navRef = createRef();
export const isReady = createRef();
const Stack = createNativeStackNavigator();

const App = () => {
  const {login_status, userDetails, token, deviceid} = useSelector(
    state => state.authData,
  );
  const dispatch = useDispatch();
  const [LoderStatus, setLoderStatus] = useState(true);

  const checkUser = async () => {
    let result = await getData('account');
    let resulttoken = await getData('token');
    // const headerHeight = useHeaderHeight();
    if (result && resulttoken) {
      dispatch(setUserDetails(result));
      dispatch(setToken(resulttoken));
    }
    setLoderStatus(false);
  };
  useEffect(() => {
    checkUser();
  }, []);
  React.useEffect(() => {
    return () => (isReady.current = false);
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
           const token =await messaging().getToken();
  
    }
    }

useEffect(()=>{
  requestUserPermission();
  messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', 
      
    );
  });
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

  return unsubscribe;
},[]);

  if (LoderStatus) return <SplashScreen />;

  return (
    <View style={{flex: 1}}>
      <AutocompleteDropdownContextProvider>
        <I18nextProvider i18n={i18next}>
          <ThemeProvider>
            <NavigationContainer 
              onReady={() => (isReady.current = true)}
              ref={r => NavigationService.setTopLevelNavigator(r)}>
              <Stack.Navigator
                initialRouteName="AuthNavigation"
                screenOptions={{
                  animation: 'none',
                  headerShown: false,
                }}>
             
                {login_status == false ? (
                  <Stack.Screen
                    name="AuthNavigation"
                    component={AuthNavigation}
                  />
                ) : (
                  <Stack.Screen
                    name="MainNavigation"
                    component={MainNavigation}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </I18nextProvider>
      </AutocompleteDropdownContextProvider>
    </View>
  );
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
const styles = StyleSheet.create({});
