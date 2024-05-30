import {BlurView} from '@react-native-community/blur';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../Components/Header/CustomHeader';
import {Image} from 'react-native';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import {AppTextInput} from 'react-native-basic-elements';
import { apiCall } from '../../Services/Service';
import {useSelector} from 'react-redux';
import HelperFunctions from '../../Constants/HelperFunctions';
import AllSourcePath from '../../Constants/PathConfig';
import axios from 'axios';

const {width, height} = Dimensions.get('screen');

const Recharge = props => {
  const [Amount, setAmount] = useState('');
  const [coinValue, setCoinValue] = useState({});
  const [coinPalnList, setCoinPlanList] = useState([]);
  const [Loder, setLoader] = useState(false);
  const token = useSelector(state => state.authData.token);
  const baseUrl = AllSourcePath.API_BASE_URL_DEV;

  const fetchPlanList = async () => {
    setLoader(true);
    try {
      const endpoint = 'coin-inventory/plans';
      const response = await apiCall(endpoint, 'GET', {}, token);
      const data = response?.data?.listData; 
      console.log(data,"data");
      setCoinPlanList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchPlanList();
  }, []);


  const paymentForAddCoins = () => {
    setLoader(true);
    const formData = new FormData();
    console.log(token,"token");
    formData.append('coin_id', coinValue?._id);
    axios
      .post(`${baseUrl}coin-inventory/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setLoader(false);
        NavigationService.navigate('Wallet');
        setCoinValue({})
        if (response?.status === true) {
          HelperFunctions.showToastMsg(response?.message);
          NavigationService.navigate('Wallet');
        } else {
          setLoader(false);
        }
      })
      .catch(error => {
        HelperFunctions.showToastMsg(error?.message);
        setLoader(false);
      })
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            // backgroundColor:'red'
          }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(225, 208, 30, 0.1)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0}}
            useAngle={true}
            angle={90}
            // angleCenter={{ x: 0.5, y: 0.5 }}
            style={{
              flex: 1,
              paddingTop: Platform.OS === 'ios' ? 20 : 50,
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  NavigationService.navigate('Wallet');
                }}>
                <Image
                  source={require('../../assets/images/Group3x.png')}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </Pressable>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: Theme.FontFamily.medium,
                  //  alignSelf:'center'
                  marginLeft: width / 3.5,
                  //  textAlign:'center'
                }}>
                Recharge
              </Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 40,
              }}>
              <Image
                source={require('../../assets/images/Mask2x.png')}
                style={{
                  height: 65,
                  width: 65,
                }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                fontFamily: Theme.FontFamily.normal,
                textAlign: 'center',
                marginTop: 45,
              }}>
              Recharge
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 21,
                fontFamily: Theme.FontFamily.semiBold,
                textAlign: 'center',
                marginTop: 10,
              }}>
               {coinValue?.from_coin} Coins
            </Text>
          </LinearGradient>
        </View>
        <View
          style={{
            flex: 1.4,
            backgroundColor: '#131313',
            // borderRadius:20,
            // paddingTop:30
          }}>
          <AppTextInput
            value={Amount}
            onChangeText={a => setAmount(a)}
            placeholder="Please enter the amount"
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
              <Pressable>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 11,
                    fontFamily: Theme.FontFamily.semiBold,
                    textAlign: 'center',
                    //  marginTop:45
                  }}>
                  COINS
                </Text>
              </Pressable>
            }
            // leftIcon={{
            //   name: 'lock',
            //   type: 'Feather',
            //   color: '#fff',
            //   size: (20),
            // }}
            // secureTextEntry={passwordShow ? false : true}
            // onRightIconPress={() => setPasswordShow(!passwordShow)}
            inputContainerStyle={styles.input_container_sty}
            style={styles.text_style}
          />

          <FlatList
            data={coinPalnList}
            horizontal
            contentContainerStyle={{marginLeft: 20, marginVertical: 25}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => setCoinValue(item)}
                  style={{
                    width: 104,
                    height: 84,
                    borderRadius: 15,
                    backgroundColor: coinValue?._id == item?._id ? '#E1D01E' : '#1C1C1C',
                    marginRight: 19,
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    borderWidth: 0.4,
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent:'center'
                    }}>
                    <Image
                      source={require('../../assets/images/Group13x.png')}
                      style={{
                        height: 25,
                        width: 25,
                      }}
                      resizeMode="cover"
                    />
                    <Text
                      style={{
                        color: coinValue?._id == item?._id ? '#000' : '#fff',
                        fontSize: 18,
                        fontFamily: Theme.FontFamily.semiBold,
                        //  textAlign:'center',
                        marginLeft: 8,
                      }}>
                      {item?.from_coin}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: coinValue?._id == item?._id ? '#000' : '#fff',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.normal,
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    $ {item?.price}
                  </Text>
                </Pressable>
              );
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: Theme.FontFamily.medium,
                //  textAlign:'center',
                marginLeft: 5,
              }}>
              Total
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: Theme.FontFamily.semiBold,
                  //  textAlign:'center',
                  marginRight: 5,
                }}>
                $ {coinValue?.price}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 10,
                  fontFamily: Theme.FontFamily.light,
                  //  textAlign:'center',
                  marginRight: 5,
                  marginTop: 5,
                }}>
                1,000 coins
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => paymentForAddCoins()}
            style={{
              height: 53,
              width: 350,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E1D01E',
              borderRadius: 15,
              marginVertical: 20,
            }}>
            <Text
              style={{
                color: '#131313',
                textAlign: 'center',
                fontFamily: Theme.FontFamily.medium,
                fontSize: Theme.sizes.s16,
              }}>
              Payment
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Recharge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    // paddingTop:60
  },
  input_container_sty: {
    paddingHorizontal: 10,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 0,
    width: 350,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 0,
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
