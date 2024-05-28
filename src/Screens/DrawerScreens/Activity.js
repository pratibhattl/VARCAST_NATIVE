import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {useRoute} from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import {Image} from 'react-native';
import NavigationService from '../../Services/Navigation';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

const Activity = () => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [allData, setAllData] = useState([
    {
      title: 'Video Watched',
      date: '25 Sep ',
      time: '• 19:45',
      image: require('../../assets/images/image150.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'I Liked the Podcast',
      date: '25 Sep ',
      time: '• 19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Purchased 300 coins',
      date: '23 Sep ',
      time: '• 14:45',
      image: require('../../assets/images/Coin.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      title: 'Video Watched',
      date: '25 Sep ',
      time: '• 19:45',
      image: require('../../assets/images/image153.png'),
      details: 'Pitbull by Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Video Watched',
      date: '25 Sep ',
      time: '• 19:45',
      image: require('../../assets/images/image150.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'I Liked the Podcast',
      date: '25 Sep ',
      time: '• 19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Purchased 300 coins',
      date: '23 Sep ',
      time: '• 14:45',
      image: require('../../assets/images/Coin.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      title: 'Video Watched',
      date: '25 Sep ',
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
      leftHeading={'Your Activity'}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <FlatList
          data={allData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 0}}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  marginTop: 25,
                  borderBottomColor: '#1C1C1C',
                  borderBottomWidth: 1.5,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: Theme.FontFamily.medium,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.54)',
                    fontSize: 14,
                    fontFamily: Theme.FontFamily.light,
                    marginTop: 3,
                  }}>
                  {item.date}{' '}
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.light,
                    }}>
                    {item.time}
                  </Text>
                </Text>
                <View style={{flexDirection: 'row', marginTop: 12}}>
                  <View
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      borderWidth: item.price ? 2 : 0,
                      borderRadius: 6,
                      // padding:1
                    }}>
                    <Image
                      source={item.image}
                      style={{
                        height: 42,
                        width: 42,
                        borderRadius: 5,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  {item.price ? (
                    <View
                      style={{
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#ED4040',
                          fontSize: 16,
                          fontFamily: Theme.FontFamily.medium,
                        }}>
                        {' '}
                        {item.price}
                      </Text>
                    </View>
                  ) : (
                    <View style={{paddingHorizontal: 15}}>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          fontSize: 16,
                          fontFamily: Theme.FontFamily.normal,
                        }}>
                        {item.details}
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.light,
                          marginTop: 5,
                        }}>
                        {item.hostedby}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default Activity;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
  },
});
