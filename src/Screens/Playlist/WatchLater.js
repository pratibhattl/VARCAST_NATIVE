import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import ShareIcon from '../../assets/icons/ShareIcon';
import AllSourcePath from '../../Constants/PathConfig';
import { Icon } from 'react-native-basic-elements';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import VideoPlayIcon from '../../assets/icons/VideoPlayIcon';

const { width, height } = Dimensions.get('screen');

const WatchLater = () => {
  const route = useRoute();
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;

  useEffect(() => {
    if (route.params?.playlist) {
      setPlaylistData(route.params.playlist.media);
    }
  }, [route.params?.playlist]);

  // Function to handle media navigation based on the media URL
  const handleMediaNavigation = (item) => {
    const isAudio = item.mediaUrl.endsWith('.mp3');
    if (isAudio) {
      NavigationService.navigate('SongPlayy', { id: item._id });
    } else {
      NavigationService.navigate('VideoLive', { id: item._id });
    }
  };

  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96);' }}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={'Watch Later'}
      leftHeadingStyle={{ color: '#E1D01E' }}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <FlatList
          data={playlistData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 0 }}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index}
                style={{
                  marginTop: 15,
                  borderBottomColor: '#1C1C1C',
                  borderBottomWidth: 1.5,
                  paddingBottom: 10,
                }}>
                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                  <View
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      borderWidth: item.price ? 2 : 0,
                      borderRadius: 6,
                    }}>
                    <Image
                      source={{ uri: `${imageUrl}${item?.image}` }}
                      style={{
                        height: 42,
                        width: 42,
                        borderRadius: 5,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ paddingHorizontal: 15 }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: Theme.FontFamily.normal,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                        marginTop: 5,
                      }}>
                      {item._id}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.54)',
                    fontSize: 16,
                    fontFamily: Theme.FontFamily.light,
                    marginTop: 10,
                  }}>
                  {item.overview}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 0,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-between',
                      width: '25%',
                      alignItems: 'center',
                    }}>
                    {/* <DownloadIcon />
                    <ShareIcon />
                    <Icon
                      name="dots-three-horizontal"
                      type="Entypo"
                      size={16}
                      color={'#fff'}
                    /> */}
                  </View>
                  <Pressable
                    onPress={() => handleMediaNavigation(item)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 15,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                   <VideoPlayIcon/>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default WatchLater;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
  },
});
