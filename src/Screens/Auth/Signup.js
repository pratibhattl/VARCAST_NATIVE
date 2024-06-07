import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  I18nManager,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import NavigationService from '../../Services/Navigation';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import Theme from '../../Constants/Theme';
import {AppTextInput, Icon} from 'react-native-basic-elements';
import {BlurView} from '@react-native-community/blur';
import {FONTS} from '../../Constants/Fonts';
import CustomHeader from '../../Components/Header/CustomHeader';
// import { ActivityIndicator } from 'react-native-paper';
import EyeOpen from '../../assets/icons/EyeOpen';
import EyeClose from '../../assets/icons/EyeClose';
import GmailIcon from '../../assets/icons/Gmail';
import AppleIcon from '../../assets/icons/AppleIcon';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {countryCodes} from '../../Constants/countryCodes';
import ReactNativeModal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import RNRestart from 'react-native-restart';
import HelperFunctions from '../../Constants/HelperFunctions';
import MyDropDownComponent from '../../Components/MyDropDownComponent/MyDropDownComponent';
const {width, height} = Dimensions.get('screen');

const Signup = props => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [value, setValue] = useState('');
  const [Name, setName] = useState('');
  const [Dob, setDob] = useState('');
  const [CountryModal, setCountryModal] = useState(false);
  const [countryCode, setCountryCode] = useState('91');
 
  const [countryCodeList, setCountryCodeList] = useState(countryCodes);
  const [isEmailMode, setIsEmailMode] = useState(true);
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ConfirmpasswordShow, setConfirmPasswordShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [Gender, setGender] = useState();
  const [GenderNew, setGenderNew] = useState();
  const [genderDropDown, setGenderDropDown] = useState(false);

  const {t, i18n} = useTranslation();

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
    setDob(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };
  const SignUpDetails = () => {
    if (Name == null || Name == undefined || Name?.trim()?.length == 0) {
      HelperFunctions.showToastMsg('Please enter your full name!');
    } else if (
      email == null ||
      email == undefined ||
      email?.trim()?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter your email!');
    } else if (!HelperFunctions.isvalidEmailFormat(email)) {
      HelperFunctions.showToastMsg('Please enter valid email!');
    } else if (
      value == null ||
      value == undefined ||
      value?.trim()?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter your phone number!');
    } else if (value.length < 10) {
      HelperFunctions.showToastMsg(
        'Phone number must contain minimum 10 digits!!',
      );
    } else if (Dob == null || Dob == undefined || Dob?.trim()?.length == 0) {
      HelperFunctions.showToastMsg('Please provide your date of birth!');
    } else if (
      GenderNew == null ||
      GenderNew == undefined ||
      GenderNew?.trim()?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please select your gender!');
    } else if (
      password == null ||
      password == undefined ||
      password?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please enter your password!');
    } else if (password?.length < 8) {
      HelperFunctions.showToastMsg('Password must contain minimum 8 digits!!');
    } else if (
      ConfirmPassword == null ||
      ConfirmPassword == undefined ||
      ConfirmPassword?.length == 0
    ) {
      HelperFunctions.showToastMsg('Please confirm your password!');
    } else if (password != ConfirmPassword) {
      HelperFunctions.showToastMsg(
        'Confirm Password and password are not same!!',
      );
    } else {
      // setLoader(true)
      let data = {
        name: Name,
        email: email,
        phone: value,
        password: password,
        password_confirmation: ConfirmPassword,
        country_id:countryCode.toString(''),
        dob: Dob,
        gender: GenderNew == 'Male' ? 'M' : GenderNew == 'Female' ? 'F' : 'O',
      };
      NavigationService.navigate('UploadGovtID', {details: data});
      // postApi("api/login", data, "").then(response => {
      //   // console.log('response',response)
      //   if (response?.status =='success') {
      //     storeToLocalAndRedux(response)
      //     HelperFunctions.showToastMsg("Logged In Successfully")
      //     // NavigationService.navigate('BottomTabNavigation')
      //     setLoader(false)

      //   } else {
      //     setModalVisible(true)
      //     setLoader(false)

      //   }
      // }).catch(error => {
      //   HelperFunctions.showToastMsg(error?.message)
      //   setLoader(false)
      // }).finally(() => {
      //   setLoader(false)
      // })
    }
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
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />
      <CustomHeader
        HeaderColor={'rgba(27, 27, 27, 0.96)'}
        leftHeading={'Sign Up'}
        onLeftIconPress={() => NavigationService.back()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        <AppTextInput
          value={Name}
          onChangeText={a => setName(a)}
          placeholder="Full Name"
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
            type: 'Feather',
            color: '#fff',
            size: 20,
          }}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />
        <AppTextInput
          value={email}
          onChangeText={a => setEmail(a)}
          placeholder="Email"
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
              value={Gender}
              onChange={e => {
                console.log('rtrt', e);
                setGender(e);
                setGenderNew(e.type);
              }}
            />
          </View>
        </View>
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '43%',
              height: 1,
              backgroundColor: 'rgba(118, 118, 128, 0.34)',
            }}
          />
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 15,
              fontFamily: Theme.FontFamily.medium,
            }}>
            or
          </Text>
          <View
            style={{
              width: '43%',
              height: 1,
              backgroundColor: 'rgba(118, 118, 128, 0.34)',
            }}
          />
        </View>

        {Platform.OS === 'ios' ? (
          <Pressable
            style={{
              height: 53,
              width: width - 40,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 15,
              marginTop: 21,
              flexDirection: 'row',
            }}>
            <AppleIcon />
            <Text
              style={{
                color: '#131313',
                textAlign: 'center',
                marginHorizontal: 16,
                fontFamily: Theme.FontFamily.medium,
                fontSize: Theme.sizes.s15,
              }}>
              Apple
            </Text>
          </Pressable>
        ) : null}
        <Pressable
          style={{
            height: 53,
            width: width - 40,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 15,
            marginTop: 21,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/images/GoogleLogo.png')}
            style={{
              width: 24,
              height: 24,
            }}
          />
          <Text
            style={{
              color: '#131313',
              textAlign: 'center',
              marginHorizontal: 15,
              fontFamily: Theme.FontFamily.medium,
              fontSize: Theme.sizes.s15,
            }}>
            Google
          </Text>
        </Pressable>
      </ScrollView>
      {/* <Pressable style={{
          height:53,
          width:width-40,
          alignSelf:'center',
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:'#fff',
          borderRadius:15,
          marginVertical:21,
          flexDirection:'row'
        }}>
           <GmailIcon/>
          <Text 
        style={{color:'#131313',textAlign:'center',marginHorizontal:15,
        fontFamily:Theme.FontFamily.medium,fontSize:Theme.sizes.s15}}>Gmail</Text>
        </Pressable> */}
      {/* <View
       style={{flex:1}}
       /> */}
      <Pressable
        onPress={() => {
          // changeloadingState(true)
          // setTimeout(()=>{
          //   props.navigation.reset({index:0, routes: [{ name: 'DrawerNavigation' }]})
          //   changeloadingState(false)
          // },1000)
          SignUpDetails();
        }}
        style={{
          height: 53,
          width: width - 40,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E1D01E',
          borderRadius: 15,
          marginTop: 10,
          flexDirection: 'row',
          marginBottom: 25,
        }}>
        <Text
          style={{
            color: '#131313',
            textAlign: 'center',
            marginRight: 10,
            fontFamily: Theme.FontFamily.medium,
            fontSize: Theme.sizes.s16,
          }}>
          {t('Upload Image')}
        </Text>
        {loadingState ? <ActivityIndicator size={20} color="#131313" /> : null}
      </Pressable>

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
                  key={index}
                  onPress={() => {
                    setCountryCode(item.dial_code.replace('+', ''));
                    setCountry_id(item.code)
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
    </SafeAreaView>
  );
};

export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    paddingBottom: 25,
    // height:height
    // paddingHorizontal:10
    // height:100s
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
    textAlign: I18nManager.isRTL ? 'right' : 'left',
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
  },
});
