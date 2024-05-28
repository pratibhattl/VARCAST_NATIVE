import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import {useRoute} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {AppTextInput, Icon} from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import LinearGradient from 'react-native-linear-gradient';
import MicroPhoneIcon from '../../assets/icons/MicrophoneIcon';
import {t} from 'i18next';
const {width, height} = Dimensions.get('screen');

const AddPlaylist = props => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96)'}}
      showLoading={loadingState}
      isScrollable={true}
      // leftHeading={'Book an Appointment'}
      Home
      Play
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.openDrawer()}>
      <View style={styles.container}>
        <AppTextInput
          value={password}
          onChangeText={a => setPassword(a)}
          placeholder={t('Search')}
          placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
          inputStyle={{fontSize: 14}}
          titleStyle={{
            fontFamily: Theme.FontFamily.semiBold,
            fontSize: Theme.sizes.s16,
          }}
          mainContainerStyle={
            {
              //   marginHorizontal:20
            }
          }
          rightAction={<MicroPhoneIcon />}
          leftIcon={{
            name: 'search',
            type: 'Feather',
            color: 'rgba(255, 255, 255, 0.54)',
            size: 21,
          }}
          secureTextEntry={passwordShow ? false : true}
          onRightIconPress={() => setPasswordShow(!passwordShow)}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />

        <LinearGradient
          colors={['#1C1C1C', '#1C1C1C']}
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0}}
          // useAngle={true} angle={90}
          // angleCenter={{ x: 0.5, y: 0.5 }}
          style={{
            // flex: 1,
            height: 89,
            width: width - 35,
            borderRadius: 15,
            //   alignSelf: 'center',
            marginTop: 25,
            flexDirection: 'row',
            //   alignItems:'center',
            padding: 10,
            alignSelf: 'center',
            //   justifyContent:'center'
            // marginHorizontal:23
          }}>
          <Pressable
            onPress={() => NavigationService.navigate('PlaylistAdd')}
            style={{
              height: 68,
              width: 68,
              borderRadius: 10,
              backgroundColor: 'rgba(118, 118, 128, 0.24)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="plus"
              type="Entypo"
              size={45}
              color={'#E1D01E'}
              //   style={{marginTop:5}}
            />
          </Pressable>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: Theme.FontFamily.medium,
              marginLeft: 15,
              marginVertical: 20,
            }}>
            {t('Add Playlist')}
          </Text>
        </LinearGradient>
        <FlatList
          data={[1, 2]}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, paddingTop: 0}}
          renderItem={({item, index}) => {
            return (
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.3)',
                  '#f4c5c5',
                  'rgba(255, 255, 255, 0.3)',
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.1)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 0.4, y: 0}}
                // useAngle={true} angle={90}
                // angleCenter={{ x: 0.5, y: 0.5 }}
                style={{
                  flex: 1,
                  height: 89,
                  width: width - 40,
                  borderRadius: 15,
                  //   alignSelf: 'center',
                  marginTop: 10,
                  flexDirection: 'row',
                  //   alignItems:'center',
                  padding: 10,
                  paddingRight: 20,
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  // marginHorizontal:23
                }}>
                <Pressable
                  onPress={() => NavigationService.navigate('WatchLater')}
                  style={{flexDirection: 'row'}}>
                  <View style={{marginLeft: 3}}>
                    <Image
                      source={
                        item == 1
                          ? require('../../assets/images/image149.png')
                          : item == 2
                          ? require('../../assets/images/image93.png')
                          : item == 3
                          ? require('../../assets/images/image96.png')
                          : require('../../assets/images/image97.png')
                      }
                      style={{
                        height: 68,
                        width: 68,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      marginHorizontal: 12,
                      // paddingTop:5,
                      width: '60%',
                    }}>
                    <View
                      style={{
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 16,
                          fontFamily: Theme.FontFamily.medium,
                          marginLeft: 5,
                        }}>
                        Watch Later on
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.light,
                          marginLeft: 5,
                          marginTop: 3,
                        }}>
                        32 tracks
                      </Text>
                    </View>
                  </View>
                </Pressable>
                <Icon
                  name="dots-three-horizontal"
                  type="Entypo"
                  size={16}
                  color={'#fff'}
                  style={{marginTop: 5}}
                />
              </LinearGradient>
            );
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default AddPlaylist;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
    alignItems: 'center',
  },
  input_container_sty: {
    paddingHorizontal: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 0,
    width: width - 40,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginTop: 25,
    // borderWidth: 0.7,
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
