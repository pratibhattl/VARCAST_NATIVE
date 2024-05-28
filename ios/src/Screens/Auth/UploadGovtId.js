import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image, ActivityIndicator, TouchableOpacity, Dimensions, I18nManager, FlatList, TextInput, Platform, PermissionsAndroid } from 'react-native';
import CustomHeader from '../../Components/Header/CustomHeader';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import { AppTextInput, Icon } from 'react-native-basic-elements';
import { BlurView } from '@react-native-community/blur';
import ReactNativeModal from 'react-native-modal';
import OtpInput from '../../Components/EditTextComponent/OtpInputComponent';
import { moderateScale } from '../../Constants/PixelRatio';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import ImagePicker from 'react-native-image-crop-picker';
import { countryCodes } from '../../Constants/countryCodes';
import { useTranslation } from 'react-i18next';
import EditIcon from '../../assets/icons/EditIcon';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('screen');

const UploadGovtID = (props) => {
  const { details } = props.route.params
  const { login_status, userDetails, token, deviceid } = useSelector(state => state.authData);

  const [GovtIdImg, setGovtIdImg] = useState('');
  const form = new FormData();
  const [imagesdet, setimagesdet] = useState('')
  const [userOtp, setUserOtp] = useState("");
  const [Loder, setLoader] = useState(false);
  const { t, i18n } = useTranslation();

  function getOriginalname(data) {
    let arr = data.split("/");
    let lent = Number(arr.length - 1);
    return arr[lent];
  }
  const getPermissionIos = async () => {
    if (Platform.OS === 'ios') {
      requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((statuses) => {
        console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
        console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
      });
    }
  };
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        // PermissionsAndroid.PERMISSIONS.MEDIA_LIBRARY,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

  };
  const imageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log('imaher', image)
      let get_originalname = getOriginalname(image.path);

      // form.append('image_for', 'profile_image');
      form.append('govt_id_card', {
        uri: image.path,
        type: image.mime,
        name: get_originalname,
      });
      setimagesdet(image)
      // console.log('form',form)
      //  if(form!=null && image){
      //   UpdateProfileImage()
      //  }

    });
  }

  const SendOtp = () => {
    if (imagesdet == null || imagesdet == undefined || imagesdet == "") {
      HelperFunctions.showToastMsg("Please upload any id proof!")
    } else {
      if (imagesdet) {
        let get_originalname = getOriginalname(imagesdet.path);

        // form.append('image_for', 'profile_image');
        form.append('govt_id_card', {
          uri: imagesdet.path,
          type: imagesdet.mime,
          name: get_originalname,
        });
      }
      setLoader(true)
      form.append('name', details?.name)
      form.append('email', details?.email)
      form.append('phone', details?.phone)
      form.append('password', details?.password)
      form.append('password_confirmation', details?.password_confirmation)
      form.append('country_id', details?.country_id)
      form.append('dob', details?.dob)
      form.append('gender', details?.gender)
      form.append('register_for', "app")
      form.append('device_token', deviceid)
      postApi("api/register", form, "", 'multipart/form-data').then(response => {
        // console.log('response',response)
        if (response?.status == 'success') {
          HelperFunctions.showToastMsg("OTP Sent Successfully")
          NavigationService.navigate('OtpInputPage', { details: details })

          setLoader(false)

        } else {
          HelperFunctions.showToastMsg(response?.message)
          setLoader(false)

        }
      }).catch(error => {
        HelperFunctions.showToastMsg(error?.message)
        setLoader(false)
      }).finally(() => {
        setLoader(false)
      })
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        HeaderColor={'rgba(27, 27, 27, 0.96)'}
        leftHeading={'Government Id Proof'}
        onLeftIconPress={() => NavigationService.back()}
      />
      {console.log('datata', details)}
      <Pressable
        style={{
          //   height: 53,
          width: 350,
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
          Please upload front side of any Government Id as your id proof.
        </Text>
      </Pressable>
      <View style={{
        alignItems: 'center', marginTop: 50, height: 250, width: width - 40, justifyContent: 'center',
        borderWidth: 0.8, borderColor: '#aaa', alignSelf: 'center', borderStyle: 'dashed', borderRadius: 10
      }}>
        <TouchableOpacity
          onPress={imageUpload}
        >
          <Image
            source={imagesdet ? { uri: imagesdet.path } : require('../../assets/images/addimage.png')}
            style={{
              height: imagesdet ? 250 : 110,
              width: imagesdet ? width - 40 : 110,
              borderRadius: 10
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
        {Loder ?
          <ActivityIndicator style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }} color={'#fff'} /> : null}
        {/* <TouchableOpacity
          onPress={imageUpload}
          style={{ position: 'absolute', bottom: 15, right:width>700 ? width/2.4 :width>1000 ? width/2.25 :  width / 2.85, height: 25, width: 25, borderRadius: 20, backgroundColor: '#E15454', alignItems: 'center', justifyContent: 'center' }}>
            <EditIcon />
          </TouchableOpacity> */}

      </View>


      <View
        style={{ flex: 1 }}
      />
      <Pressable
        disabled={Loder}
        onPress={() => 
          SendOtp()
          // NavigationService.navigate('OtpInputPage', { details: details })
        }
        style={{
          height: 53,
          width: width - 50,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E1D01E',
          borderRadius: 15,
          marginBottom: 25, flexDirection: 'row'

          //   marginTop: 160,
        }}>
        <Text
          style={{
            color: '#131313',
            textAlign: 'center',
            fontFamily: Theme.FontFamily.medium,
            fontSize: Theme.sizes.s16,
          }}>
          Send OTP
        </Text>
        {Loder ?
          <ActivityIndicator style={{ marginHorizontal: 10 }} color={"#000"} size={20} />
          :
          null
        }
      </Pressable>


    </SafeAreaView>
  );
}

export default UploadGovtID;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    paddingBottom: 40
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
    marginTop: 25
  },
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 15,
    color: '#fff',
  },
  enter_otp_txt: {
    // fontFamily: Theme.FontFamily.bold,
    fontWeight: '600',
    fontSize: (18),
    // textAlign: 'center',
    // marginTop: (15)
  },
})