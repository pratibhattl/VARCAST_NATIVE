
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import { useRoute } from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import { Image } from 'react-native';
import NavigationService from '../../Services/Navigation';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const PrivacyPolicy = () => {
  const route = useRoute();
  const [loadingState, changeloadingState] = useState(false);

  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;

  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96);' }}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={'Your Activity'}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <Text style={{
          color: 'white',
          fontSize: 21,
          fontFamily: Theme.FontFamily.medium,
          marginBottom: 15,
          marginTop: 15
          // marginLeft:width/6,
        }}>Privacy & Security</Text>
        <Text style={{
          fontFamily: Theme.FontFamily.normal,
          color: '#fff',
          fontSize: 14,
          marginHorizontal: 3,
        }}>What is Lorem Ipsum?
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
      </View>
    </ScreenLayout>
  );
};

export default PrivacyPolicy;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
  },
});
