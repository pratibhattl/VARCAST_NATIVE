//import liraries
import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from 'react-native';
import {
  AppButton,
  Container,
  Icon,
  useTheme,
} from 'react-native-basic-elements';

import OtpInputs from 'react-native-otp-inputs';
import {useDispatch} from 'react-redux';
import {moderateScale} from '../../Constants/PixelRatio';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import HelperFunctions from '../../Constants/HelperFunctions';
import {postApi} from '../../Services/Service';
import OtpInput from '../../Components/EditTextComponent/OtpInputComponent';

const {width, height} = Dimensions.get('screen');

// create a component
const OtpInputPage = props => {
  const colors = useTheme();
  const {details} = props.route.params;
  const [userId, setUserID] = useState(props?.route?.params?.User_Id ?? '');
  const dispatch = useDispatch();
  // const { OTP, UserData, Exist, Phone } = props.route.params
  const [userOtp, setUserOtp] = useState('');
  const [userOtpVerify, setUserOtpVerify] = useState(false);
  const [Loder, setLoader] = useState(false);
  const [ResendLoader, setResendLoader] = useState(false);
  const [ResendLoaderM, setResendLoaderM] = useState(false);

  const [LoderM, setLoaderM] = useState(false);
  const [verifyRes, setVerifyRes] = useState('');

  const [userOtpM, setUserOtpM] = useState('');
  const [userOtpVerifyMobile, setUserOtpVerifyMobile] = useState(false);

  const [ootp, setOotp] = useState('');
  const handleOtpCompleteEmail = enteredOtp => {
    console.log('enteredOtp:', enteredOtp);
    if (enteredOtp != '') {
      setUserOtp(enteredOtp);
      console.log('first', enteredOtp);
      if (enteredOtp.length == 4) {
        emailOtpVerify(enteredOtp);
      } else {
        setLoader(false);
      }
    }
  };
  const handleOtpCompleteMobile = enteredOtp => {
    console.log('enteredOtp:', enteredOtp);
    if (enteredOtp != '') {
      setUserOtpM(enteredOtp);
      console.log('firstm', enteredOtp);
      if (enteredOtp.length == 4) {
        mobileOtpVerify(enteredOtp);
      } else {
        setLoaderM(false);
      }
    }
  };
  // var otp =
  const emailOtpVerify = ccodee => {
    setLoader(true);
    let data = {
      email: details?.email,
      type: 'account_verification',
      otp: ccodee,
    };
    postApi('api/user-verify-account', data, '')
      .then(response => {
        if (response?.status == 'success') {
          //   storeToLocalAndRedux(response)
          HelperFunctions.showToastMsg(response?.message);
          setLoader(false);
          setVerifyRes(response?.data);
          setUserOtpVerify(true);
        } else {
          HelperFunctions.showToastMsg(
            response?.error ? response.error : 'OTP not matched',
          );
          setLoader(false);
          // setUserOtpVerify(false)
        }
      })
      .catch(error => {
        HelperFunctions.showToastMsg(
          response?.message ? response.message : 'Verification failed',
        );
        setLoader(false);
        // setUserOtpVerify(false)
      })
      .finally(() => {
        setLoader(false);
        // setUserOtpVerify(false)
      });
  };

  const mobileOtpVerify = ccodee => {
    console.log('dfkdjfkl');
    setLoaderM(true);
    let data = {
      email: details?.phone,
      type: 'account_verification',
      otp: ccodee,
    };
    postApi('api/user-verify-account', data, '')
      .then(response => {
        if (response?.status == 'success') {
          //   storeToLocalAndRedux(response)
          HelperFunctions.showToastMsg(response?.message);
          setLoaderM(false);
          setVerifyRes(response?.data);
          setUserOtpVerifyMobile(true);
        } else {
          HelperFunctions.showToastMsg(
            response?.message ? response.message : 'OTP not matched',
          );
          setLoaderM(false);
          // setUserOtpVerifyMobile(false)
        }
      })
      .catch(error => {
        HelperFunctions.showToastMsg(
          response?.error ? response.error : 'Verification failed',
        );
        setLoaderM(false);
        // setUserOtpVerifyMobile(false)
      })
      .finally(() => {
        setLoaderM(false);
        // setUserOtpVerifyMobile(false)
      });
  };

  const resendEmailOtp = () => {
    setResendLoader(true);
    let data = {
      email: details?.email,
      otp_for: 'account_verification',
    };
    postApi('api/resent-otp', data, '')
      .then(response => {
        if (response?.status == 'success') {
          //   storeToLocalAndRedux(response)
          HelperFunctions.showToastMsg(response?.message);
          setResendLoader(false);
        } else {
          HelperFunctions.showToastMsg(response?.message);
          setResendLoader(false);
          // setUserOtpVerifyMobile(false)
        }
      })
      .catch(error => {
        HelperFunctions.showToastMsg(
          response?.error ? response.error : 'failed',
        );
        setResendLoader(false);
        // setUserOtpVerifyMobile(false)
      })
      .finally(() => {
        setResendLoader(false);
        // setUserOtpVerifyMobile(false)
      });
  };
  const resendMobileOtp = () => {
    setResendLoaderM(true);
    let data = {
      email: details?.phone,
      otp_for: 'account_verification',
    };
    postApi('api/resend-otp', data, '')
      .then(response => {
        if (response?.status == 'success') {
          //   storeToLocalAndRedux(response)
          HelperFunctions.showToastMsg(response?.message);
          setResendLoaderM(false);
        } else {
          HelperFunctions.showToastMsg(response?.message);
          setResendLoaderM(false);
          // setUserOtpVerifyMobile(false)
        }
      })
      .catch(error => {
        HelperFunctions.showToastMsg(
          error?.message ? error?.message : 'failed',
        );
        setResendLoaderM(false);
        // setUserOtpVerifyMobile(false)
      })
      .finally(() => {
        setResendLoaderM(false);
        // setUserOtpVerifyMobile(false)
      });
  };

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96)'}}
      // showLoading={Loading}
      //   isScrollable={true}
      leftHeading={'OTP Verify'}
      viewStyle={{backgroundColor: '#131313'}}
      // hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        {/* <BackHeader title={'Otp Verifiy'} /> */}

        <Pressable
          style={{
            //   height: 53,
            width: width - 40,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1C1C1C',
            borderRadius: 15,
            marginVertical: 20,
            padding: 5,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              color: '#fff',
              // textAlign: 'center',
              fontFamily: Theme.FontFamily.normal,
              fontSize: Theme.sizes.s15,
              lineHeight: 20,
            }}>
            Verify OTP's sent on your email and tap "Submit.
          </Text>
        </Pressable>
        <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
          <Text
            style={{
              ...styles.enter_otp_txt,
              color: Theme.colors.white,
            }}>
            Enter OTP in Email{' '}
          </Text>
          {Loder ? (
            <ActivityIndicator
              size="small"
              color={'#fff'}
              style={{marginHorizontal: 5}}
            />
          ) : null}
          {userOtpVerify ? (
            <Icon
              name="verified"
              type="Octicons"
              size={20}
              color={'#2BA57C'}
              style={{marginHorizontal: 5}}
            />
          ) : !userOtpVerify && userOtp.length == 4 ? (
            <Icon
              name="error-outline"
              type="MaterialIcon"
              size={23}
              color={'red'}
            />
          ) : null}
        </View>

        <View
          style={{
            marginHorizontal: 5,
            justifyContent: 'center',
            marginTop: 10,
            height: moderateScale(60),
          }}>
          <OtpInput
            numInputs={4}
            editable={!userOtpVerify}
            onComplete={handleOtpCompleteEmail}
          />
        </View>
        <Pressable
          disabled={ResendLoader || userOtpVerify}
          onPress={() => resendEmailOtp()}
          style={{
            marginTop: 20,
            marginRight: 0,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          {ResendLoader ? (
            <ActivityIndicator
              size="small"
              color={'#fff'}
              style={{marginHorizontal: 5}}
            />
          ) : null}
          <Text
            style={{
              fontFamily: Theme.FontFamily.bold,
              color: userOtpVerify ? Theme.colors.grey : Theme.colors.primary,
              fontSize: 15,
              textAlign: 'right',
              marginHorizontal: 0,
            }}>
            Resend OTP{' '}
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            marginTop: 20,
          }}>
          <Text
            style={{
              ...styles.enter_otp_txt,
              color: Theme.colors.white,
            }}>
            Enter OTP in Mobile{' '}
          </Text>
          {LoderM ? (
            <ActivityIndicator
              size="small"
              color={'#fff'}
              style={{marginHorizontal: 5}}
            />
          ) : null}
          {userOtpVerifyMobile ? (
            <Icon
              name="verified"
              type="Octicons"
              size={20}
              color={'#2BA57C'}
              style={{marginHorizontal: 5}}
            />
          ) : !userOtpVerifyMobile && userOtpM.length == 4 ? (
            <Icon
              name="error-outline"
              type="MaterialIcon"
              size={23}
              color={'red'}
            />
          ) : null}
        </View>
        <View
          style={{
            marginHorizontal: 5,
            justifyContent: 'center',
            marginTop: 10,
            height: moderateScale(60),
          }}>
          {/* <OtpInputs
            handleChange={(code) => {
              setUserOtpM(code)
              console.log('first', code)
              if (code.length == 6) {
                mobileOtpVerify(code)
              }
              else {
                setLoaderM(false)
              }
            }}
            editable={!userOtpVerifyMobile}
            numberOfInputs={6}
            inputContainerStyles={{
              width: 45, height: 45, borderWidth: 1.2, borderColor: '#aaa', borderRadius: 5, 
              alignItems: 'center', justifyContent: 'center'
            }}
            inputStyles={{
              // fontFamily: Theme.FontFamily.bold,
              fontWeight:'600',

              fontSize: (18),
              textAlign: 'center',
              marginTop: (0), color: '#000'
            }}
            // keyboardType='numbers-and-punctuation'
          autofillFromClipboard={false}
          autofillListenerIntervalMS={false}
          /> */}
          <OtpInput
            numInputs={4}
            editable={!userOtpVerifyMobile}
            onComplete={handleOtpCompleteMobile}
          />
        </View>
        <Pressable
          disabled={ResendLoaderM || userOtpVerifyMobile}
          onPress={() => resendMobileOtp()}
          style={{
            marginTop: 20,
            marginRight: 0,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          {ResendLoaderM ? (
            <ActivityIndicator
              size="small"
              color={'#fff'}
              style={{marginHorizontal: 5}}
            />
          ) : null}
          <Text
            style={{
              fontFamily: Theme.FontFamily.bold,
              color: userOtpVerifyMobile
                ? Theme.colors.grey
                : Theme.colors.primary,
              fontSize: 15,
              textAlign: 'right',
              marginHorizontal: 0,
            }}>
            Resend OTP{' '}
          </Text>
        </Pressable>
        <View style={{flex: 1}} />
        {/* {timer == 0 ?
            <AppButton
                title="Resend"
                style={styles.button}
                textStyle={{
                    ...styles.continue_txt,
                    color: Theme.colors.secondaryFontColor
                }}

                onPress={() =>
                    login()
                }
            />
            : */}
        <AppButton
          title="Submit"
          disabled={userOtpVerify && userOtpVerifyMobile ? false : true}
          style={{
            ...styles.button,
            backgroundColor:
              userOtpVerify && userOtpVerifyMobile
                ? Theme.colors.primary
                : Theme.colors.grey,
          }}
          textStyle={{
            ...styles.continue_txt,
            color: Theme.colors.white,
          }}
          onPress={() => {
            HelperFunctions.showToastMsg(
              'Please Login with your email and password',
            );
            NavigationService.replace(
              'Login',
              // {email:email,pass:pass}
            );
          }}
        />
        {/* } */}
      </View>
    </ScreenLayout>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 50,
    paddingHorizontal: 25,
    // alignItems:'center',
    backgroundColor: '#131313',
  },
  enter_otp_txt: {
    // fontFamily: Theme.FontFamily.bold,
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
    // marginTop: (15)
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontFamily: Theme.FontFamily.normal,
    fontSize: 17,
    marginHorizontal: 5,
  },
  underlineStyleHighLighted: {
    backgroundColor: '#FFFFFF',
  },
  dontHaveAccoount_txt: {
    textAlign: 'center',
    fontFamily: Theme.FontFamily.bold,
    fontSize: 14,
    marginLeft: 7,
    marginTop: 20,
  },
  continue_txt: {
    fontFamily: Theme.FontFamily.bold,
    fontSize: 16,
    paddingBottom: 5,
  },
  phone_number_txt: {
    fontFamily: Theme.FontFamily.bold,
    fontSize: 14,
    marginLeft: 5,
  },
  button: {
    width: '90%',
    height: 48,
    // alignSelf: 'center',
    borderRadius: 10,
    bottom: 30,
    backgroundColor: Theme.colors.secondary,
    // marginTop: (40),
  },
});

//make this component available to the app
export default OtpInputPage;
