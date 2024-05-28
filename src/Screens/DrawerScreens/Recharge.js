import {BlurView} from '@react-native-community/blur';
import React, {useState} from 'react';
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
const {width, height} = Dimensions.get('screen');

const Recharge = props => {
  const [Amount, setAmount] = useState('');
  const [ValueCoin, setValueCoin] = useState('');

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
              1000 Coins
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
            data={['1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', '10K']}
            horizontal
            contentContainerStyle={{marginLeft: 20, marginVertical: 25}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => setValueCoin(item)}
                  style={{
                    width: 104,
                    height: 84,
                    borderRadius: 15,
                    backgroundColor: ValueCoin == item ? '#E1D01E' : '#1C1C1C',
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
                        color: ValueCoin == item ? '#000' : '#fff',
                        fontSize: 18,
                        fontFamily: Theme.FontFamily.semiBold,
                        //  textAlign:'center',
                        marginLeft: 8,
                      }}>
                      {item}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: ValueCoin == item ? '#000' : '#fff',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.normal,
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    $ {0.49 + index}
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
                $ 0.99
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
            onPress={() => NavigationService.navigate('BottomTabNavigation')}
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
