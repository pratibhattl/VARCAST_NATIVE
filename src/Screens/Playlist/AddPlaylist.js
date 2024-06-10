// AddPlaylist.js
import { View, Text, StyleSheet, Image, Pressable, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppTextInput, Icon } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import LinearGradient from 'react-native-linear-gradient';
import MicroPhoneIcon from '../../assets/icons/MicrophoneIcon';
import { t } from 'i18next';
import AllSourcePath from '../../Constants/PathConfig';
import { apiCall } from '../../Services/Service';

const { width, height } = Dimensions.get('screen');

const AddPlaylist = props => {
  const route = useRoute();
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [playArray, setPlayArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const token = useSelector(state => state.authData.token);
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        changeloadingState(true);
        const endpoint = 'playlist/index';
        const response = await apiCall(endpoint, 'GET', {}, token);
        setPlaylists(response.data.listData);
        setPlayArray(response.data.listData);

        console.log("RawRes", response)
        changeloadingState(false);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        changeloadingState(false);

      }
    };

    fetchPlaylists();
   
  }, []);
  
  const searchData = (text) => {
    setSearchQuery(text)
    const data = [...playlists];
    if (text.length >= 3) {
    const results = data.filter(item =>
      item?.name.toLowerCase().includes(text.toLowerCase())
    );
    setPlaylists(results);
  }else{
    setPlaylists(playArray);
  }
  };
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96)' }}
      showLoading={loadingState}
      isScrollable={true}
      Home
      Play
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.openDrawer()}>
      <View style={styles.container}>
        <AppTextInput
         onChangeText={text => searchData(text)}
         value={searchQuery}
         onSubmitEditing={searchData}
          placeholder={t('Search')}
          placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
          inputStyle={{ fontSize: 14 }}
          titleStyle={{
            fontFamily: Theme.FontFamily.semiBold,
            fontSize: Theme.sizes.s16,
          }}
          rightAction={<MicroPhoneIcon />}
          leftIcon={{
            name: 'search',
            type: 'Feather',
            color: 'rgba(255, 255, 255, 0.54)',
            size: 21,
          }}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />

        <LinearGradient
          colors={['#1C1C1C', '#1C1C1C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.gradientStyle}>
          <Pressable
            onPress={() => NavigationService.navigate('PlaylistAdd')}
            style={styles.addPlaylistButton}>
            <Icon
              name="plus"
              type="Entypo"
              size={45}
              color={'#E1D01E'}
            />
          </Pressable>
          <Text style={styles.addPlaylistText}>
            {t('Add Playlist')}
          </Text>
        </LinearGradient>

        <FlatList
          data={playlists}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 0 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const mediaCount = item.media ? item.media.length : 0;
            return (
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.3)',
                  '#f4c5c5',
                  'rgba(255, 255, 255, 0.3)',
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.1)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.4, y: 0 }}
                style={styles.playlistItem}>
                <Pressable
                  onPress={() => NavigationService.navigate('WatchLater', { playlist: item })}
                  style={{ flexDirection: 'row' }}>
                  <View style={{ marginLeft: 3 }}>
                    <Image
                      source={{ uri: `${imageUrl}${item?.image}` }}
                      style={styles.playlistImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.playlistTextContainer}>
                    <Text style={styles.playlistName}>
                      {item.name}
                    </Text>
                    <Text style={styles.trackCount}>
                      {`${mediaCount} tracks`}
                    </Text>
                  </View>
                </Pressable>
                {/* <Icon
                  name="dots-three-horizontal"
                  type="Entypo"
                  size={16}
                  color={'#fff'}
                  style={{ marginTop: 5 }}
                /> */}
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
  },
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 15,
    color: '#fff',
  },
  gradientStyle: {
    height: 89,
    width: width - 35,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center',
  },
  addPlaylistButton: {
    height: 68,
    width: 68,
    borderRadius: 10,
    backgroundColor: 'rgba(118, 118, 128, 0.24)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPlaylistText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Theme.FontFamily.medium,
    marginLeft: 15,
    marginVertical: 20,
  },
  playlistItem: {
    flex: 1,
    height: 89,
    width: width - 40,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  playlistImage: {
    height: 68,
    width: 68,
  },
  playlistTextContainer: {
    marginHorizontal: 12,
    width: '60%',
    marginTop: 10,
  },
  playlistName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Theme.FontFamily.medium,
    marginLeft: 5,
  },
  trackCount: {
    color: 'rgba(255, 255, 255, 0.54)',
    fontSize: 14,
    fontFamily: Theme.FontFamily.light,
    marginLeft: 5,
    marginTop: 3,
  },
});
