import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import {StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Image} from 'react-native';
import {ImageBackground} from 'react-native';
import {AppTextInput, Icon} from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import {FONTS} from '../../Constants/Fonts';
import ReactNativeModal from 'react-native-modal';
import EyeOpen from '../../assets/icons/EyeOpen';
import EyeClose from '../../assets/icons/EyeClose';
import HelperFunctions from '../../Constants/HelperFunctions';
import {apiCall} from '../../Services/Service';
import {useDispatch} from 'react-redux';
import {setData} from '../../Services/LocalStorage';
import {setToken, setUserDetails} from '../../Store/Reducers/AuthReducer';
import {countryCodes} from '../../Constants/countryCodes';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import RNRestart from 'react-native-restart';
const {width, height} = Dimensions.get('screen');

const Login = props => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const dispatch = useDispatch();

  const [loadingState, changeloadingState] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [CountryModal, setCountryModal] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [countryCodeList, setCountryCodeList] = useState(countryCodes);

  // countryCodes
  const [Loder, setLoader] = useState(false);
  const [value, setValue] = useState('');
  const [isEmailMode, setIsEmailMode] = useState(true);
  const [isMobileMode, setIsMobileMode] = useState(false);

  const [products, setProducts] = useState(countryCodes);
  const [searchVal, setSearchVal] = useState('');
  const {t, i18n} = useTranslation();

  const handleToggleMode = () => {
    setIsEmailMode(!isEmailMode);
    setValue('');
  };

  const handleInputChange = text => {
    if (validateOnlyNumbers(text)) {
      if (text.length === 11) {
        setIsEmailMode(false);
        setIsMobileMode(true);
        setValue(text);
        // Format input acc to phone no
      } else {
        setIsEmailMode(false);
        setIsMobileMode(true);
        setValue(text);
      }
    } else {
      if (validateEmail(text)) {
        setIsEmailMode(true);
        setIsMobileMode(false);
        setValue(text);
        // Format input acc to Email
      } else {
        setIsEmailMode(true);
        setIsMobileMode(false);
        setValue(text);
      }
    }
  };

  function validateEmail(emal) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emal).toLowerCase());
  }

  function validateOnlyNumbers(phn) {
    return phn.match(/^\d+$/);
  }

  // const validateEmail = (email) => {
  //   // Email validation logic here
  //   return /\S+@\S+\.\S+/.test(email);
  // };

  // const validatePhoneNumber = (phoneNumber) => {
  //   // Phone number validation logic here
  //   return /^\d{10}$/.test(phoneNumber);
  // };
  function handleSearchClick(val) {
    if (val === '') {
      setCountryCodeList(countryCodes);
      setSearchVal(val);
      return;
    }
    const filterBySearch = countryCodes.filter(item => {
      if (item.name.en.toLowerCase().includes(val.toLowerCase())) {
        return item;
      }
    });
    setSearchVal(val);
    setCountryCodeList(filterBySearch);
  }

  const Login = () => {
    if (value == null || value == undefined || value?.trim()?.length == 0) {
      HelperFunctions.showToastMsg('Please enter your email');
    } else if (isEmailMode && !HelperFunctions.isvalidEmailFormat(value)) {
      HelperFunctions.showToastMsg('Please enter valid email');
    } else if (!isEmailMode && value.length < 10) {
      HelperFunctions.showToastMsg(
        'Phone number must contain minimum 10 digits',
      );
    } else if (
      password == null ||
      password == undefined ||
      password?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter your password');
    } else {
      setLoader(true);
      let data = {
        email: value,
        password: password,
      };
      apiCall('login', 'POST', data)
        .then(response => {
          // console.log('response',response)
          if (response?.status == 'success') {
            storeToLocalAndRedux(response);
            HelperFunctions.showToastMsg('Logged In Successfully');
            // NavigationService.navigate('BottomTabNavigation')
            setLoader(false);
          } else {
            setModalVisible(true);
            setLoader(false);
          }
        })
        .catch(error => {
          HelperFunctions.showToastMsg(error?.message);
          setLoader(false);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const storeToLocalAndRedux = userDataa => {

    setData('account', userDataa?.data);
    setData('token', userDataa?.auth_token);
    dispatch(setUserDetails(userDataa?.data));
    dispatch(setToken(userDataa?.auth_token));
  };

  const changeCurrentLanguage = () => {
    i18n
      .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
      .then(() => {
        I18nManager.forceRTL(i18n.language === 'ar');
        RNRestart.restart();
        // setCurrentLanguage(languageValue);
      })
      .catch(() => {
        HelperFunctions.showToastMsg('Not able To Change The Language');
      });

    //   i18n.changeLanguage('en')
    //   .then((val) => {
    //  I18nManager.forceRTL(i18n.language === 'en')
    //         RNRestart.restart()

    //     // setCurrentLanguage(languageValue);
    //   })
    //   .catch(() => {
    //     HelperFunctions.showToastMsg('Not able To Change The Language');
    //   });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        <StatusBar
          backgroundColor={'transparent'}
          // animated={true}
          barStyle={'light-content'}
          translucent={true}
        />
        <ImageBackground
          source={require('../../assets/images/login.png')}
          style={{
            width: width,
            height: height + 20,
            paddingBottom: 20,
          }}
          resizeMode="cover">
          <View style={{marginTop: height / 5.2, alignSelf: 'center'}}>
            <Image
              source={require('../../assets/images/Logo.png')}
              style={{
                width: 160,
                height: 50,
              }}
            />
          </View>
          <View
            style={{
              paddingLeft: 10,
              height: 52,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              width: width - 60,
              alignSelf: 'center',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              borderWidth: 0.7,
              marginTop: height / 5.8,
              flexDirection: 'row',
              borderRadius: 10,
            }}>
            {isEmailMode ? (
              <Icon
                name="email-outline"
                type="MaterialCommunityIcon"
                color="#fff"
                size={20}
                style={{
                  width: '10%',
                  marginLeft: 20,
                  marginRight: I18nManager.isRTL ? 20 : 0,
                }}
              />
            ) : (
              <TouchableOpacity
                onPress={() => setCountryModal(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: countryCode.length > 3 ? '17%' : '13%',
                  marginLeft: countryCode.length > 3 ? 30 : 20,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Theme.FontFamily.bold,
                    color: '#fff',
                  }}>
                  {countryCode}
                </Text>
                <Icon
                  name="caretdown"
                  type="AntDesign"
                  color="#fff"
                  size={8}
                  style={{marginHorizontal: 5}}
                />
              </TouchableOpacity>
            )}
            <TextInput
              style={{
                ...styles.input_container_sty,
                fontSize: 15,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
                fontFamily: Theme.FontFamily.normal,
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                borderWidth: 0,
                paddingRight: 20,
                paddingHorizontal: isEmailMode ? 0 : 5,
                marginTop: 0,
                width: '90%',
              }}
              editable={true}
              blurOnSubmit={true}
              placeholder="Email or Phone Number"
              placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
              value={value}
              onChangeText={handleInputChange}
              // secureTextEntry={isSecure}
              keyboardType={
                isEmailMode
                  ? 'email-address'
                  : isMobileMode
                  ? 'number-pad'
                  : 'default'
              }
            />
          </View>
          {/* <AppTextInput
            value={email}
            onChangeText={a => setEmail(a)}
            placeholder="Email or Phone Number"
            placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
            inputStyle={{ fontSize: 14 }}
            titleStyle={{
              fontFamily: Theme.FontFamily.semiBold,
              fontSize: Theme.sizes.s16,
            }}
            mainContainerStyle={
              {
                //   marginHorizontal:20
              }
            }
            leftIcon={{
              name: 'email-outline',
              type: 'MaterialCommunityIcon',
              color: '#fff',
              size: 20,
            }}
            inputContainerStyle={{ ...styles.input_container_sty, marginTop: 20 }}
            style={styles.text_style}
          /> */}

          <AppTextInput
            value={password}
            onChangeText={a => setPassword(a)}
            placeholder="Password"
            placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
            inputStyle={{fontSize: 14}}
            titleStyle={{
              fontFamily: Theme.FontFamily.semiBold,
              fontSize: Theme.sizes.s16,
            }}
            mainContainerStyle={
              {
                //   marginHorizontal:20
              }
            }
            rightAction={
              passwordShow ? (
                //   <Image
                // source={require('../../assets/images/Eye.png')}
                // style={{
                //     height:28,
                //     width:28
                // }}
                // />
                <EyeOpen />
              ) : (
                <EyeClose />
              )
            }
            leftIcon={{
              name: 'lock',
              type: 'Feather',
              color: '#fff',
              size: 20,
            }}
            secureTextEntry={passwordShow ? false : true}
            onRightIconPress={() => setPasswordShow(!passwordShow)}
            inputContainerStyle={styles.input_container_sty}
            style={{
              ...styles.text_style,
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
          />

          <Text
            onPress={
              () => NavigationService.navigate('ForgotPass')
              // changeCurrentLanguage()
            }
            style={{
              color: '#fff',
              textAlign: 'center',
              marginTop: 20,
              fontFamily: Theme.FontFamily.medium,
              fontSize: Theme.sizes.s15,
            }}>
            Forgot Password ?
          </Text>
          <Pressable
            onPress={() => Login()}
            disabled={Loder}
            style={{
              height: 52,
              width: width - 60,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E1D01E',
              borderRadius: 15,
              marginTop: height / 5.5,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: '#131313',
                textAlign: 'center',
                fontFamily: Theme.FontFamily.medium,
                fontSize: Theme.sizes.s16,
              }}>
              {t('Login')}
            </Text>
            {Loder ? (
              <ActivityIndicator
                style={{marginHorizontal: 10}}
                color={'#000'}
                size={20}
              />
            ) : null}
          </Pressable>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                // marginTop: 20,
                fontFamily: Theme.FontFamily.normal,
                fontSize: Theme.sizes.s15,
              }}>
              {t('No Account?')}{' '}
            </Text>
            <Text
              onPress={() => NavigationService.navigate('Signup')}
              style={{
                color: '#fff',
                fontFamily: Theme.FontFamily.medium,
                textDecorationLine: 'underline',
                // paddingBottom:20
              }}>
              {t('Signup')}
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
      <ReactNativeModal
        isVisible={isModalVisible}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.7}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animationIn={'zoomInDown'}
        animationOut={'zoomOut'}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            width: 350,
            height: 270,
            backgroundColor: '#fff',
            borderRadius: 20,
            alignItems: 'center',
            // justifyContent:'center',
            padding: 20,
          }}>
          <Image
            source={require('../../assets/images/DangerCircle.png')}
            style={{
              width: 40,
              height: 40,
              // marginTop:5
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: '#131313',
              fontFamily: Theme.FontFamily.medium,
              fontSize: 20,
              marginTop: 11,
            }}>
            Authorization Error
          </Text>
          <Text
            style={{
              color: 'rgba(19, 19, 19, 0.54)',
              fontFamily: Theme.FontFamily.normal,
              fontSize: 16,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            The Login or Password you entered does not match our records. Please
            try again or click Forgot Password
          </Text>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              height: 52,
              width: 305,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E1D01E',
              borderRadius: 15,
              marginTop: 14,
            }}>
            <Text
              style={{
                color: '#131313',
                textAlign: 'center',
                fontFamily: Theme.FontFamily.medium,
                fontSize: Theme.sizes.s16,
              }}>
              Ok
            </Text>
          </Pressable>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={CountryModal}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.7}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        // animationIn={'zoomInDown'}
        // animationOut={'zoomOut'}
        onBackButtonPress={() => setCountryModal(false)}
        onBackdropPress={() => setCountryModal(false)}>
        <View
          style={{
            width: width,
            height: height / 2,
            backgroundColor: '#fff',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            alignItems: 'center',
            // justifyContent:'center',
            padding: 20,
          }}>
          <AppTextInput
            value={searchVal}
            onChangeText={handleSearchClick}
            placeholder="Search"
            placeholderTextColor={'rgba(0, 0, 0, 0.54)'}
            inputStyle={{fontSize: 14}}
            titleStyle={{
              fontFamily: Theme.FontFamily.semiBold,
              fontSize: Theme.sizes.s16,
            }}
            mainContainerStyle={
              {
                //   marginHorizontal:20
              }
            }
            leftIcon={{
              name: 'search',
              type: 'Ionicon',
              color: '#000',
              size: 25,
            }}
            inputContainerStyle={{
              width: width - 40,
              height: 60,
              backgroundColor: 'rgba(0, 0, 0, 0.09)',
              paddingRight: 20,
              paddingLeft: 10,
              borderWidth: 0,
              marginTop: 10,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            style={{
              fontSize: 16,
              fontFamily: Theme.FontFamily.normal,
              color: '#000',
              marginLeft: 10,
            }}
          />
          <FlatList
            data={countryCodeList}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => {
                    setCountryCode(item.dial_code);
                    setCountryModal(false);
                    setSearchVal('');
                    setCountryCodeList(countryCodes);
                  }}
                  style={{
                    width: width - 40,
                    height: 60,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    paddingHorizontal: 20,
                    marginTop: 20,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily: Theme.FontFamily.normal,
                      color: '#000',
                    }}>
                    {item.flag}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Theme.FontFamily.normal,
                      color: '#000',
                      width: '25%',
                      textAlign: 'center',
                    }}>
                    {item.dial_code}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Theme.FontFamily.normal,
                      color: '#000',
                    }}>
                    {I18nManager.isRTL ? item.name.ar : item.name.en}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
    // paddingBottom:90
    // paddingHorizontal:10
    // height:100s
  },
  input_container_sty: {
    paddingHorizontal: 10,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: width - 60,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 0.7,
    alignSelf: 'center',
    marginTop: 20,
    // padding:0
    // backfaceVisibility:'hidden'
    // elevation:3
  },
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 15,
    color: '#fff',
  },
});
