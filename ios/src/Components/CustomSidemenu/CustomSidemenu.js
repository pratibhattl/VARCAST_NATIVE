import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import React from 'react';
import Theme from '../../Constants/Theme';
import Modal from 'react-native-modal';
import AllSourcePath from '../../Constants/PathConfig';
import Ints1 from '../../assets/icons/Ints1';
import Facebook1 from '../../assets/icons/Facebook1';
import Linkin1 from '../../assets/icons/Linkin1';
import Twitter1 from '../../assets/icons/Twitter1';
import {resetAuthData} from '../../Store/Reducers/AuthReducer';
import {useDispatch} from 'react-redux';
import {deleteData} from '../../Services/LocalStorage';
import HelperFunctions from '../../Constants/HelperFunctions';
import {navRef} from '../../../App';
import {t} from 'i18next';

const CustomSidemenu = props => {
  const dispatch = useDispatch();

  const sideMenuScreens = [
    {name: 'My Profile', componentName: ''},
    {name: 'Reviews & Rating', componentName: 'ReviwandRatingScreeen'},
    {name: 'Rating History', componentName: 'ReviwandRatingScreeen'},
    {name: 'Horoscope', componentName: ''},
    {name: 'My Plans', componentName: ''},
    // {name: 'Order History', componentName: ''},
    {name: 'Log Out', componentName: 'logout'},
  ];

  const iosPadding = {
    paddingTop: '12%',
    paddingLeft: '1%',
  };

  const logout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout from this app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'default',
      },
      {
        text: 'YES',
        onPress: () => {
          dispatch(resetAuthData());
          deleteData();
          // props.navigation.reset({index:0,routes: [{ name: 'LoginScreen' }]});

          navRef.current?.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        },
      },
    ]);
    return true;
  };

  /* == Sidemenu data == */
  const renderScreens = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // setModalVisible(false);
          if (item.componentName == 'logout') {
            logout();
          } else {
            props.menuItemClick(item, false);
          }
        }}>
        <Text
          style={{
            marginTop: '6%',
            fontSize: 16,
            fontFamily: Theme.FontFamily.normal,
            color: Theme.colors.black,
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const openUrl = url => {
    if (String(url).includes('https://')) {
      Linking.openURL(url);
    } else {
      Linking.openURL('https://' + url);
    }
  };

  return (
    <View>
      {/* Modal screen */}
      <Modal
        animationIn="slideInRight"
        // animationOut="slideOutRight"
        animationOut="fadeOut"
        animationInTiming={500}
        animationOutTiming={500}
        style={{
          width: '100%',
        }}
        deviceHeight={Dimensions.get('window').height}
        useNativeDriver={true}
        isVisible={props.isVisible}
        coverScreen={true}>
        <View
          style={{
            backgroundColor: 'white',
            height: Dimensions.get('window').height,
            width: '100%',
            paddingHorizontal: 15,
          }}>
          <View style={Platform.OS === 'ios' ? iosPadding : null}>
            <TouchableOpacity
              //   onPress={() => setModalVisible(false)}
              // onPress={props.onPress}
              onPress={props.closeClick}>
              <Image
                source={AllSourcePath.LOCAL_IMAGES.Close}
                style={{
                  height: 14,
                  width: 14,
                  alignSelf: 'flex-end',
                  marginTop: '8%',
                  marginRight: 29,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Menu screen segment */}
          <View
            style={{
              flex: 1,
              width: '95%',
              marginTop: 10,
              marginBottom: 10,
              paddingHorizontal: 15,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{flex: 1}}>
              <View style={{}}>
                <FlatList
                  data={sideMenuScreens}
                  //   data={props.data}
                  renderItem={renderScreens}
                  numColumns={1}
                  scrollEnabled={false}
                />
              </View>

              {/* Follow us segment */}
              <View style={{marginTop: '10%'}}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Theme.colors.black,
                      fontFamily: Theme.FontFamily.bold,
                    }}>
                    {t('Follow Us')}
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
                  <View
                    style={{
                      aspectRatio: 1,
                      backgroundColor: '#00000029',
                      height: 35,
                      borderRadius: 32,
                      marginRight: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        openUrl('instagram.com');
                      }}>
                      <Ints1 />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      aspectRatio: 1,
                      backgroundColor: '#00000029',
                      height: 35,
                      borderRadius: 32,
                      marginRight: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        openUrl('facebook.com');
                      }}>
                      <Facebook1 />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      aspectRatio: 1,
                      backgroundColor: '#00000029',
                      height: 35,
                      borderRadius: 32,
                      marginRight: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        openUrl('linkedin.com');
                      }}>
                      <Linkin1 />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      aspectRatio: 1,
                      backgroundColor: '#00000029',
                      height: 35,
                      borderRadius: 32,
                      marginRight: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        openUrl('twitter.com');
                      }}>
                      <Twitter1 />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Blank space */}
              <View style={{height: 20}}></View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomSidemenu;
