import React ,{useState} from 'react';
import { View, Text ,StyleSheet,SafeAreaView,Pressable,Image, ActivityIndicator, TouchableOpacity, Dimensions, I18nManager, FlatList,TextInput} from 'react-native';
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

import { countryCodes } from '../../Constants/countryCodes';
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('screen');

const ForgotPass = (props) => {
  const [email, setEmail] = useState('');
  const [OtpVerification, setOtpVerification] = useState(false);
  const [EmailVerification, setEmailVerification] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [Loder, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [EmailValid, setEmailValid] = useState(true);
const [responToken,setResponToken] = useState("")
const [value, setValue] = useState('');
const [isEmailMode, setIsEmailMode] = useState(true);
const [isMobileMode, setIsMobileMode] = useState(false);
const [CountryModal, setCountryModal] = useState(false);
const [countryCode,setCountryCode] = useState('+91')
const [countryCodeList,setCountryCodeList] = useState(countryCodes)
const [searchVal, setSearchVal] = useState("");

const { t,i18n } = useTranslation();

const handleInputChange = (text) => {
  if (validateOnlyNumbers(text)) {
    if (text.length === 11) {
      setIsEmailMode(false)
      setIsMobileMode(true)
      setValue(text)
      // Format input acc to phone no
    } else {
      setIsEmailMode(false)
      setIsMobileMode(true)
      setValue(text)
    }
  } else {
    if (validateEmail(text)) {
      setIsEmailMode(true)
      setIsMobileMode(false)
      setValue(text)
      // Format input acc to Email
    } else {
      setIsEmailMode(true)
      setIsMobileMode(false)
      setValue(text)
    }
  }
};

function validateEmail(emal) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
   
      if (val === "") { 
        setCountryCodeList(countryCodes); 
        setSearchVal(val)
        return; }
      const filterBySearch = countryCodes.filter((item) => {
          if (item.name.en.toLowerCase()
              .includes(val.toLowerCase())) { return item; }
      })
      setSearchVal(val)
      setCountryCodeList(filterBySearch);
  }

const SendOtp = () => {
  if (value == null || value == undefined || value?.trim()?.length == 0) {
    HelperFunctions.showToastMsg("Please enter your email")
  }
 
  else {
    setLoader(true)
    let data = {
      "email": value,
      "otp_for":"forgot_password"
    }
    postApi("api/resent-otp", data, "").then(response => {
      // console.log('response',response)
      if (response?.status =='success') {
        HelperFunctions.showToastMsg("OTP Sent Successfully")
        // NavigationService.navigate('BottomTabNavigation')
        setResponToken(response.token)
        setLoader(false)
        setModalVisible(true)
      } else {
        setEmailValid(false)
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
    leftHeading={'Forgot Password'}
    onLeftIconPress={()=>NavigationService.back()}
    />
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
              padding:12,
            }}>
            <Text
              style={{
                color: '#fff',
                // textAlign: 'center',
                fontFamily: Theme.FontFamily.normal,
                fontSize: Theme.sizes.s15,
              }}>
             You can reset your password by email using the “Recover” option below. To do this, just enter the email.
            </Text>
          </Pressable>
  
            {/* <AppTextInput
              value={email}
              onChangeText={a => setEmail(a)}
              placeholder="Email or Phone Number"
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
              rightAction={
                !EmailValid ?
                <Image 
                source={require('../../assets/images/DangerCircle.png')}
                style={{
                    height:25,
                    width:25
                }}
                />
                :null
              }
              inputContainerStyle={{
                paddingHorizontal: 10,
                height: 52,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderWidth: 0,
                width: 350,
                borderColor:!EmailValid ? '#ED4040' : 'rgba(255, 255, 255, 0.3)',
                borderWidth: 0.7,
                alignSelf:'center',
                marginTop:25
              }}
              style={styles.text_style}
            /> */}
             <View style={{
            paddingLeft: 10,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            width: width-60,alignSelf:'center',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 0.7, marginTop:25,
            flexDirection:'row',borderRadius:10
          }}>
            {isEmailMode ?
            
            <Icon
             name='email-outline'
             type='MaterialCommunityIcon'
             color='#fff'
             size={20}
             style={{width:'10%',marginLeft:20,marginRight:I18nManager.isRTL ? 20 : 0}}
            /> :
            <TouchableOpacity
            onPress={()=>setCountryModal(true)}
            style={{flexDirection:'row',alignItems:'center',width:countryCode.length > 3 ?'17%' : '13%',
            marginLeft:countryCode.length > 3 ? 30 : 20,}}>
            <Text style={{fontSize:15, fontFamily: Theme.FontFamily.bold,color:'#fff',}} >{countryCode}</Text>
            <Icon
             name='caretdown'
             type='AntDesign'
             color='#fff'
             size={8}
            
             style={{marginHorizontal:5}}
            />
            </TouchableOpacity>
            }
            <TextInput
              style={{ ...styles.input_container_sty,fontSize:15,textAlign:I18nManager.isRTL ? 'right' : 'left', 
                fontFamily: Theme.FontFamily.normal,color:'#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',borderWidth:0,paddingRight:20, 
                paddingHorizontal:isEmailMode ? 0:5, marginTop: 0, width: '90%' }}
              editable={true}
              blurOnSubmit={true}
              placeholder='Email or Phone Number'
              placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
              value={value}
              onChangeText={handleInputChange}
            // secureTextEntry={isSecure}
            keyboardType={isEmailMode ? 'email-address' : isMobileMode ? 'number-pad' : 'default' }
            />
          </View>
         
          {!EmailValid ?
          <Text
              style={{
                color: '#ED4040',
                paddingHorizontal:40,
                fontFamily: Theme.FontFamily.normal,
                fontSize: Theme.sizes.s15,
              }}>
              Please enter a valid email address
            </Text>
            :null
}
{/* {EmailVerification ?
<>
<Text style={{
            ...styles.enter_otp_txt,
            color: Theme.colors.white,marginTop: 40,marginHorizontal:20
          }}>Enter OTP in Email </Text>
<View style={{
          marginHorizontal: (5),
          justifyContent: 'center',alignSelf:'center',
          marginTop: 10, height: moderateScale(60)
        }}>


          <OtpInput
            numInputs={6}
            // editable={!userOtpVerify}
            onComplete={handleOtpComplete} />
        </View>
        </> : null
} */}
          <View
            style={{flex:1}}
          />
          <Pressable
          disabled={Loder}
            onPress={() => SendOtp()}
            style={{
              height: 53,
              width: 350,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:'#E1D01E' ,
              borderRadius: 15,
              marginBottom:25,flexDirection:'row'

            //   marginTop: 160,
            }}>
            <Text
              style={{
                color: '#131313',
                textAlign: 'center',
                fontFamily: Theme.FontFamily.medium,
                fontSize: Theme.sizes.s16,
              }}>
              Recover
            </Text>
            {Loder ?
                        <ActivityIndicator style={{ marginHorizontal: 10 }} color={"#000"} size={20} />
                        :
                        null
                    }
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
            height: 230,
            backgroundColor: '#fff',
            borderRadius: 20,
            alignItems: 'center',
            // justifyContent:'center',
            padding: 20,
          }}>
          <Image
            source={require('../../assets/images/CheckCircle.png')}
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
                fontSize:20,
                marginTop:5

              }}>
              Success
            </Text>
            <Text
              style={{
                color: 'rgba(19, 19, 19, 0.54)',
                fontFamily: Theme.FontFamily.normal,
                fontSize:16,
                textAlign:'center',
                marginVertical:8
              }}>
             OTP has been sent to provided email
            </Text>
            <Pressable
            onPress={() =>{
                setModalVisible(false)
                NavigationService.navigate('UpdatePass',{token:responToken})
            } 
        }
            style={{
              height: 52,
              width: 305,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E1D01E',
              borderRadius: 15,
              marginVertical: 12,
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
            height: height/2,
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
            inputContainerStyle={{  width:width-40,
              height:60,
              backgroundColor:'rgba(0, 0, 0, 0.09)',paddingRight:20,paddingLeft:10,borderWidth:0,
              marginTop:10,borderRadius:10,flexDirection:'row',alignItems:'center' }}
            style={{fontSize:16, fontFamily: Theme.FontFamily.normal,color:'#000',marginLeft:10}}
          />
            <FlatList
            data={countryCodeList}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index})=>{
              return(
                <Pressable
                onPress={()=>{
                  setCountryCode(item.dial_code)
                  setCountryModal(false)
                  setSearchVal("")
                  setCountryCodeList(countryCodes)
                }}
                style={{
                  width:width-40,
                  height:60,
                  backgroundColor:'rgba(0, 0, 0, 0.05)',paddingHorizontal:20,
                  marginTop:20,borderRadius:10,flexDirection:'row',alignItems:'center'
                }}>
                  <Text style={{fontSize:25, fontFamily: Theme.FontFamily.normal,color:'#000'}}>{item.flag}</Text>
                  <Text style={{fontSize:16, fontFamily: Theme.FontFamily.normal,color:'#000',width:'25%',textAlign:'center'}}>{item.dial_code}</Text>
                  <Text style={{fontSize:16, fontFamily: Theme.FontFamily.normal,color:'#000'}}>
                    {I18nManager.isRTL ? item.name.ar : item.name.en}</Text>

                </Pressable>
              )
            }}
            />
          </View>
          </ReactNativeModal>
    </SafeAreaView>
  );
}

export default ForgotPass;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#131313',
      paddingBottom:40
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
        alignSelf:'center',
        marginTop:25
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