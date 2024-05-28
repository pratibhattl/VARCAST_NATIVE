import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import React from 'react';

import Theme from '../../Constants/Theme';
import PauseIcon from '../../assets/icons/PauseIcon';
import PlayNext from '../../assets/icons/PlayNext';
import {Image} from 'react-native';
const {width, height} = Dimensions.get('screen');

const SongPlayComp = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: 65,
          width: width,
          padding: 10,
          paddingHorizontal: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/images/image97.png')}
          style={{
            height: 45,
            width: 45,
            borderRadius: 10,
            marginRight: 5,
          }}
          resizeMode="cover"
        />
        <View style={{width: '60%', marginHorizontal: 10}}>
          <Text
            numberOfLines={1}
            style={{
              color: '#fff',
              fontSize: 16,
              fontFamily: Theme.FontFamily.semiBold,
              // maxWidth:'75%',
              // textAlign:'center'
              // marginTop: 10,
              // fontWeight:'600',
            }}>
            How to Pitch Your Best Ideas dssds sdsd
          </Text>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 14,
              fontFamily: Theme.FontFamily.normal,
              // fontWeight:'400',
              marginTop: 5,
              // textAlign: 'center'
            }}>
            Hosted by: Adrian Reif
          </Text>
        </View>
        <Pressable style={{marginHorizontal: 5, marginRight: 10}}>
          <PauseIcon Color={'#fff'} />
        </Pressable>
        <PlayNext />
      </View>
    </View>
  );
};

export default SongPlayComp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
});
