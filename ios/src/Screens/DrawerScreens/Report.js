import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import CrossIcon from '../../assets/icons/CrossIcon';
import {Image} from 'react-native';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
const {width, height} = Dimensions.get('screen');

const Report = () => {
  return (
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
          Report a problem
        </Text>
      </View>
      <View style={{marginHorizontal: 20, flex: 1}}>
        <Text
          style={{
            color: 'white',
            fontSize: 21,
            fontFamily: Theme.FontFamily.medium,
            // marginLeft:width/6,
          }}>
          Would you like to include complete logs and diagnostics?
        </Text>
        <Text
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
        </Text>
      </View>
      <Pressable
        onPress={() => NavigationService.navigate('ReportChat')}
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
  );
};

export default Report;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
});
