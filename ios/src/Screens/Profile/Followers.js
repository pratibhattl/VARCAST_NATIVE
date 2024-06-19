import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import NavigationService from '../../Services/Navigation';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import Theme from '../../Constants/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Image} from 'react-native';
import {Pressable} from 'react-native';
import {Icon} from 'react-native-basic-elements';
import ThreeDots from '../../assets/icons/ThreeDots';
const {width, height} = Dimensions.get('screen');

const Followers = () => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [allData, setAllData] = useState([
    {
      title: 'Video Watched',
      date: '9 videos • 5 podcasts',
      time: '• 19:45',
      image: require('../../assets/images/image3.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'I Liked the Podcast',
      date: '7 videos • 14 podcasts',
      time: '• 19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Purchased 300 coins',
      date: '31 videos • 12 podcasts',
      time: '• 14:45',
      image: require('../../assets/images/image3.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      title: 'Video Watched',
      date: '15 videos • 14 podcasts',
      time: '• 19:45',
      image: require('../../assets/images/image153.png'),
      details: 'Pitbull by Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Video Watched',
      date: '7 videos • 14 podcasts',
      time: '• 19:45',
      image: require('../../assets/images/image150.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'I Liked the Podcast',
      date: '7 videos • 14 podcasts',
      time: '• 19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Purchased 300 coins',
      date: '23 Sep ',
      time: '• 14:45',
      image: require('../../assets/images/image3.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      title: 'Video Watched',
      date: '7 videos • 14 podcasts',
      time: '• 19:45',
      image: require('../../assets/images/image153.png'),
      details: 'Pitbull by Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
  ]);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={'Followers'}
      // viewStyle={{backgroundColor:'transparent'}}
      // right
      // Save
      // onRightTextPress={() => NavigationService.navigate('DrawerNavigation')}
      // Publish
      leftHeadingStyle={{color: '#E1D01E'}}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          {allData.map((res, ind) => {
            return (
              <View
                key={ind}
                style={{
                  flexDirection: 'row',
                  // alignItems: 'center',
                  // justifyContent:'space-between',
                  marginTop: 15,
                }}>
                <Image
                  source={res?.image}
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 45,
                  }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    marginLeft: 20,
                    borderColor: 'rgba(118, 118, 128, 0.24)',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    marginTop: 5,
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: Theme.FontFamily.medium,
                      }}>
                      {res.title}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                        marginTop: 3,
                      }}>
                      {res.date}{' '}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      // setModalVisible(false)
                      // NavigationService.navigate('Publication02')
                    }}
                    style={{
                      marginRight: 20,
                    }}>
                    {/* <ThreeDots /> */}
                  </Pressable>
                </View>
              </View>
            );
          })}
        </KeyboardAwareScrollView>
      </View>
    </ScreenLayout>
  );
};

export default Followers;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // width:width
    // paddingHorizontal: 20
    backgroundColor: '#131313',
    height: height,
    paddingLeft: 20,
  },
  input_container_sty: {
    paddingHorizontal: 10,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 0,
    width: width - 40,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 0.7,
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
