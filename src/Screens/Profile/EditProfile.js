import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  TextInput,
  I18nManager,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import EditIcon from '../../assets/icons/EditIcon';
import EditProfileIcon from '../../assets/icons/EditProfileIcon';
import { AppTextInput, Icon } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import EyeOpen from '../../assets/icons/EyeOpen';
import EyeClose from '../../assets/icons/EyeClose';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSIONS } from 'react-native-permissions';
import { useTranslation } from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import { countryCodes } from '../../Constants/countryCodes';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ReactNativeModal from 'react-native-modal';
import MyDropDownComponent from '../../Components/MyDropDownComponent/MyDropDownComponent';
import moment from 'moment';
import { setData } from '../../Services/LocalStorage';
// import { setToken, setUserDetails } from '../../Store/Reducers/AuthReducer';
import { apiCall } from '../../Services/Service';
import AllSourcePath from '../../Constants/PathConfig';
import DocumentPicker from 'react-native-document-picker';
import { useIsFocused } from '@react-navigation/native';

import axios from 'axios';
const { width, height } = Dimensions.get('screen');

const EditProfile = () => {
  const route = useRoute();
  // const { login_status, userDetails, deviceid } = useSelector(
  //   state => state.authData,
  // );
  const token = useSelector(state => state?.authData?.token)
  const dispatch = useDispatch();
  const imageUrl = AllSourcePath?.IMAGE_BASE_URL
  const baseUrl = AllSourcePath?.API_BASE_URL_DEV
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Dob, setDob] = useState('');
  const [CountryModal, setCountryModal] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [countryCodeList, setCountryCodeList] = useState(countryCodes);
  const [isEmailMode, setIsEmailMode] = useState(true);
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [Gender, setGender] = useState();
  const [GenderNew, setGenderNew] = useState('');
  const [idProof, setIdProof] = useState({});
  const [idImg, setIdImg] = useState();
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [Oldpassword, setOldPassword] = useState('');
  const [OldpasswordShow, setOldPasswordShow] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ConfirmpasswordShow, setConfirmPasswordShow] = useState(false);
  const [imagesdet, setimagesdet] = useState(null);
  const [profileImg, setProfileImg] = useState();
  const [userOtp, setUserOtp] = useState('');
  const [Loder, setLoader] = useState(false);
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState('');
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState({});

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
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn("A date has been picked: ", date);
    setDob(moment(date).format('MMM Do YYYY'));
    hideDatePicker();
  };

  function getOriginalname(data) {
    try {
      let arr = data?.split('/');
      let lent = Number(arr?.length - 1);
      return arr[lent];
    } catch (error) {
      console.error('ERROR:', error);
    }
  }
  const getPermissionIos = async () => {
    if (Platform.OS === 'ios') {
      requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.MEDIA_LIBRARY,
      ]).then(statuses => {
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

  const fetchUser = async () => {
    try {
      const { data } = await apiCall('get-user', 'GET', null, token);
      let gender = data?.gender == 'F' ? 'Female' : data?.gender == 'M' ? 'Male' : 'Others';
      setEmail(data?.email);
      setName(data?.name);
      setValue(data?.phone);
      setGenderNew(gender);
      setDob(data?.dob);
      setCountryCode(data?.country_id);
      setUserDetails(data);
    } catch (error) {
      console.log("ERROR WHILE FETCHING USER DETAILS :", error)
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUser();
    }
  }, [isFocused]);


  const profileImageSubmit = async (file) => {
    let formData = new FormData();
    formData.append('image', file);

    setLoader(true);

    try {
      const { data } = await axios.post(`${baseUrl}uploadProfilePicture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setimagesdet(file);
      setLoader(false);
      HelperFunctions.showToastMsg('sucessfully uploaded');
      // NavigationService.back();
      return data;
    } catch (error) {
      HelperFunctions.showToastMsg(error?.message);
      setLoader(false);
    }
  };
  const imageUpload = async () => {

    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      profileImageSubmit(pickedFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('err', err);
      } else {
        console.log('error', err);
        throw err;
      }
    }

  };

  const govtfileSubmit = async (file) => {
    let formData = new FormData();
    formData.append('govt_id_card', file);

    setLoader(true);

    try {
      const { data } = await axios.post(`${baseUrl}uploadGovtId`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setLoader(false);
      setIdProof(file);

      HelperFunctions.showToastMsg('sucessfully uploaded');
      // NavigationService.back();
      return data;
    } catch (error) {
      HelperFunctions.showToastMsg(error?.message);
      setLoader(false);
    }
  };
  const idUpload = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      govtfileSubmit(pickedFile)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('err', err);
      } else {
        console.log('error', err);
        throw err;
      }
    }

  };
  const UpdateProfile = async () => {
    // setLoader(true);

    let DOB = moment(Dob, 'MMM Do YYYY').format('YYYY-MM-DD');
    let userGender = GenderNew ? Gender : GenderNew
    let gender = userGender == 'Male' ? 'M' : userGender == 'Female' ? 'F' : 'O';

    const payload = {
      gender,
      name: Name,
      dob: DOB,
    }
    try {
      const data = await axios.post(`${baseUrl}edit-profile`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      HelperFunctions.showToastMsg('Profile Updated Successfully');
      NavigationService.back();
      return data;
    } catch (error) {
      HelperFunctions.showToastMsg(error?.message);
      setLoader(false);
    }
  };

  const UpdatePassword = async () => {
    if (
      Oldpassword == null ||
      Oldpassword == undefined ||
      Oldpassword?.trim()?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter your Old Password');
    } else if (
      password == null ||
      password == undefined ||
      password?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter your Password');
    } else if (
      ConfirmPassword == null ||
      ConfirmPassword == undefined ||
      ConfirmPassword?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter your New Password');
    } else if (password?.length < 8) {
      HelperFunctions.showToastMsg('Password must contain minimum 8 digits!!');
    } else if (
      ConfirmPassword == null ||
      ConfirmPassword == undefined ||
      ConfirmPassword?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please confirm your password!');
    } else if (ConfirmPassword != password) {
      HelperFunctions.showToastMsg(
        'Confirm Password and password are not same!!',
      );
    } else {
      changeloadingState(true);
      let payload = {
        old_password: Oldpassword,
        password: password,
        password_confirmation: ConfirmPassword,
      };

      try {
        const data = await apiCall('update-password', 'POST', payload, token);

        if (data?.status === 'success') {
          HelperFunctions.showToastMsg('Password Changed Successfully');
          setConfirmPassword('');
          setPassword('');
          setOldPassword('');
          changeloadingState(false);
        }
      } catch (error) {
        HelperFunctions.showToastMsg(error?.message);
      } finally {
        changeloadingState(false);
      }
    }
  };
  const storeToLocalAndRedux = userDataa => {

    setData('account', userDataa?.data);
    // setData('token', userDataa?.auth_token)
    dispatch(setUserDetails(userDataa?.data));
    // dispatch(setToken(userDataa?.auth_token))
  };
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96);' }}
      showLoading={Loder}
      isScrollable={true}
      leftHeading={'Edit Profile'}
      Save
      onRightTextPress={async () => UpdateProfile()}
      // Publish
      leftHeadingStyle={{ color: '#E1D01E' }}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 30,
            marginVertical: 20,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={{
              uri: imagesdet?.uri ? imagesdet?.uri : imageUrl + userDetails?.image,
            }}
            style={{
              height: 90,
              width: 90,
              borderRadius: 50,
              alignSelf: 'center',
            }}
            resizeMode="cover"
          />

          <TouchableOpacity
            onPress={imageUpload}
            style={{
              height: 28,
              width: 28,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: -8,
              right: -8,
            }}>
            <EditProfileIcon />
          </TouchableOpacity>
        </View>
        <AppTextInput
          value={Name}
          onChangeText={a => setName(a)}
          placeholder="David Beckham"
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
            name: 'user',
            type: 'AntDesign',
            color: '#fff',
            size: 20,
          }}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />
        <AppTextInput
          value={email}
          inputStyle={{ fontSize: 14 }}
          titleStyle={{
            fontFamily: Theme.FontFamily.semiBold,
            fontSize: Theme.sizes.s16,
          }}
          editable={false}
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
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />
        <View
          style={{
            paddingLeft: 10,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            width: width - 40,
            alignSelf: 'center',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 0.7,
            marginTop: 20,
            flexDirection: 'row',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => setCountryModal(false)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width:
                countryCode.length > 3
                  ? '17%'
                  : I18nManager.isRTL
                    ? '13%'
                    : '13%',
              marginLeft:
                countryCode.length > 3 ? 25 : I18nManager.isRTL ? 5 : 15,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Theme.FontFamily.bold,
                color: '#fff',
              }}>
              +{countryCode}
            </Text>
            <Icon
              name="caretdown"
              type="AntDesign"
              color="#fff"
              size={8}
              style={{ marginHorizontal: 5 }}
            />
          </TouchableOpacity>

          <TextInput
            style={{
              ...styles.input_container_sty,
              fontSize: 15,
              fontFamily: Theme.FontFamily.normal,
              color: '#fff',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              borderWidth: 0,
              paddingLeft: 20,
              paddingHorizontal: isEmailMode ? 0 : 5,
              marginTop: 0,
              width: '85%',
              paddingRight: I18nManager.isRTL ? 15 : 0,
            }}
            editable={false}
            blurOnSubmit={true}
            placeholder="Phone Number"
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
        <TouchableOpacity
          onPress={() => setDatePickerVisibility(true)}
          style={{
            ...styles.input_container_sty,
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
            <Icon
              name="calendar"
              type="Entypo"
              color={'#fff'}
              size={20}
              style={{ marginRight: 15 }}
            />
            <Text
              style={{
                ...styles.text_style,
                color: Dob != 'DOB' ? '#fff' : 'rgba(255, 255, 255, 0.54)',
                textAlign: I18nManager.isRTL ? 'right' : 'auto',
              }}>
              {Dob == '' ? 'DOB' : Dob}
            </Text>
          </View>
          <Icon
            name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
            type="Feather"
            color={'#fff'}
            size={18}
            style={{ marginLeft: I18nManager.isRTL ? 10 : 0 }}
          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <View >
            <MyDropDownComponent
              onBlur={() => setGenderDropDown(false)}
              onFocus={() => setGenderDropDown(true)}
              itemTextStyle={{ color: '#000' }}
              selectedTextStyle={{ color: '#fff' }}
              itemTestIDField="English"
              placeholder="Select gender"
              placeholderStyle={{ color: 'rgba(255, 255, 255, 0.54)' }}
              renderLeftIcon={
                genderDropDown
                  ? undefined
                  : () => (
                    <Icon
                      name={
                        GenderNew == 'Male'
                          ? 'male'
                          : GenderNew == 'Female'
                            ? 'female'
                            : GenderNew == 'Others'
                              ? 'transgender-outline'
                              : 'help-circle-outline'
                      }
                      type="Ionicon"
                      color={'#fff'}
                      size={GenderNew ? 21 : 23}
                      style={{
                        alignSelf: 'center',
                        marginHorizontal: 4,
                        marginRight: 12,
                      }}
                    />
                  )
              }
              renderRightIcon={
                genderDropDown
                  ? undefined
                  : () => (
                    <Icon
                      name={
                        I18nManager.isRTL ? 'chevron-left' : 'chevron-right'
                      }
                      type="Feather"
                      color={'#fff'}
                      size={18}
                      style={{ alignSelf: 'center', marginRight: 8 }}
                    />
                  )
              }
              style={{
                ...styles.category_view,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
              data={[{ type: 'Male' }, { type: 'Female' }, { type: 'Others' }]}
              labelField="type"
              valueField="type"
              value={GenderNew}
              onChange={e => {
                setGender(e);
                setGenderNew(e.type);
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={idUpload}
          style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Image
            source={{ uri: idProof?.uri ? idProof?.uri : imageUrl + userDetails?.govt_id_card }}
            style={{
              height: idProof ? 250 : 110,
              width: idProof ? width - 40 : 110,
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: Theme.FontFamily.bold,
            fontSize: 19,
            color: '#fff',
            marginHorizontal: 20,
            fontWeight: '600',
            marginTop: 35,
            // alignSelf:'center'
          }}>
          Update Password
        </Text>
        <AppTextInput
          value={Oldpassword}
          onChangeText={a => setOldPassword(a)}
          placeholder="Old Password"
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
          rightAction={OldpasswordShow ? <EyeOpen /> : <EyeClose />}
          leftIcon={{
            name: 'lock',
            type: 'Feather',
            color: '#fff',
            size: 20,
          }}
          secureTextEntry={OldpasswordShow ? false : true}
          onRightIconPress={() => setOldPasswordShow(!OldpasswordShow)}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />
        <AppTextInput
          value={password}
          onChangeText={a => setPassword(a)}
          placeholder="New Password"
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
          rightAction={passwordShow ? <EyeOpen /> : <EyeClose />}
          leftIcon={{
            name: 'lock',
            type: 'Feather',
            color: '#fff',
            size: 20,
          }}
          secureTextEntry={passwordShow ? false : true}
          onRightIconPress={() => setPasswordShow(!passwordShow)}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />

        <AppTextInput
          value={ConfirmPassword}
          onChangeText={a => setConfirmPassword(a)}
          placeholder="Confirm"
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
          rightAction={ConfirmpasswordShow ? <EyeOpen /> : <EyeClose />}
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
        <Pressable
          disabled={loadingState}
          onPress={() => UpdatePassword()}
          style={{
            height: 53,
            width: width - 50,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E1D01E',
            borderRadius: 15,
            marginVertical: 25,
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
            Update Password
          </Text>
          {loadingState ? (
            <ActivityIndicator
              style={{ marginHorizontal: 10 }}
              color={'#000'}
              size={20}
            />
          ) : null}
        </Pressable>
      </View>
      {isDatePickerVisible ? (
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            // minimumDate={new Date(new Date().toDateString())}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      ) : null}
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
          {/* {console.log('countryCode',countryCode)} */}
          <AppTextInput
            value={searchVal}
            onChangeText={handleSearchClick}
            placeholder="Search"
            placeholderTextColor={'rgba(0, 0, 0, 0.54)'}
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
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  onPress={() => {
                    setCountryCode(item.dial_code.replace('+', ''));
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
                      width: '22%',
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
                    {item.name.en}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </ReactNativeModal>
    </ScreenLayout>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // width:width
    // paddingHorizontal: 20
    backgroundColor: '#131313',
    paddingBottom: 20,
    // height: height
  },
  input_container_sty: {
    paddingHorizontal: 10,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 0,
    width: width - 40,
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
    textAlign: I18nManager.isRTL ? 'right' : 'auto',
  },

  category_view: {
    width: Dimensions.get('screen').width - 40,
    borderRadius: 10,
    // marginHorizontal: 10,
    marginTop: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 52,
    paddingHorizontal: 15,
    // marginLeft:10
    alignSelf: 'center',
    // alignItems:'flex-end'
  },
});
