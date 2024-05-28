import {
  View,
  Text,
  TextInput,
  TextInputComponent,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../Constants/Theme';
import EyeHide from '../../assets/icons/EyeHide';

const EditTextComponent = props => {
  return (
    <View
      style={[
        {
          borderRadius: 4,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: Theme.colors.inputFieldColor,
          height: 45,
        },
        props.style,
      ]}>
      {props.isLeftIconVisible ? (
        props.leftIconPath ? (
          props.leftIconPath
        ) : (
          <TouchableOpacity style={{paddingRight: 5, justifyContent: 'center'}}>
            <EyeHide />
          </TouchableOpacity>
        )
      ) : null}
      {/* <View style={{flex:1,justifyContent:'center'}}> */}
      <TextInput
        style={[
          {
            color: Theme.colors.black,
            flex: 1,
            textAlign: 'left',
            marginLeft: 4,
            fontSize: 14,
            fontFamily: Theme.FontFamily.normal,
          },
          props.textInputStyle,
        ]}
        editable={props.editable === null ? true : props.editable}
        selectTextOnFocus={
          props.selectTextOnFocus === null ? true : props.selectTextOnFocus
        }
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        value={props.value}
        placeholderTextColor={
          props.placeholderTextColor
            ? props.placeholderTextColor
            : Theme.colors.inputFieldPlaceHolderColor
        }
        multiline={props.multiline || false}
        error={props.error}
        maxLength={props.maxLength}
        autoCapitalize={props.autoCapitalize ? props.autoCapitalize : null}
        contextMenuHidden={
          props.contextMenuHidden ? props.contextMenuHidden : false
        }
      />
      {/* </View> */}
      {props.isRightIconVisible ? (
        props.rightIconPath ? (
          props.rightIconPath
        ) : (
          <TouchableOpacity style={{paddingLeft: 5, justifyContent: 'center'}}>
            <EyeHide />
          </TouchableOpacity>
        )
      ) : null}
    </View>
  );
};

export default EditTextComponent;
