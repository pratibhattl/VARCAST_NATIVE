import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-paper';
import CrossIcon from '../../assets/icons/CrossIcon';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import axios from 'axios';
import AllSourcePath from '../../Constants/PathConfig';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import { useSelector } from 'react-redux';
import HelperFunctions from '../../Constants/HelperFunctions';
const { width, height } = Dimensions.get('screen');

const HelpCenter = () => {
  const baseUrl = AllSourcePath.API_BASE_URL_DEV;
  const [description, setDescription] = useState('');
  const [Loder, setLoader] = useState(false);
  const token = useSelector(state => state.authData.token);
  const userDetails = useSelector(state => state.authData.userDetails);

  const onSubmitFunc = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('email', userDetails?.email);
    formData.append('description', description);

    axios
      .post(`${baseUrl}helpcentre/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setDescription('');
        setLoader(false);
        Alert.alert('Send', 'Our technical team will get back to you soon.', [
          {
            text: 'Okay',
            onPress: () => null,
            style: 'default',
          },
         
        ]);
        return true;
      })
      .catch(error => {
        HelperFunctions.showToastMsg(error?.message);
        setLoader(false);
      })

  }

  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96)' }}
      showLoading={Loder}
      isScrollable={true}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            width: width,
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingTop: height / 20,
            // flex:1
          }}>
          <TouchableOpacity
            onPress={() => NavigationService.back()}
            style={{
              height: 38,
              width: 38,
              marginVertical: 25,
              marginHorizontal: 15,

              backgroundColor: 'rgba(28, 28, 28, 0.2)',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingHorizontal: 2,
              borderColor: 'white',
              borderStyle: 'dashed',
              borderWidth: 0.8,
            }}>
            <CrossIcon />
          </TouchableOpacity>

          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: width / 6,
            }}>
            Help center
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, flex: 1 }}>
          {/* <Text
          style={{
            color: 'white',
            fontSize: 21,
            fontFamily: Theme.FontFamily.medium,
            // marginLeft:width/6,
          }}>
          Would you like to include complete logs and diagnostics?
        </Text> */}
          {/* <Text
          style={{
            color: 'white',
            fontSize: 11,
            fontFamily: Theme.FontFamily.light,
            marginTop: 25,
            // marginLeft:width/6,
          }}>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum.
          {'\n'}
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
          dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          {'\n'}
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. No sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
          ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et.
        </Text> */}
          <View style={{ padding: 10 }}>
            <TextInput
            editable={false}
              label="Email"
              value={userDetails?.email}
            />
          </View>
          <View style={{ padding: 10 }}>
            <TextInput
              label="Description"
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
        </View>
        <Pressable
          onPress={() => onSubmitFunc()}
          style={{
            height: 53,
            width: 350,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E1D01E',
            borderRadius: 15,
            marginVertical: 15,
          }}>
          <Text
            style={{
              color: '#131313',
              textAlign: 'center',
              fontFamily: Theme.FontFamily.medium,
              fontSize: Theme.sizes.s16,
            }}>
            Include and Continue
          </Text>
        </Pressable>

        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: Theme.FontFamily.medium,
            fontSize: Theme.sizes.s16,
            marginBottom: 40,
          }}>
          Don't Include and Continue
        </Text>
      </View>
    </ScreenLayout>
  );
};

export default HelpCenter;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
});
