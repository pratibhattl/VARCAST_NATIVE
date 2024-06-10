import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import { useRoute } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import Theme from '../../Constants/Theme';
import { apiCall, postApi } from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AllSourcePath from '../../Constants/PathConfig';
const { width, height } = Dimensions.get('screen');

const FinalPublication = () => {
  const route = useRoute();
  const bodyData = route.params.body;
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loading, setLoading] = useState(false);
  const [loadingState, changeloadingState] = useState(false);
  const [allImage, setAllImage] = useState([
    { img: require('../../assets/images/image105(1).png') },
    { img: require('../../assets/images/image104.png') },
    { img: require('../../assets/images/image105.png') },
    { img: require('../../assets/images/image154.png') },
    { img: require('../../assets/images/image155.png') },
    { img: require('../../assets/images/image156.png') },
    { img: require('../../assets/images/image157.png') },
    // {img:require('../../assets/images/image157(1).png')},
    { img: require('../../assets/images/image158.png') },
    { img: require('../../assets/images/image159.png') },
    { img: require('../../assets/images/image160.png') },
    { img: require('../../assets/images/image161.png') },
    { img: require('../../assets/images/image162.png') },
    { img: require('../../assets/images/image105.png') },
    { img: require('../../assets/images/image154.png') },
    { img: require('../../assets/images/image155.png') },
    { img: require('../../assets/images/image156.png') },
    { img: require('../../assets/images/image103.png') },
  ]);
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const progressValue = useSharedValue(0);
  const baseUrl = AllSourcePath.API_BASE_URL_DEV;
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  const tokenData = useSelector(state => state.authData.token);
  const publishVideoFunc = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('title', bodyData?.title);
    formData.append('image', bodyData?.image);
    formData.append('description', bodyData?.description);
    bodyData?.tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
    bodyData?.category.forEach((category, index) => formData.append(`categoryIds[${index}]`, category));

    axios
      .post(`${baseUrl}videos/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${tokenData}`,
        },
      })
      .then(response => {
        setTags([]);
        setTitle('');
        setDescription('');
        setCat([]);

        NavigationService.navigate('PublicationIndex');
        setLoader(false);

      })
      .catch(error => {
        HelperFunctions.showToastMsg(error?.message);
        setLoader(false);
      })
  };


  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96);' }}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={'New Publication'}
      // viewStyle={{backgroundColor:'transparent'}}
      // right
      // onRightTextPress={() => NavigationService.navigate('Publication01')}
      // Publish
      leftHeadingStyle={{ color: '#E1D01E' }}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: Theme.FontFamily.semiBold,
            fontSize: Theme.sizes.s20,
            color: '#fff',
            marginTop: 25,
            marginVertical: 20,
          }}>
          Typical Day
        </Text>
        <View
          style={{
            width: 290,
            height: 52,
            borderRadius: 10,
            backgroundColor: '#1C1C1C',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            // marginBottom
          }}>
          <Text
            style={{
              fontFamily: Theme.FontFamily.normal,
              fontSize: Theme.sizes.s14,
              color: '#fff',
              // marginVertical: 20
            }}>
            How to Pitch Your Best Ideas
          </Text>
          <Text
            style={{
              fontFamily: Theme.FontFamily.light,
              fontSize: Theme.sizes.s13,
              color: 'rgba(255, 255, 255, 0.54)',
              // marginVertical: 20
            }}>
            Adrian Reif • 13:48
          </Text>
        </View>
        <Carousel
          loop
          width={width}
          height={height / 1.8}
          // autoPlay={true}
          pagingEnabled={pagingEnabled}
          snapEnabled={snapEnabled}
          // autoPlay={autoPlay}
          // autoPlayInterval={1500}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.82,
            // parallaxScrollingOffset: 70,
          }}
          data={allImage}
          scrollAnimationDuration={500}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 1,
                // borderWidth: 1,
                alignItems: 'center',
                // marginTop: 5
                // justifyContent: 'center',
              }}>
              <Image
                source={item?.img}
                style={{
                  height: height / 1.8,
                  width: width - 80,
                  borderRadius: 15,
                  // paddingHorizontal:10
                }}
                resizeMode="cover"
              />
            </View>
          )}
        />
        <Pressable
          onPress={() => {
            // setModalVisible(false)
            NavigationService.navigate('DrawerNavigation');
          }}
          style={{
            height: 50,
            width: 350,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E1D01E',
            borderRadius: 15,
            // marginVertical: height/6
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#131313',
              textAlign: 'center',
              fontFamily: Theme.FontFamily.medium,
              fontSize: Theme.sizes.s16,
            }}>
            Upload
          </Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default FinalPublication;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // width:width
    // paddingHorizontal: 20
    backgroundColor: '#131313',
    height: height,
  },
});
