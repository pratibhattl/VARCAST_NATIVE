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
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import { useIsFocused } from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

const Wallet = (props) => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authData.token);
  const [transactions, setTransactions] = useState([]);
  const [coinBalance, setCoinBalance] = useState(0);
  const [totalCoin,setTotalCoin] = useState('')
  const fetchData = async () => {
    try {
      const endpoint = 'coin-inventory/index';
      const response = await apiCall(endpoint, 'GET', {}, token);

      if (response.status) {
        setTotalCoin(response?.data?.total)
        setTransactions(response?.data?.listData);
        setCoinBalance(response?.data?.countData);
      } else {
        console.error('Error fetching data: ', response?.message);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <LinearGradient
            colors={['#131313', 'rgba(225, 208, 30, 0.1)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            useAngle={true}
            angle={90}
            style={{
              flex: 1,
              paddingTop: Platform.OS === 'ios' ? 20 : 50,
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Pressable onPress={() => NavigationService.back()}>
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
                  marginLeft: '34%',
                }}>
                Wallet
              </Text>
            </View>
            <View style={{alignSelf: 'center', marginTop: 40}}>
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
                fontSize: 20,
                fontFamily: Theme.FontFamily.semiBold,
                textAlign: 'center',
                marginTop: 20,
              }}>
              {totalCoin}
            </Text>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('Recharge')}
              style={{
                height: 53,
                width: 350,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E1D01E',
                borderRadius: 15,
                marginTop: 35,
              }}>
              <Text
                style={{
                  color: '#131313',
                  textAlign: 'center',
                  fontFamily: Theme.FontFamily.medium,
                  fontSize: Theme.sizes.s16,
                }}>
                Add More Coin
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={{
            flex: 1.5,
            backgroundColor: '#1C1C1C',
            borderRadius: 20,
          }}>
          <View
            style={{
              alignSelf: 'center',
              height: 4,
              width: 32,
              backgroundColor: 'rgba(118, 118, 128, 0.24)',
              marginTop: 8,
              marginBottom: 15,
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {transactions.map(transaction => (
              <View
                key={transaction._id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 70,
                  paddingHorizontal: 20,
                  padding: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: 45,
                      backgroundColor: 'rgba(118, 118, 128, 0.24)',
                    }}
                  />
                  <View style={{paddingHorizontal: 20}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: Theme.FontFamily.medium,
                      }}>
                    {transaction.type === 'credit' && transaction.giftId ? `Earned (${transaction?.podcast?.title})` : "Credited" }
                      {transaction.type === 'debited' && "Debited"}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                      }}>
                      Date: {formatDate(transaction.created_at)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Theme.FontFamily.normal,
                    color:
                      transaction.type === 'credit' ? '#1CB62B' : '#ED4040',
                  }}>
                  {transaction.type === 'credit'
                    ? `+ ${transaction.coin_value}`
                    : `- ${transaction.coin_value}`}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
});

export default Wallet;
