import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Theme from '../../Constants/Theme';
import CustomButton from '../CustomButton/CustomButton';
import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6';
import AllSourcePath from '../../Constants/PathConfig';
import RNBraintree from '@ekreative/react-native-braintree';
import HelperFunctions from '../../Constants/HelperFunctions';

const PaymentBottomSheet = props => {
  const [isVisible, setIsVisible] = useState(true);
  const paymentTypeList = [
    {id: 0, name: 'PayPal', icon: AllSourcePath.LOCAL_IMAGES.PayPal},
    {id: 1, name: 'Apple Pay', icon: AllSourcePath.LOCAL_IMAGES.ApplePay},
  ];

  const paypalPay = () => {
    RNBraintree.showPayPalModule({
      clientToken: props.clientToken,
      amount: props.amount,
      currencyCode: props.currencyCode,
    })
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log(error));
  };

  const applePay = () => {};

  return (
    <Modal animationType={'slide'} transparent={true} visible={true}>
      <Pressable
        style={{flex: 1 / 2}}
        onPress={() =>
          props.onBackgroundPress
            ? props.onBackgroundPress
            : setIsVisible(false)
        }>
        {props.children}
      </Pressable>
      <View
        style={{
          flex: 1 / 2,
          backgroundColor: '#f4f4f4',
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
        }}>
        <FlatList />

        <View style={{position: 'absolute', bottom: 5, flex: 1}}>
          <CustomButton
            style={{
              marginTop: 17,
              width: '92%',
              alignSelf: 'center',
            }}
            buttonText="Submit Now"
            onPress={() => props.navigation.replace('CardScreen')}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PaymentBottomSheet;

const styles = StyleSheet.create({});
