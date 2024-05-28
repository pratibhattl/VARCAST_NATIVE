import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import AllSourcePath from '../../Constants/PathConfig';
import LinearGradient from 'react-native-linear-gradient';
import {getData, setData} from '../../Services/LocalStorage';
import {postApi} from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {
  setDeviceid,
  setToken,
  setUserDetails,
} from '../../Store/Reducers/AuthReducer';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('screen');

const SplashScreen = props => {
  const dispatch = useDispatch();

  const DeviceIdData = () => {
    DeviceInfo.getUniqueId().then(uniqueid => {
      console.log('uniqueid', uniqueid);
      if (uniqueid) {
        dispatch(setDeviceid(uniqueid));
        setData('deviceId', uniqueid);
      } else {
        console.log('failed');
      }
    });
  };

  useEffect(() => {
    DeviceIdData();
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar
        backgroundColor={'transparent'}
        // animated={true}
        barStyle={'dark-content'}
        translucent={true}
      />
      <Image
        source={require('../../assets/images/Logo.png')}
        style={{
          height: 70,
          width: 140,
        }}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
