import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, Image} from 'react-native';
import Theme from '../../Constants/Theme';
import ClockCircleIcon from '../../assets/icons/ClockCircleIcon';
import NavigationService from '../../Services/Navigation';
import AllSourcePath from '../../Constants/PathConfig';

const AudioReels = ({userData}) => {
  const [podcastImages, setPodcastImages] = useState([]);
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;

  useEffect(() => {
    console.log('Users:', userData);
    if (
      userData &&
      userData.latest_podcasts &&
      userData.latest_podcasts.length > 0
    ) {
      const userPodcasts = userData.latest_podcasts.map(podcast => ({
        img: {uri: `${imageUrl}${podcast.image}`},
        id: podcast._id,
        title: podcast.title,
        duration: podcast.duration,
      }));

      setPodcastImages(userPodcasts);
      console.log('User Podcasts:', userPodcasts);
    }
  }, [userData]);

  console.log('Podcasts:', podcastImages);

  const handlePodcastPress = podcastId => {
    const clickedPodcast = userData.latest_podcasts.find(
      podcast => podcast._id === podcastId,
    );
   
    if (clickedPodcast) {
      NavigationService.navigate('PodcastIndex', {podcastData: clickedPodcast});
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={podcastImages}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => handlePodcastPress(item.id)}
            key={index}
            style={[styles.pressable, {marginRight: index % 2 === 0 ? 15 : 0}]}>
            <Image source={item.img} style={styles.image} resizeMode="cover" />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>
            <View style={styles.idContainer}>
              <Text style={styles.idText}>{item.id}</Text>
            </View>
            <View style={styles.durationContainer}>
              <ClockCircleIcon />
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default AudioReels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    paddingHorizontal: 10,
  },
  flatListContent: {
    paddingVertical: 10,
  },
  pressable: {
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    height: 150,
    width: 180,
  },
  titleContainer: {
    height: 55,
    width: 180,
    backgroundColor: '#1C1C1C',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  titleText: {
    fontFamily: Theme.FontFamily.normal,
    color: '#fff',
    fontSize: Theme.sizes.s13,
  },
  idContainer: {
    backgroundColor: 'rgba(28, 28, 28, 0.54)',
    height: 33,
    width: 33,
    borderRadius: 33,
    position: 'absolute',
    top: 5,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  idText: {
    fontFamily: Theme.FontFamily.normal,
    color: '#fff',
    fontSize: Theme.sizes.s12,
  },
  durationContainer: {
    backgroundColor: 'rgba(28, 28, 28, 0.54)',
    height: 20,
    width: 60,
    borderRadius: 5,
    position: 'absolute',
    bottom: 65,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  durationText: {
    fontFamily: Theme.FontFamily.normal,
    color: '#fff',
    fontSize: 11,
    marginHorizontal: 3,
  },
});
