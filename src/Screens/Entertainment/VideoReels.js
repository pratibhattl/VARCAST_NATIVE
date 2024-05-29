import {View, Text, FlatList, StyleSheet, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import ClockCircleIcon from '../../assets/icons/ClockCircleIcon';
import Theme from '../../Constants/Theme';
import EyeOpen from '../../assets/icons/EyeOpen';
import NavigationService from '../../Services/Navigation';
import AllSourcePath from '../../Constants/PathConfig';

const VideoReels = ({userData}) => {
  const [videoImages, setVideoImages] = useState([]);
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;

  useEffect(() => {
    console.log('Users:', userData);
    if (
      userData &&
      userData.latest_videos &&
      userData.latest_videos.length > 0
    ) {
      const userVideos = userData.latest_videos.map(video => ({
        img: {uri: `${imageUrl}${video.image}`},
        id: video._id,
        title: video.title,
        views: video.views,
      }));

      setVideoImages(userVideos);
      console.log('User Videos:', userVideos);
    }
  }, [userData]);

  console.log('Videos:', videoImages);

  const handleVideoPress = videoId => {
    const clickedVideo = userData.latest_videos.find(
      video => video._id === videoId,
    );
    if (clickedVideo) {
      NavigationService.navigate('ReelVideoIndex', {videoData: clickedVideo});
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videoImages}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => handleVideoPress(item.id)}
            key={index}
            style={[
              styles.itemContainer,
              {marginRight: (index + 1) % 3 === 0 ? 0 : 6},
            ]}>
            <Image source={item.img} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}>
              <EyeOpen Width={20} Height={20} />
              <Text style={styles.viewsText}>{item.views} Views</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default VideoReels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    flex: 1 / 3, // Ensure three items per row
    marginTop: 10,
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 15,
  },
  overlay: {
    height: 30,
    width: '100%',
    borderRadius: 5,
    position: 'absolute',
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  viewsText: {
    fontFamily: Theme.FontFamily.normal,
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 3,
  },
});
