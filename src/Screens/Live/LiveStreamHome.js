import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet, Text, TextInput, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
export default function HomePage(props) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [userID, setUserID] = useState('');
  const userDetails = useSelector(state => state.authData.userDetails);
  const token = useSelector(state => state.authData.token);
  const endpoint = 'lives/create';
  const [liveID, setLiveID] = useState('');
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserID(String(Math.floor(Math.random() * 100000)));
    setLiveID(String(Math.floor(Math.random() * 10000)));
  }, []);

  const onJoinPress = async isHost => {
    if (isHost) {
      if (!title || !overview) {
        Alert.alert(
          'Validation Error',
          'Please enter a title and an overview.',
        );
        return;
      }

      setLoading(true);
      try {
        const body = {
          title: title,
          overview: overview,
          imageUrl: 'https://yourimageurl.com',
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
        Alert.alert(
          'Error',
          'Failed to start a live session. Please try again.',
        );
        console.error('Error creating live session:', error);
      } finally {
        setLoading(false);
      }
    } else {
      navigation.navigate('AudiencePage', {
        userID: userID,
        userName: userDetails.name,
        liveID: liveID,
      });
    }
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <Text style={styles.userID}>Host Name: {userDetails.name}</Text>
      <Text style={[styles.liveID, styles.leftPadding]}>Live ID:</Text>
      <TextInput
        placeholder="Enter the Live ID. e.g. 6666"
        style={[styles.input]}
        onChangeText={text => setLiveID(text.replace(/[^0-9A-Za-z_]/g, ''))}
        maxLength={4}
        value={liveID}
      />
      <Text style={[styles.label, styles.leftPadding]}>Title:</Text>
      <TextInput
        placeholder="Enter the title"
        style={[styles.input]}
        onChangeText={text => setTitle(text)}
        value={title}
      />
      <Text style={[styles.label, styles.leftPadding]}>Overview:</Text>
      <TextInput
        placeholder="Enter the overview"
        style={[styles.input]}
        onChangeText={text => setOverview(text)}
        value={overview}
      />
      <View style={[styles.buttonLine, styles.leftPadding]}>
        <Button
          disabled={liveID.length == 0 || loading}
          style={styles.button}
          title={loading ? 'Starting...' : 'Start a live'}
          onPress={() => {
            onJoinPress(true);
          }}
        />
        <View style={styles.buttonSpacing} />
        <Button
          disabled={liveID.length == 0}
          style={styles.button}
          title="Watch a live"
          onPress={() => {
            onJoinPress(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
  },
  buttonSpacing: {
    width: 13,
  },
  input: {
    height: 42,
    width: 305,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#333333',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 35,
    marginBottom: 20,
  },
  userID: {
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 27,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 20,
  },
  liveID: {
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 5,
  },
  simpleCallTitle: {
    color: '#2A2A2A',
    fontSize: 21,
    width: 330,
    fontWeight: 'bold',
    marginBottom: 27,
  },
  button: {
    height: 42,
    borderRadius: 9,
    backgroundColor: '#F4F7FB',
  },
  leftPadding: {
    paddingLeft: 35,
  },
});
