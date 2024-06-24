/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import NavigationService from '../../Services/Navigation';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {apiCall} from '../../Services/Service';

const {width, height} = Dimensions.get('screen');

const FollowingUser = () => {
  const route = useRoute();
  const customProp = route.params?.showButton;
  const token = useSelector(state => state.authData.token);
  const navigation = useNavigation();
  
  const [followingUserData, setFollowingUserData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  
    
  const fetchUserData =async () => {
    setLoadingState(true);
    try {
      const endpoint = 'follow/followings';
      const response = await apiCall(endpoint, 'GET', {}, token);

      if (response?.status === true) {
        const usermappedData =
          response?.data?.map(item => ({
            id:item.id,
            name: item.followings.name,
            email: item.followings.email,
            imageUrl: item.followings.full_path_image,
          })) || [];
        
        setFollowingUserData(usermappedData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoadingState(false);
    }
  };


  const goToUserDetails = (user) => {
    navigation.navigate('UserDetails', {userData: user });
  };

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.userCard} key={item.id}>
        <Image
          source={{uri: item.imageUrl}}
          style={styles.userImage}
          resizeMode="cover"
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.name}</Text>
        </View>
      </View>
    ),
    [],
  );

  
  useEffect(() => {
    fetchUserData();
  }, [page]);

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: '#131313'}}
      showLoading={loadingState}
      isScrollable={true}
      viewStyle={{backgroundColor: '#131313'}}
      leftHeading={'Following'}
      hideLeftIcon={!customProp}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent={true}
        />
        <Pressable onPress={goToUserDetails}>
          <FlatList
            data={followingUserData}
            numColumns={2} /* Set the number of columns here */
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  flatListContent: {
    paddingTop: 15,
    paddingLeft: 20,
  },
  userCard: {
    width: (width - 80) / 2, // Adjust the width for two columns
    height: 150,
    borderRadius: 15,
    margin: 10,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  userImage: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  userDetails: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(200,200,200, 0.5)',
  },
  userName: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'YourFontFamily',
    marginHorizontal: 5,
  },
});

export default FollowingUser;
