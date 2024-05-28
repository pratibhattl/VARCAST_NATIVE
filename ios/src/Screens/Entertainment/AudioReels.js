import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import Theme from '../../Constants/Theme';
import {ClipPath} from 'react-native-svg';
import ClockCircleIcon from '../../assets/icons/ClockCircleIcon';
import NavigationService from '../../Services/Navigation';

const AudioReels = () => {
  const [allImage, setAllImage] = useState([
    {img: require('../../assets/images/image103.png')},
    {img: require('../../assets/images/image97.png')},
    {img: require('../../assets/images/image105.png')},
    {img: require('../../assets/images/image154.png')},
    {img: require('../../assets/images/image155.png')},
    {img: require('../../assets/images/image156.png')},
    {img: require('../../assets/images/image157.png')},
    // {img:require('../../assets/images/image157(1).png')},
    {img: require('../../assets/images/image158.png')},
    {img: require('../../assets/images/image159.png')},
    {img: require('../../assets/images/image160.png')},
    {img: require('../../assets/images/image161.png')},
    {img: require('../../assets/images/image162.png')},
    {img: require('../../assets/images/image105.png')},
    {img: require('../../assets/images/image154.png')},
    {img: require('../../assets/images/image155.png')},
    {img: require('../../assets/images/image156.png')},
    {img: require('../../assets/images/image103.png')},
  ]);
  return (
    <View style={styles.container}>
      <FlatList
        data={allImage}
        //    horizontal
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 0, paddingVertical: 10}}
        renderItem={({item, index}) => {
          return (
            <Pressable
              onPress={() => NavigationService.navigate('PodcastIndex')}
              key={index}
              style={{
                marginRight: index % 2 == 0 ? 15 : 0,
                marginTop: 10,
                borderRadius: 15,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                overflow: 'hidden',
              }}>
              <Image
                source={item?.img}
                style={{
                  height: 180,
                  width: 180,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  height: 55,
                  width: 180,
                  backgroundColor: '#1C1C1C',
                  borderBottomRightRadius: 15,
                  borderBottomLeftRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                }}>
                <Text
                  style={{
                    fontFamily: Theme.FontFamily.normal,
                    color: '#fff',
                    fontSize: Theme.sizes.s13,
                  }}>
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(28, 28, 28, 0.54)',
                  height: 33,
                  width: 33,
                  borderRadius: 33,
                  position: 'absolute',
                  top: 5,
                  left: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Theme.FontFamily.normal,
                    color: '#fff',
                    fontSize: Theme.sizes.s12,
                  }}>
                  {index + 1}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(28, 28, 28, 0.54)',
                  height: 20,
                  width: 60,
                  borderRadius: 5,
                  position: 'absolute',
                  bottom: 65,
                  right: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <ClockCircleIcon />
                <Text
                  style={{
                    fontFamily: Theme.FontFamily.normal,
                    color: '#fff',
                    fontSize: 11,
                    marginHorizontal: 3,
                  }}>
                  2.45
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default AudioReels;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
});
