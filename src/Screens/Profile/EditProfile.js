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
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import EditIcon from '../../assets/icons/EditIcon';
import EditProfileIcon from '../../assets/icons/EditProfileIcon';
import {AppTextInput, Icon} from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import EyeOpen from '../../assets/icons/EyeOpen';
import EyeClose from '../../assets/icons/EyeClose';
import {useDispatch, useSelector} from 'react-redux';
import {PERMISSIONS} from 'react-native-permissions';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import HelperFunctions from '../../Constants/HelperFunctions';
import {postApi} from '../../Services/Service';
import {countryCodes} from '../../Constants/countryCodes';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ReactNativeModal from 'react-native-modal';
import MyDropDownComponent from '../../Components/MyDropDownComponent/MyDropDownComponent';
import moment from 'moment';
import {setData} from '../../Services/LocalStorage';
import {setToken, setUserDetails} from '../../Store/Reducers/AuthReducer';

const {width, height} = Dimensions.get('screen');

const EditProfile = () => {
  const route = useRoute();
  const {login_status, userDetails, token, deviceid} = useSelector(
    state => state.authData,
  );
  const dispatch = useDispatch();

  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [email, setEmail] = useState(userDetails?.email);
  const [Name, setName] = useState(userDetails?.name ?? '');
  const [Dob, setDob] = useState(
    moment(userDetails?.dob, 'YYYY-MM-DD').format('MMM Do YYYY'),
  );
  const [CountryModal, setCountryModal] = useState(false);
  const [countryCode, setCountryCode] = useState(userDetails?.country_id ?? '');
  const [countryCodeList, setCountryCodeList] = useState(countryCodes);
  const [isEmailMode, setIsEmailMode] = useState(true);
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [Gender, setGender] = useState();
  const [GenderNew, setGenderNew] = useState(
    userDetails?.gender == 'F'
      ? 'Female'
      : userDetails?.gender == 'M'
      ? 'Male'
      : 'Others',
  );
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [Oldpassword, setOldPassword] = useState('');
  const [OldpasswordShow, setOldPasswordShow] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ConfirmpasswordShow, setConfirmPasswordShow] = useState(false);
  const form = new FormData();
  const [imagesdet, setimagesdet] = useState({
    hasChanges: false,
    mime: 'video/mp4',
    modificationDate: 1711626336028,
    path: 'file:///storage/emulated/0/Android/data/com.varcast.app/files/Pictures/video-a8475195-782d-44b0-b9bd-bbdfcbb283c42808684410008036142.mp4',
    serialization: null,
    video:
      'file:///storage/emulated/0/Android/data/com.varcast.app/files/Pictures/video-a8475195-782d-44b0-b9bd-bbdfcbb283c42808684410008036142.mp4',
  });
  const [userOtp, setUserOtp] = useState('');
  const [Loder, setLoader] = useState(false);
  const {t, i18n} = useTranslation();
  const [value, setValue] = useState(userDetails?.phone ?? '');

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
    let arr = data.split('/');
    let lent = Number(arr.length - 1);
    return arr[lent];
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
  const imageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('imaher', image);
      let get_originalname = getOriginalname(image.path);

      // form.append('image_for', 'profile_image');
      form.append('image', {
        uri: image.path,
        type: image.mime,
        name: get_originalname,
      });
      setimagesdet(image);
      // console.log('form',form)
      //  if(form!=null && image){
      //   UpdateProfileImage()
      //  }
    });
  };
  const UpdateProfile = () => {
    if (imagesdet) {
      let get_originalname = getOriginalname(imagesdet.path);

      // form.append('image_for', 'profile_image');
      form.append('image', {
        uri: imagesdet.path,
        type: imagesdet.mime,
        name: get_originalname,
      });
    }
    setLoader(true);
    form.append('name', Name);
    form.append('email', email);
    form.append('phone', value);
    form.append('password', password);
    form.append('old_password', Oldpassword);
    form.append('password_confirmation', ConfirmPassword);
    form.append('country_id', countryCode);
    form.append('dob', moment(Dob, 'MMM Do YYYY').format('YYYY-MM-DD'));
    form.append(
      'gender',
      GenderNew == 'Male' ? 'M' : GenderNew == 'Female' ? 'F' : 'O',
    );
    form.append('register_for', 'app');
    form.append('device_token', deviceid);
    postApi('api/edit-profile', form, token, 'multipart/form-data')
      .then(response => {
        // console.log('response',response)
        if (response?.status == 'success') {
          storeToLocalAndRedux(response);
          HelperFunctions.showToastMsg('Profile Updated Successfully');
          NavigationService.back();

          setLoader(false);
        } else {
          HelperFunctions.showToastMsg(response?.message);
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
  };
  const UpdatePassword = () => {
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
      let data = {
        old_password: Oldpassword,
        password: password,
        password_confirmation: ConfirmPassword,
      };
      postApi('api/update-password', data, token)
        .then(response => {
          // console.log('response',response)
          if (response?.status == 'success') {
            HelperFunctions.showToastMsg('Password Changed Successfully');
            setConfirmPassword('');
            setPassword('');
            setOldPassword('');
            changeloadingState(false);
          } else {
            HelperFunctions.showToastMsg(response?.message);
            changeloadingState(false);
          }
        })
        .catch(error => {
          HelperFunctions.showToastMsg(error?.message);
          changeloadingState(false);
        })
        .finally(() => {
          changeloadingState(false);
        });
    }
  };
  const storeToLocalAndRedux = userDataa => {
    console.log('userDataa', userDataa?.data);

    setData('account', userDataa?.data);
    // setData('token', userDataa?.auth_token)
    dispatch(setUserDetails(userDataa?.data));
    // dispatch(setToken(userDataa?.auth_token))
  };
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      showLoading={Loder}
      isScrollable={true}
      leftHeading={'Edit Profile'}
      Save
      onRightTextPress={() =>
        // NavigationService.navigate('DrawerNavigation')
        UpdateProfile()
      }
      // Publish
      leftHeadingStyle={{color: '#E1D01E'}}
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
              uri: imagesdet ? imagesdet.path : userDetails?.full_path_image,
            }}
            style={{
              height: 90,
              width: 90,
              borderRadius: 20,
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
          onChangeText={a => setEmail(a)}
          placeholder="Email or Phone Number"
          placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
          inputStyle={{fontSize: 14}}
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
            onPress={() => setCountryModal(true)}
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
              style={{marginHorizontal: 5}}
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
            editable={true}
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
            style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
            <Icon
              name="calendar"
              type="Entypo"
              color={'#fff'}
              size={20}
              style={{marginRight: 15}}
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
            style={{marginLeft: I18nManager.isRTL ? 10 : 0}}
          />
        </TouchableOpacity>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <View style={{}}>
            <MyDropDownComponent
              onBlur={() => setGenderDropDown(false)}
              onFocus={() => setGenderDropDown(true)}
              itemTextStyle={{color: '#000'}}
              selectedTextStyle={{color: '#fff'}}
              itemTestIDField="English"
              placeholder="Select gender"
              placeholderStyle={{color: 'rgba(255, 255, 255, 0.54)'}}
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
                        style={{alignSelf: 'center', marginRight: 8}}
                      />
                    )
              }
              style={{
                ...styles.category_view,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
              data={[{type: 'Male'}, {type: 'Female'}, {type: 'Others'}]}
              labelField="type"
              valueField="type"
              value={GenderNew}
              onChange={e => {
                console.log('rtrt', e);
                setGender(e);
                setGenderNew(e.type);
              }}
            />
          </View>
        </View>
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
              style={{marginHorizontal: 10}}
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
