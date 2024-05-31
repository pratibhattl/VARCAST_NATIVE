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
import user from '../../assets/images/user.png';

const {width, height} = Dimensions.get('screen');

const FollowingUsers = props => {
  const route = useRoute();

  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, setLoadingState] = useState(false);
  const [allData, setAllData] = useState(props?.route?.params);

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={'Following Users'}
      // viewStyle={{backgroundColor:'transparent'}}
      // right
      // Save
      // onRightTextPress={() => NavigationService.navigate('DrawerNavigation')}
      // Publish
      leftHeadingStyle={{color: '#E1D01E'}}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        {allData.length === 0 && (
          <Text style={styles.no_users}>No Following Users To Show!</Text>
        )}

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
                  source={
                    res.followings.full_path_image
                      ? res.followings.full_path_image
                      : require('../../assets/images/image.png')
                  }
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
                      {res.followings.name}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                        marginTop: 3,
                      }}>
                      {res.followings.updated_at}{' '}
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
                    <ThreeDots />
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

export default FollowingUsers;
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
  no_users: {
    textAlign: 'center',
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    color: '#fff',
    fontSize: 20,
    marginTop:100
  },
});
