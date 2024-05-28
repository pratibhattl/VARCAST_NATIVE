import {
  View,
  Text,
  TextInput,
  TextInputComponent,
  TouchableOpacity,
  StyleSheet,
  Platform,
  I18nManager,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../Constants/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../Constants/Fonts';

const LiveHeader = props => {
  return (
    <View
      style={[
        {
          backgroundColor: props.HeaderColor
            ? props.HeaderColor
            : 'rgba(27, 27, 27, 0.30);',
          paddingTop: 80,
          paddingVertical: 15,
          paddingHorizontal: 20,
          minHeight: 65,
          width: '100%',
          alignItems: 'center',
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
        },
        props.style,
      ]}>
      {props.leftIconComponent ? (
        props.leftIconComponent
      ) : (
        <IonIcon
          onPress={props.onLeftIconPress}
          style={[styles.lefticonStyle]}
          name={props.vectorIconName ? props.vectorIconName : 'chevron-back'}
          color={
            props.vectorIconColor ? props.vectorIconColor : Theme.colors.white
          }
          size={25}
        />
      )}
      <Text style={[styles.leftHeadingStyle]}>{props.leftHeading}</Text>
      <Text
        style={[styles.leftHeadingStyle, props.leftHeadingStyle]}
        onPress={props.onRightTextPress}>
        {props.right ? 'Next' : '      '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lefticonStyle: {
    // marginStart:'3%',
    // paddingHorizontal:20
  },
  leftHeadingStyle: {
    color: Theme.colors.white,
    fontFamily: Theme.FontFamily.medium,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LiveHeader;
