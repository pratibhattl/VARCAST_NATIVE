//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Pressable,
  I18nManager,
  Alert,
} from 'react-native';
import {Card, useTheme} from 'react-native-basic-elements';

import {useDispatch, useSelector} from 'react-redux';
import Theme from '../../Constants/Theme';
import DrawerListCard from './DrawerList';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../Services/Navigation';
import {setData} from '../../Services/LocalStorage';
import {resetAuthData} from '../../Store/Reducers/AuthReducer';
import {useTranslation} from 'react-i18next';
import {apiCall} from '../../Services/Service';

// create a component
const DrawerNavigationCard = () => {
  const {t} = useTranslation();
  const colors = useTheme();
  const dispatch = useDispatch();
  const {login_status, token, deviceid} = useSelector(state => state.authData);
  const [userDetails, setUserDetails] = useState();

  const logout = () => {
    setData('account', null);
    setData('token', null);
    dispatch(resetAuthData());
  };
  const createTwoButtonAlert = () =>
    Alert.alert('Logout', 'Are you sure?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => logout()},
    ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {data} = await apiCall('get-user', 'GET', null, token);
        setUserDetails(data);
      } catch (error) {
        console.log("ERROR WHILE FETCHING USER DETAILS :",error)
      }
    };
    fetchUser();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1C1C1C',
        // paddingBottom:30,
        // width:'120%'
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        // animated={true}
        barStyle={'light-content'}
        translucent={true}
      />
      <LinearGradient
        colors={[
          'rgba(255,255,255,0.1)',
          'rgba(27, 27, 27, 0.9)',
          'rgba(27, 27, 27, 0.9)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        // useAngle={true} angle={-290}
        // angleCenter={{ x: 0.5, y: 0.5 }}
        style={{
          flex: 1,
          paddingTop: 30,
          paddingBottom: 20,
        }}>
        <View
          style={{
            // height:100
            padding: 25,
            paddingTop: 45,
            // alignItems:'flex-end'
          }}>
          <Image
            source={
              userDetails?.full_path_image
                ? {uri: userDetails?.full_path_image}
                : require('../../assets/images/image.png')
            }
            style={{
              height: 65,
              width: 65,
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: Theme.FontFamily.medium,
              marginVertical: 10,
              textAlign: I18nManager.isRTL ? 'left' : 'auto',
            }}>
            {userDetails?.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: Theme.FontFamily.medium,
                // marginVertical:10
              }}>
              {userDetails?.count_followers}
              {userDetails?.count_followers > 10000000
                ? 'b'
                : userDetails?.count_followers > 100000
                ? 'm'
                : userDetails?.count_followers > 1000
                ? 'k'
                : ''}
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.54)',
                  fontSize: 15,
                  fontFamily: Theme.FontFamily.light,
                  // marginVertical:10
                }}>
                {t('followers')}
              </Text>
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: Theme.FontFamily.medium,
                marginLeft: 10,
                // marginVertical:10
              }}>
              {userDetails?.count_followings}
              {userDetails?.count_followings > 10000000
                ? 'b'
                : userDetails?.count_followings > 100000
                ? 'm'
                : userDetails?.count_followings > 1000
                ? 'k'
                : ''}
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.54)',
                  fontSize: 15,
                  fontFamily: Theme.FontFamily.light,
                  // marginVertical:10
                }}>
                {t('following')}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(118, 118, 128, 0.34)',
              marginTop: 25,
            }}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <DrawerListCard />
        </ScrollView>
        <Pressable
          onPress={() => createTwoButtonAlert()}
          style={{
            // marginTop:30,
            // flexDirection:'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            backgroundColor: 'rgba(255,255,255,0.1)',
            height: 50,
            marginHorizontal: 21,
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: '30%'}}>
            <Image
              source={require('../../assets/images/logout.png')}
              style={{
                height: 26,
                width: 26,
              }}
            />
            <View
              style={{
                ...styles.text_icon_view,
                marginLeft: 15,
              }}>
              <Text
                style={{
                  ...styles.my_info_txt,
                  color: '#ED4040',
                }}>
                Logout
              </Text>
            </View>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  user_name_txt: {
    marginTop: 5,
    fontFamily: Theme.FontFamily.bold,
    fontSize: 18,
  },
  phone_number: {
    fontFamily: Theme.FontFamily.medium,
    fontSize: 12,
  },
  text_icon_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    alignItems: 'center',
    flex: 1,
  },
  my_info_txt: {
    fontFamily: Theme.FontFamily.medium,
    fontSize: 17,
  },
});

//make this component available to the app
export default DrawerNavigationCard;
