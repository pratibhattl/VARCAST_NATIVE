//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  I18nManager,
} from 'react-native';
import {Icon, useTheme} from 'react-native-basic-elements';

import {Pressable} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import Activity from '../../assets/icons/Activity';
import WalletIcon from '../../assets/icons/Wallet';
import PrivacyIcon from '../../assets/icons/PrivacyIcon';
import ReportIcon from '../../assets/icons/ReportIcon';
import HelpIcon from '../../assets/icons/HelpIcon';
import {setData} from '../../Services/LocalStorage';
import {resetAuthData} from '../../Store/Reducers/AuthReducer';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import HelperFunctions from '../../Constants/HelperFunctions';
import {setAppLanguage} from '../../Store/Reducers/CommonReducer';
// create a component
const DrawerListCard = props => {
  const colors = useTheme();
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const listData = [
    {
      img: <Activity />,
      title: t('Your Activity'),
      handleClick: 'Activity',
      arrow: 'No',
    },
    {
      img: <WalletIcon />,
      title: t('Wallet'),
      handleClick: 'Wallet',
      arrow: 'No',
    },
    {
      img: <PrivacyIcon />,
      title: t('Privacy & Security'),
      handleClick: 'HomePage',
      arrow: 'No',
    },
    {
      img: <ReportIcon />,
      title: t('Report a Problem'),
      handleClick: 'Report',
      arrow: 'No',
    },
    {
      img: <HelpIcon />,
      title: t('Customers'),
      handleClick: 'HomePage',
      arrow: 'No',
    },
    {
      img: (
        <Icon
          name="language"
          type="FontAwesome"
          color={'#fff'}
          size={20}
          style={{marginHorizontal: 3}}
        />
      ),
      title: t('Language'),
      handleClick: () => changeCurrentLanguage(),
      arrow: 'Yes',
      func: true,
    },
  ];
  const changeCurrentLanguage = () => {
    const newLanguage = i18n.language === 'ar' ? 'en' : 'ar';
    dispatch(setAppLanguage(newLanguage)); // Dispatch action to change language
    i18n
      .changeLanguage(newLanguage)
      .then(() => {
        I18nManager.forceRTL(newLanguage === 'ar');
        RNRestart.Restart();
      })
      .catch(() => {
        HelperFunctions.showToastMsg('Not able To Change The Language');
      });
  };

  return (
    <View
      style={{
        marginBottom: 0,
        flex: 1,
      }}>
      {listData.map((item, index) => {
        return (
          <View style={{flex: 1}} key={index}>
            <TouchableOpacity
              onPress={() => {
                if (item.func) {
                  item.handleClick();
                } else {
                  NavigationService.navigate(item.handleClick);
                }
              }}>
              <View
                style={{
                  ...styles.main_view,
                  borderColor: '#EBEBEB',
                  // borderBottomWidth: index ==1 ? 1 :0
                }}>
                {item.img}

                <View
                  style={{
                    ...styles.text_icon_view,
                  }}>
                  <Text
                    style={{
                      ...styles.my_info_txt,
                      color: '#fff',
                      fontSize: 17,
                      fontFamily: Theme.FontFamily.medium,
                      // marginTop:1
                    }}>
                    {item.title}{' '}
                    {item.func ? (I18nManager.isRTL ? '(AR)' : '(EN)') : null}
                  </Text>

                  {item.arrow == 'Yes' ? (
                    <Icon
                      name={
                        I18nManager.isRTL ? 'chevron-back' : 'chevron-forward'
                      }
                      type="Ionicons"
                      color={'#fff'}
                      size={16}
                      style={{alignSelf: 'center', marginRight: 25}}
                    />
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
            {index == 1 ? (
              <View
                style={{
                  width: '90%',
                  height: 1,
                  backgroundColor: 'rgba(118, 118, 128, 0.34)',
                  marginTop: 9,
                  alignSelf: 'center',
                  marginBottom: 24,
                }}
              />
            ) : null}
          </View>
        );
      })}
      {/* <View style={{flex: 1}} /> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  text_icon_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    alignItems: 'center',
    flex: 1,
  },
  my_info_txt: {
    fontFamily: Theme.FontFamily.medium,
    fontSize: 15,
  },
  main_view: {
    marginTop: 5,
    // marginHorizontal: (20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingLeft: 21,
  },
});

//make this component available to the app
export default DrawerListCard;
