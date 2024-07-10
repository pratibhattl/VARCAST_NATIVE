import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Pressable,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import GallaryIcon from '../../assets/icons/GallaryIcon';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import {apiCall} from '../../Services/Service';

const {width, height} = Dimensions.get('screen');

const HomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const customProp = route.params?.showButton;
  const insets = useSafeAreaInsets();
  const [userID, setUserID] = useState('');
  const userDetails = useSelector(state => state.authData.userDetails);
  const token = useSelector(state => state.authData.token);
  const endpoint = 'lives/create';
  const [liveID, setLiveID] = useState('');
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setUserID(String(Math.floor(Math.random() * 100000)));
    setLiveID(String(Math.floor(Math.random() * 10000)));
  }, []);

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

  const onJoinPress = async () => {
    if (!title || !overview || !image) {
      Alert.alert(
        'Validation Error',
        'Please enter a title, an overview, and select an image.',
      );
      return;
    }

    setLoading(true);

    try {
      const body = {
        title: title,
        overview: overview,
        imageUrl: imageUrl,
        videoUrl: 'https://yourvideourl.com',
        liveUniqueId: liveID,
      };

      const response = await apiCall(endpoint, 'POST', body, token);
      console.log('API Response:', response);

      // Navigate to HostPage if API call is successful
      navigation.navigate('HostPage', {
        userID: userID,
        userName: userDetails.name,
        liveID: liveID,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to start a live session. Please try again.');
      console.error('Error creating live session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      isScrollable={true}
      leftHeading={'Live Stream'}
      leftHeadingStyle={{color: '#E1D01E'}}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View
        style={[
          styles.container,
          {paddingTop: insets.top, paddingBottom: insets.bottom},
        ]}>
        <Text style={styles.userID}>Host Name: {userDetails.name}</Text>

        <Pressable onPress={openGallery} style={styles.imagePicker}>
          {image ? (
            <Image source={{uri: imageUrl}} style={styles.image} />
          ) : (
            <GallaryIcon />
          )}
        </Pressable>
        <Text style={styles.title}>Upload Thumbnail</Text>
        <TextInput
          placeholder="Enter the title"
          placeholderTextColor="rgba(255, 255, 255, 0.54)"
          style={[styles.input]}
          onChangeText={text => setTitle(text)}
          value={title}
        />
        <TextInput
          placeholder="Enter the overview"
          placeholderTextColor="rgba(255, 255, 255, 0.54)"
          style={[styles.input]}
          onChangeText={text => setOverview(text)}
          value={overview}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.createButton, loading && styles.buttonDisabled]}
            onPress={onJoinPress}
            disabled={loading}>
            <Text style={styles.createButtonText}>
              {loading ? 'Starting...' : 'Start a live'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#131313',
  },
  input: {
    height: 42,
    width: '90%',
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#333333',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: '5%',
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#333',
  },
  userID: {
    fontSize: 14,
    color: '#E1D01E',
    marginBottom: 27,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 20,
  },
  imagePicker: {
    height: 130,
    width: 130,
    borderRadius: 20,
    backgroundColor: '#1C1C1C',
    marginTop: 0,
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
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 300,
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
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default HomePage;
