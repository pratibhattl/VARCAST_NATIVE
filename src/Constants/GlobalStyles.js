import {StyleSheet, StatusBar, Platform} from 'react-native';
import Theme from './Theme';
// import Theme from './Theme';
import {useTheme} from './ThemeContext';

const GlobalStyles = () => {
  const {isDark} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
      backgroundColor: isDark
        ? Theme.darkColors.background
        : Theme.lightColors.background,
    },
    text: {
      color: 'red',
    },
    inputBoxTextStyle: {
      fontFamily: Theme.FontFamily.normal,
      color: Theme.colors.black,
      fontSize: Theme.sizes.s15,
    },
    footer: {
      backgroundColor: '#fff',
      width: '100%',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    listFlex: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
  });
};

export default GlobalStyles;
