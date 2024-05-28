import {
  View,
  Text,
  TextInput,
  TextInputComponent,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  I18nManager,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../Constants/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import DrawerIcon from '../../assets/icons/DrawerIcon';
import Notification from '../../assets/icons/Notification';
import ChatIcon from '../../assets/icons/ChatIcon';
import {Platform} from 'react-native';
import EditIcon from '../../assets/icons/EditIcon';
// import IonIcon from 'react-native-vector-icons/Ionicons'

const HomeHeader = props => {
  return (
    <View
      style={[
        {
          backgroundColor: props.HeaderColor ? props.HeaderColor : 'white',
          paddingTop: Platform.OS === 'ios' ? 20 : 60,
          paddingVertical: 10,
          paddingHorizontal: 18,
          paddingLeft: 20,
          minHeight: 65,
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        props.style,
      ]}>
      {/* {props.leftIconComponent?props.leftIconComponent:<IonIcon onPress={props.onLeftIconPress} style={[styles.lefticonStyle]} name={props.vectorIconName?props.vectorIconName:"chevron-back"} color={props.vectorIconColor?props.vectorIconColor:Theme.colors.white} size={25} />} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '63%',
        }}>
        <Pressable onPress={props.onLeftIconPress}>
          {props.Chat ? (
            <IonIcon
              onPress={props.onLeftIconPress}
              style={[styles.lefticonStyle]}
              name={I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
              color={
                props.vectorIconColor
                  ? props.vectorIconColor
                  : Theme.colors.white
              }
              size={25}
            />
          ) : (
            <DrawerIcon />
          )}
        </Pressable>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={{
            width: 89,
            height: 29,
            marginTop: 2,
          }}
        />
      </View>
      {props.Play ? (
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/images/AddCircle.png')}
            style={{
              height: 26,
              width: 26,
              // marginRight:12
            }}
          />
        </View>
      ) : props.Edit ? (
        <View style={{flexDirection: 'row'}}>
          <Notification />
          <Pressable onPress={props.EditIconPress}>
            <EditIcon />
          </Pressable>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={props.NotiIconPress}>
            <Notification />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.ChatIconPress}>
            <ChatIcon />
          </TouchableOpacity>
        </View>
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
    fontFamily: Theme.FontFamily.medium,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeHeader;
