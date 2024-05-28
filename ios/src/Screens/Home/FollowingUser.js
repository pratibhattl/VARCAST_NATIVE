/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  FlatList,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import { useRoute } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';

const FollowingUser = () => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [followingUserData, setfollowingUserData] = useState([]);
  const navigation = useNavigation();
  const goToUserDetails = () => {
    navigation.navigate('UserDetails', { userData: followingUserData });
  };

  useEffect(() => {
    const fetchFollowingUser = () => {
      fetch('https://dev2024.co.in/web/varcast/user-1.json')
        .then(response => response.json())
        .then(data => {
          if (data && data.users && data.users.length > 0) {
            setfollowingUserData(data.users[0]);
            // console.log(userData);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    fetchFollowingUser();
  }, []);
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#131313' }}
      showLoading={loadingState}
      isScrollable={true}
      viewStyle={{ backgroundColor: '#131313' }}
      leftHeading={'Following'}
      // ChatIconPress={()=>NavigationService.navigate('ChatList')}
      // Home
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent={true}
        />
        <Pressable onPress={goToUserDetails}>
          <View>
            {followingUserData && (
              <FlatList
                data={[followingUserData]}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15, paddingLeft: 20 }}
                renderItem={({ item }) => (
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
                      source={{ uri: item.image }}
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
          </View>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default FollowingUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    // paddingTop:Platform.OS ==='ios' ? 20 : 60,
  },
});
