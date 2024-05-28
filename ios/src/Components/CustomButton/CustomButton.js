import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Theme from '../../Constants/Theme';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          backgroundColor: Theme.colors.primary,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
          height: 45,
        },
        props.style,
      ]}>
      <Text
        style={[
          {
            fontFamily: Theme.FontFamily.normal,
            color: Theme.colors.white,
            fontSize: Theme.sizes.s15,
            textAlign: 'center',
            textTransform: 'none',
          },
          props.buttonTextStyle,
        ]}>
        {props.buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
