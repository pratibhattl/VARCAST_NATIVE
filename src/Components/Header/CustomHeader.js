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
import PlaylistIcon from '../../assets/icons/PlayListIcon';
import Icon from 'react-native-vector-icons';
import ThreeDots from '../../assets/icons/ThreeDots';
import {useTranslation} from 'react-i18next';

const CustomHeader = props => {
  const {t, i18n} = useTranslation();

  return (
    <View
      style={[
        {
          backgroundColor: props.HeaderColor ? props.HeaderColor : 'white',
          paddingTop: Platform.OS === 'ios' ? 20 : 60,
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
      {props.Podcast ? (
        <PlaylistIcon Color={'#fff'} />
      ) : props.Watch ? (
        <ThreeDots />
      ) : (
        <Text
          style={[
            {
              color: props.Noti ? '#E1D01F' : Theme.colors.white,
              fontFamily: Theme.FontFamily.medium,
              fontSize: 15,
              textAlign: 'center',
            },
            props.leftHeadingStyle,
          ]}
          onPress={props.onRightTextPress}>
          {props.right
            ? 'Next'
            : props.Save
            ? 'Save'
            : props.Publish
            ? 'Publish'
            : props.Noti
            ? 'Read All'
            : '      '}
        </Text>
      )}
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
    fontFamily: Theme.FontFamily.normal,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomHeader;
