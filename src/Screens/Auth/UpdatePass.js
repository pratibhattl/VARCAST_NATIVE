import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import CustomHeader from '../../Components/Header/CustomHeader';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import {AppTextInput, Icon} from 'react-native-basic-elements';
import {BlurView} from '@react-native-community/blur';
import ReactNativeModal from 'react-native-modal';
import OtpInput from '../../Components/EditTextComponent/OtpInputComponent';
import {moderateScale} from '../../Constants/PixelRatio';
import HelperFunctions from '../../Constants/HelperFunctions';
import {postApi} from '../../Services/Service';
const {width, height} = Dimensions.get('screen');

const UpdatePass = props => {
  const {token} = props.route.params;
  const [email, setEmail] = useState('');
  const [emailVerification, setEmailVerification] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Loder, setLoader] = useState(false);

  const [userOtp, setUserOtp] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [ConfirmpasswordShow, setConfirmPasswordShow] = useState(false);
  // OTP complete function
  const handleOtpComplete = enteredOtp => {
    console.log('enteredOtp:', enteredOtp);
    if (enteredOtp != '') {
      setUserOtp(enteredOtp);
    }
  };

  const UpdatePassword = () => {
    if (
      userOtp == null ||
      userOtp == undefined ||
      userOtp?.trim()?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter your OTP');
    } else if (
      password == null ||
      password == undefined ||
      password?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter password');
    } else if (
      ConfirmPassword == null ||
      ConfirmPassword == undefined ||
      ConfirmPassword?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter confirm password');
    } else {
      setLoader(true);
      let data = {
        otp: userOtp,
        token: token,
        password: password,
        password_confirmation: ConfirmPassword,
      };
      postApi('api/user-password-change', data, '')
        .then(response => {
          // console.log('response',response)
          if (response?.status == 'success') {
            HelperFunctions.showToastMsg('Password Changed Successfully');
            NavigationService.navigate('Login');

            setLoader(false);
          } else {
            setModalVisible(true);
            setLoader(false);
          }
        })
        .catch(error => {
          HelperFunctions.showToastMsg(error?.message ?? 'error');
          setLoader(false);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {console.log('tokenenneen', token)}
      <CustomHeader
        HeaderColor={'rgba(27, 27, 27, 0.96)'}
        leftHeading={'Update Password'}
        onLeftIconPress={() => NavigationService.back()}
      />
      <Pressable
        style={{
          //   height: 53,
          width: width - 35,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1C1C1C',
          borderRadius: 15,
          marginTop: 25,
          padding: 12,
        }}>
        <Text
          style={{
            color: '#fff',
            // textAlign: 'center',
            fontFamily: Theme.FontFamily.normal,
            fontSize: Theme.sizes.s15,
          }}>
          You can update your password below. Just enter and confirm the
          password and tap "Update”.
        </Text>
      </Pressable>
      <>
        <Text
          style={{
            ...styles.enter_otp_txt,
            color: Theme.colors.white,
            marginTop: 30,
            marginHorizontal: 20,
          }}>
          Enter OTP in Email{' '}
        </Text>
        <View
          style={{
            marginHorizontal: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
            height: moderateScale(60),
          }}>
          <OtpInput
            // numInputs={4}
            // editable={!userOtpVerify}
            onComplete={handleOtpComplete}
          />
        </View>
      </>
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
            <Icon name="eye" type="Ionicon" color={'#fff'} />
          ) : (
            <Icon name="eye-off" type="Ionicon" color={'#fff'} />
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
        inputContainerStyle={{...styles.input_container_sty, marginTop: 40}}
        style={styles.text_style}
      />

      <AppTextInput
        value={ConfirmPassword}
        onChangeText={a => setConfirmPassword(a)}
        placeholder="Confirm Password"
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
          ConfirmpasswordShow ? (
            <Icon name="eye" type="Ionicon" color={'#fff'} />
          ) : (
            <Icon name="eye-off" type="Ionicon" color={'#fff'} />
          )
        }
        leftIcon={{
          name: 'lock',
          type: 'Feather',
          color: '#fff',
          size: 20,
        }}
        secureTextEntry={ConfirmpasswordShow ? false : true}
        onRightIconPress={() => setConfirmPasswordShow(!ConfirmpasswordShow)}
        inputContainerStyle={styles.input_container_sty}
        style={styles.text_style}
      />

      <View style={{flex: 1}} />
      <Pressable
        disabled={Loder}
        onPress={() => UpdatePassword()}
        style={{
          height: 53,
          width: 350,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E1D01E',
          borderRadius: 15,
          marginBottom: 25,
          flexDirection: 'row',
          //   marginTop: 160,
        }}>
        <Text
          style={{
            color: '#131313',
            textAlign: 'center',
            fontFamily: Theme.FontFamily.medium,
            fontSize: Theme.sizes.s16,
          }}>
          Update
        </Text>
        {Loder ? (
          <ActivityIndicator
            style={{marginHorizontal: 10}}
            color={'#000'}
            size={20}
          />
        ) : null}
      </Pressable>
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
        // onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            width: 350,
            height: 250,
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
              marginTop: 8,
            }}>
            Oops !
          </Text>
          <Text
            style={{
              color: 'rgba(19, 19, 19, 0.54)',
              fontFamily: Theme.FontFamily.normal,
              fontSize: 16,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            OTP does not match. Please enter a valid OTP.
          </Text>
          <Pressable
            onPress={() => {
              setModalVisible(false);
              // NavigationService.navigate('Login')
            }}
            style={{
              height: 52,
              width: 305,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E1D01E',
              borderRadius: 15,
              marginTop: 12,
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
    </SafeAreaView>
  );
};

export default UpdatePass;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    paddingBottom: 40,
  },
  input_container_sty: {
    paddingHorizontal: 10,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 0,
    width: 350,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 0.7,
    alignSelf: 'center',
    marginTop: 20,
  },
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 15,
    color: '#fff',
  },
});
