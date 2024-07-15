import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { apiCall } from '../../Services/Service';

export default function AudiencePage(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const liveId = route.params?.liveID;
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
    setLiveID(liveId);
  }, []);

  const onJoinPress = async isHost => {
    if (!isHost) {
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
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={[styles.buttonLine, styles.leftPadding]}>
        <View style={styles.buttonSpacing} />
        <TouchableOpacity
          style={styles.button}
          disabled={liveID.length == 0}
          onPress={() => {
            onJoinPress(false);
          }}
        >
          <Text style={styles.buttonText}>Watch a live</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131313', // Change background color as needed
  },
  buttonLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust spacing if needed
  },
  // buttonSpacing: {
  //   marginHorizontal: 0, // Adjust spacing between elements
  // },
  button: {
    height: 50,
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#FFD700', // Adjust button color
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#131313', // Adjust text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  leftPadding: {
    paddingLeft: 20, // Adjust left padding as needed
  },
});
