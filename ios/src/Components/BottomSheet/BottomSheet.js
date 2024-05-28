import {
  Dimensions,
  StyleSheet,
  View,
  PanResponder,
  Animated,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = ({children, onstartUp, headerItems}) => {
  const translateY = useRef(new Animated.Value(-200)).current;
  const [active, setActive] = useState(false);
  const context = useRef({y: 0}).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        context.y = translateY._value;
      },
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(gestureState.dy + context.y);
        translateY.setValue(Math.max(translateY._value, MAX_TRANSLATE_Y));
        translateY.setValue(Math.min(translateY._value, -100));
        console.log(Math.abs(translateY._value));
        onstartUp(Math.abs(translateY._value));
      },
      onPanResponderRelease: () => {
        // Handle release if needed
      },
    }),
  ).current;

  const rBottomSheetStyle = {
    borderRadius: translateY.interpolate({
      inputRange: [MAX_TRANSLATE_Y, MAX_TRANSLATE_Y + 50],
      outputRange: [5, 25],
      extrapolate: 'clamp',
    }),
    transform: [{translateY: translateY}],
  };

  return (
    <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
      <View {...panResponder.panHandlers}>
        {headerItems ? headerItems : undefined}
      </View>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
});

export default BottomSheet;
