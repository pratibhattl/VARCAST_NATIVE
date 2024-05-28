import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';

const OtpInput = ({numInputs = 4, onComplete, editable = true}) => {
  const [otp, setOtp] = useState(Array(numInputs).fill(''));
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value !== '' && index < numInputs - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all inputs are filled
    if (newOtp.every(code => code !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (index, key) => {
    // Move to previous input if current input is empty and backspace is pressed
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(numInputs)
        .fill()
        .map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={otp[index]}
            editable={editable}
            cursorColor={'#fff'}
            onChangeText={value => handleOtpChange(index, value)}
            onKeyPress={({nativeEvent: {key}}) => handleKeyPress(index, key)}
            ref={ref => (inputRefs.current[index] = ref)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 50,
  },
  input: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 20,
  },
});

export default OtpInput;
