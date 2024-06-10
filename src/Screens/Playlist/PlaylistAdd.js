import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';
import {useSelector} from 'react-redux';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {useRoute, useNavigation} from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import HelperFunctions from '../../Constants/HelperFunctions';
import ImagePicker from 'react-native-image-crop-picker';
import GallaryIcon from '../../assets/icons/GallaryIcon';
import NavigationService from '../../Services/Navigation';
import AllSourcePath from '../../Constants/PathConfig';
import {apiCall} from '../../Services/Service';
import axios from 'axios';
const {width, height} = Dimensions.get('screen');

const PlaylistAdd = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const customProp = route.params?.showButton;
  const [playlistName, setPlaylistName] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [image, setImage] = useState(null);
  console.log("Image",image)
  const [imageurl, setImageUrl] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false); // State to indicate whether the page needs to be refreshed
  const token = useSelector(state => state.authData.token);
  const baseUrl = AllSourcePath.API_BASE_URL_DEV;


  const openGallery = async () => {
    try {
      let pickerResult = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      const fileName = pickerResult.path.split('/').pop();
      const fileType = fileName.split('.').pop();

      const file = {
        uri: pickerResult.path,
        name: fileName,
        type: `image/${fileType}`,
      };
      setImage(file);
      setImageUrl(file.uri); // Update the state with the image URI
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylist = async () => {
    if (!playlistName || !image) {
      alert('Please enter a playlist name and select an image.');
      return;
    }

    try {
      setLoadingState(true);

      // Create a FormData object
      const formData = new FormData();
    formData.append('name', playlistName);
    formData.append('image', {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });
     

      // API call
      const response = await axios.post(`${baseUrl}playlist/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setLoadingState(false);
      console.log('Playlist created:', response);


      setPlaylistName('');
      setImage(null);
      setImageUrl(null);
      HelperFunctions.showToastMsg('Playlist Created Successfully!');
      // Navigate to another screen or perform any other action here
      setRefreshPage(true); // Set the state to refresh the page

      // Redirect to AddPlaylist page after 5 seconds
      setTimeout(() => {
        navigation.navigate('AddPlaylist');
      }, 2000);


    } catch (error) {
      console.error('Error creating playlist:', error);
      setLoadingState(false);
    }
  };

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={'New Playlist'}
      leftHeadingStyle={{color: '#E1D01E'}}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={{...styles.container}}>
        <Pressable onPress={openGallery} style={styles.imagePicker}>
          {image ? (
            <Image source={{uri: imageurl}} style={styles.image} />
          ) : (
            <GallaryIcon />
          )}
        </Pressable>
        <Text style={styles.title}>New Playlist</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter playlist name"
          placeholderTextColor="rgba(255, 255, 255, 0.54)"
          value={playlistName}
          onChangeText={text => setPlaylistName(text)}
        />

        <View style={styles.divider} />

        <TouchableHighlight
          style={styles.createButton}
          onPress={createPlaylist}
          underlayColor="#FFD700">
          <Text style={styles.createButtonText}>Create Playlist</Text>
        </TouchableHighlight>
      </View>
    </ScreenLayout>
  );
};

export default PlaylistAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#131313',
    height: height,
  },
  imagePicker: {
    height: 130,
    width: 130,
    borderRadius: 20,
    backgroundColor: '#1C1C1C',
    marginTop: 45,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  title: {
    color: 'rgba(255, 255, 255, 0.54)',
    fontSize: 16,
    fontFamily: Theme.FontFamily.normal,
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  divider: {
    width: width - 30,
    height: 2,
    backgroundColor: 'rgba(118, 118, 128, 0.24)',
    marginTop: 10,
  },
  createButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#131313',
    fontSize: 16,
    fontFamily: Theme.FontFamily.normal,
  },
});
