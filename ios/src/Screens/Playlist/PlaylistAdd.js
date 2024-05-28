import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import React, {useState} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {useRoute} from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import GallaryIcon from '../../assets/icons/GallaryIcon';
import NavigationService from '../../Services/Navigation';
import {Switch} from 'react-native-switch';
const {width, height} = Dimensions.get('screen');

const PlaylistAdd = () => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={'New Publication'}
      // Podcast
      // right
      // Live={cat == 'Live' ? true : false}
      leftHeadingStyle={{color: '#E1D01E'}}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={{...styles.container}}>
        <Pressable
          style={{
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
          }}>
          <GallaryIcon />
        </Pressable>
        <Text
          style={{
            color: 'rgba(255, 255, 255, 0.54)',
            fontSize: 16,
            fontFamily: Theme.FontFamily.normal,
            marginVertical: 20,
            textAlign: 'center',
          }}>
          New Playlist
        </Text>
        <View
          style={{
            width: width - 30,
            height: 2,
            backgroundColor: 'rgba(118, 118, 128, 0.24)',
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 100,
            paddingVertical: 0,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontFamily: Theme.FontFamily.normal,
              // marginVertical:20
            }}>
            Show in profile and search
          </Text>
          <Switch
            value={true}
            onValueChange={val => console.log(val)}
            disabled={false}
            activeText={'On'}
            inActiveText={'Off'}
            circleSize={25}
            barHeight={25}
            circleBorderWidth={3}
            backgroundActive={'#1CB62B'}
            backgroundInactive={'gray'}
            circleActiveColor={'#fff'}
            circleInActiveColor={'#000000'}
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}} // style for inner animated circle for what you (may) be rendering inside the circle
            outerCircleStyle={{}} // style for outer animated circle
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
          />
        </View>
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
});
