/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import {ImageBackground} from 'react-native';
import {Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Theme from '../../Constants/Theme';
import {Icon} from 'react-native-basic-elements';
import SongPlayComp from '../../Components/Podcast/SongPlayComp';
import HelperFunctions from '../../Constants/HelperFunctions';
import {apiCall} from '../../Services/Service';
import {useTranslation} from 'react-i18next';
const {width, height} = Dimensions.get('screen');
import UserDetails from '../Profile/UserDetails';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FollowingUser from './FollowingUser';
import {useSelector} from 'react-redux';

const HomePage = props => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [cat, setCat] = useState(0);
  const [Loder, setLoader] = useState(false);
  const [liveData, setLiveData] = useState([]);
  const [popularEpisodes, setPopularEpisodes] = useState([]);
  const [categorylist, setCategorylist] = useState([]);
  const [mostPlayedData, setMostPlayedData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [ourpickData, setourpickData] = useState([]);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const token = useSelector(state => state.authData.token);

  //Fecthing Live Section Data
  const fetchData = async () => {
    try {
      const endpoint = 'lives/list';
      const response = await apiCall(endpoint, 'GET', {}, token);
      const data = response.data; // Assuming response is already parsed as JSON
      const mappedData = data.listData.map(item => ({
        title: item.title,
        slug: item.slug,
        imageUrl: item.imageUrl,
        videoUrl: item.videoUrl,
      }));
      setLiveData(mappedData);
      console.log('Liveresponse', mappedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Fetch Following User Data
  const fetchUserData = async () => {
    try {
      const endpoint = 'follow/followings';
      const response = await apiCall(endpoint, 'GET', {}, token);

      // console.log('Raw response:', response); // Log the raw response

      if (response?.status === true) {
        const usermappedData =
          response?.data?.length > 0 &&
          response?.data?.map(item => ({
            name: item.followings.name,
            email: item.followings.email,
            imageUrl: item.followings.full_path_image,
          }));
        setUserData(usermappedData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetching Popular Episode
  const fetchPopularEpisodes = async () => {
    try {
      const response = await fetch(
        'https://dev2024.co.in/web/varcast/popular_episodes-1.json',
      );
      const data = await response.json();
      setPopularEpisodes(data.popular_episodes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to navigate to UserDetails screen with userData as prop
  const goToUserDetails = () => {
    navigation.navigate('UserDetails', {userData: userData});
  };
  //Fetching Catergoires
  const fetchCategories = useCallback(() => {
    setLoader(true);
    let data = {
      limit: '10',
      keyword: '',
      page: null,
    };
    apiCall('api/all-category', data, '')
      .then(response => {
        // console.log('response',response)
        if (response?.status == 'success') {
          setCategorylist(response?.data);
          setLoader(false);
        } else {
          // setModalVisible(true)
          setLoader(false);
        }
      })
      .catch(error => {
        HelperFunctions.showToastMsg(error?.message);
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  //Fetching Most Played Data
  const fetchMostPlayedData = async () => {
    try {
      const response = await fetch(
        'https://dev2024.co.in/web/varcast/publication-1.json',
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      console.log('Fetched data:', jsonData);
      setMostPlayedData(jsonData.Publication);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Fetch Following Our Picks Data
  const fetchOurPicksData = () => {
    fetch('https://dev2024.co.in/web/varcast/user-1.json')
      .then(response => response.json())
      .then(data => {
        if (data && data.users && data.users.length > 0) {
          setourpickData(data.users[0]);
          // console.log(userData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchUserData();
    fetchCategories();
    fetchData();
    fetchPopularEpisodes();
    fetchMostPlayedData();
    fetchOurPicksData();
  }, []);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96)'}}
      showLoading={Loder}
      isScrollable={true}
      // viewStyle={{backgroundColor:'#131313'}}
      // leftHeading={'Book an Appointment'}
      ChatIconPress={() => NavigationService.navigate('ChatList')}
      NotiIconPress={() => NavigationService.navigate('NotificationIndex')}
      Home
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.openDrawer()}>
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: Theme.FontFamily.semiBold,
            }}>
            {t('Live')}
          </Text>
          <Text
            onPress={() => NavigationService.navigate('Live')}
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 14,
              fontFamily: Theme.FontFamily.normal,
              textAlign: 'right',
            }}>
            {t('View All')}
          </Text>
        </View>
        <FlatList
          data={liveData}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 20, paddingLeft: 20}}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() =>
                  NavigationService.navigate('PodcastLive', {item})
                }
                style={{
                  width: 335,
                  height: 175,
                  borderRadius: 15,
                  marginRight: 20,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                }}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={{
                    width: 335,
                    height: 175,
                    borderRadius: 15,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    height: 55,
                    width: 335,
                    alignSelf: 'center',
                    flexDirection: 'column',
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'rgba(200,200,200, 0.5)',
                    opacity: 0.9,
                  }}>
                  <View
                    style={{
                      padding: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 10,
                      overflow: 'hidden',
                    }}>
                    <View>
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
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.normal,
                          marginLeft: 4,
                        }}>
                        {item.views} online • {item.created_by_name}
                      </Text>
                    </View>
                    <Icon
                      name="dots-three-horizontal"
                      type="Entypo"
                      size={18}
                      color={'#fff'}
                    />
                  </View>
                </View>
                <Pressable
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    height: 30,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: '#ED4040',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.normal,
                      marginRight: 5,
                    }}>
                    {t('Live')}
                  </Text>
                </Pressable>
              </Pressable>
            );
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: Theme.FontFamily.semiBold,
            }}>
            {t('Following')}
          </Text>
          <Text
            onPress={() => NavigationService.navigate('FollowingUser')}
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 14,
              fontFamily: Theme.FontFamily.normal,
              textAlign: 'right',
            }}>
            {t('View All')}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={goToUserDetails}>
            {userData?.length > 0 && (
              <FlatList
                data={userData}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingTop: 15, paddingLeft: 20}}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: 128,
                      height: 110,
                      borderRadius: 15,
                      marginRight: 20,
                      borderTopRightRadius: 0,
                      borderTopLeftRadius: 0,
                      overflow: 'hidden',
                      backgroundColor: 'transparent',
                    }}>
                    <Image
                      source={{uri: item?.imageUrl}}
                      style={{
                        width: 128,
                        height: 110,
                        borderRadius: 15,
                      }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        height: 35,
                        width: 128,
                        alignItems: 'center',
                        alignSelf: 'center',
                        position: 'absolute',
                        justifyContent: 'center',
                        bottom: 0,
                        backgroundColor: 'rgba(200,200,200, 0.5)',
                        opacity: 0.9,
                      }}>
                      <View
                        style={{
                          overflow: 'hidden',
                          paddingTop: 5,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 14,
                            fontFamily: 'YourFontFamily',
                            marginHorizontal: 5,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </TouchableOpacity>
        </View>

        <FlatList
          data={categorylist}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{paddingTop: 25, paddingLeft: 20}}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={index}
                onPress={() => setCat(index)}
                style={{
                  height: 45,
                  width: 120,
                  borderRadius: 30,
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  borderWidth: 1.5,
                  backgroundColor: cat == index ? '#fff' : 'transparent',
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 5,
                }}>
                <Text
                  style={{
                    color:
                      cat == index ? '#131313' : 'rgba(255, 255, 255, 0.54)',
                    fontSize: 15,
                    fontFamily: Theme.FontFamily.semiBold,
                    // marginTop:5
                  }}>
                  {item.name}
                </Text>
              </Pressable>
            );
          }}
        />
        <FlatList
          data={[1, 2, 3, 4]}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{paddingTop: 25, paddingLeft: 20}}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: 200,
                  height: 185,
                  borderRadius: 15,
                  marginRight: 20,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  overflow: 'hidden',

                  backgroundColor: 'transparent',
                }}>
                <Image
                  source={
                    index % 2 == 0
                      ? require('../../assets/images/Rectangle181.png')
                      : require('../../assets/images/Rectangle182.png')
                  }
                  style={{
                    width: 200,
                    height: 185,
                    borderRadius: 15,
                    // borderBottomLeftRadius:150
                    // marginHorizontal:10
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    height: 71,
                    width: 200,
                    // alignItems:'center',
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'rgba(200,200,200, 0.5)',
                    opacity: 0.9,
                  }}
                  // blurType="light"
                  // overlayColor="transparent"
                  // blurAmount={20}
                  // blurRadius={10}
                  // reducedTransparencyFallbackColor="white"
                >
                  <View
                    style={{
                      overflow: 'hidden',
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.semiBold,
                        marginHorizontal: 5,
                        // textAlign:'auto'
                      }}>
                      Lorem ipsum dolor sit amet, consectetur elit.
                    </Text>

                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.normal,
                        marginLeft: 5,
                      }}>
                      Duration: 23 mins
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: Theme.FontFamily.semiBold,
            }}>
            {t('New Episodes')}
          </Text>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 14,
              fontFamily: Theme.FontFamily.normal,
              textAlign: 'right',
            }}>
            {t('View All')}
          </Text>
        </View>
        <FlatList
          data={[
            'Davon Lane',
            'Cristin Watson',
            'Davon Lane',
            'Cristin Watson',
          ]}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{paddingTop: 15, paddingLeft: 20}}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: 128,
                  height: 110,
                  borderRadius: 15,
                  marginRight: 20,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  overflow: 'hidden',

                  backgroundColor: 'transparent',
                }}>
                <Image
                  source={
                    index % 2 == 0
                      ? require('../../assets/images/Rectangle184.png')
                      : require('../../assets/images/Rectangle185.png')
                  }
                  style={{
                    width: 128,
                    height: 110,
                    borderRadius: 15,
                    // borderBottomLeftRadius:150
                    // marginHorizontal:10
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    height: 35,
                    width: 128,
                    alignItems: 'center',
                    alignSelf: 'center',
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    opacity: 0.9,
                  }}
                  // blurType="light"
                  // overlayColor="transparent"
                  // blurAmount={20}
                  // blurRadius={10}
                  // reducedTransparencyFallbackColor="white"
                >
                  <View
                    style={{
                      overflow: 'hidden',
                      // paddingHorizontal: 15,
                      paddingTop: 5,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.normal,
                        marginHorizontal: 5,
                        // textAlign:'center'
                      }}>
                      {item}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: Theme.FontFamily.semiBold,
            }}>
            {t('Popular Episodes')}
          </Text>
          <Text
            onPress={() => NavigationService.navigate('PopularEpisode')}
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 14,
              fontFamily: Theme.FontFamily.normal,
              textAlign: 'right',
            }}>
            {t('View All')}
          </Text>
        </View>
        <FlatList
          data={popularEpisodes}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 20, paddingLeft: 20}}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                // Navigate to Live Detail page
                NavigationService.navigate('PodcastIndex', {item});
              }}
              style={{
                width: 200,
                height: 185,
                borderRadius: 15,
                marginRight: 20,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                overflow: 'hidden',
                backgroundColor: 'transparent',
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: 200,
                  height: 185,
                  borderRadius: 15,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  height: 71,
                  width: 200,
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: 'rgba(200,200,200, 0.5)',
                  opacity: 0.9,
                }}>
                <View
                  style={{
                    overflow: 'hidden',
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.semiBold,
                      marginHorizontal: 5,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.normal,
                      marginLeft: 5,
                    }}>
                    Duration: {item.total_time}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: Theme.FontFamily.semiBold,
            }}>
            {t('Most Played of the Week')}
          </Text>
          <Text
            onPress={() => NavigationService.navigate('MostPlayed')}
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 14,
              fontFamily: Theme.FontFamily.normal,
              textAlign: 'right',
            }}>
            {t('View All')}
          </Text>
        </View>
        <View>
          {mostPlayedData && ( // Check if mostPlayedData is not null or undefined
            <FlatList
              data={mostPlayedData}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingTop: 20, paddingLeft: 20}}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    // Navigate to Live Detail page
                    NavigationService.navigate('PodcastIndex', {item});
                  }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 15,
                    marginRight: 20,
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 15,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: 'Arial', // Use your desired font family
                        marginBottom: 5,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: 'Arial', // Use your desired font family
                      }}>
                      Views: {item.views}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          )}
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: Theme.FontFamily.semiBold,
            }}>
            {t('Our Picks')}
          </Text>
          <Text
            onPress={() => NavigationService.navigate('OurPicks')}
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 14,
              fontFamily: Theme.FontFamily.normal,
              textAlign: 'right',
            }}>
            {t('View All')}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={goToUserDetails}>
            {userData && (
              <FlatList
                data={[userData]}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingTop: 15, paddingLeft: 20}}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: 128,
                      height: 110,
                      borderRadius: 15,
                      marginRight: 20,
                      borderTopRightRadius: 0,
                      borderTopLeftRadius: 0,
                      overflow: 'hidden',
                      backgroundColor: 'transparent',
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: 128,
                        height: 110,
                        borderRadius: 15,
                      }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        height: 35,
                        width: 128,
                        alignItems: 'center',
                        alignSelf: 'center',
                        position: 'absolute',
                        justifyContent: 'center',
                        bottom: 0,
                        backgroundColor: 'rgba(200,200,200, 0.5)',
                        opacity: 0.9,
                      }}>
                      <View
                        style={{
                          overflow: 'hidden',
                          paddingTop: 5,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 14,
                            fontFamily: 'YourFontFamily',
                            marginHorizontal: 5,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
});

// @Override
// protected List<ReactPackage> getPackages() {
//   return Arrays.<ReactPackage>asList(
//     new MainReactPackage(),
//     new RNFSPackage()
//   );
// }
