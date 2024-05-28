import {Alert, Animated, Easing} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';
import {resetAuthData} from '../Store/Reducers/AuthReducer';
import {deleteData} from '../Services/LocalStorage';
import {navRef} from '../../App';
// import { Toast } from "react-native-toast-message/lib/src/Toast";
// import Toast from "react-native-toast-message";
const HelperFunctions = {
  sampleFunction: data => {
    return alert(data);
  },

  numberWithCommas(x) {
    let amount = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return amount;
  },

  isvalidEmailFormat(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  charecterValidation(text) {
    var charRegex = /^[A-Za-z0-9 ]+$/;
    return charRegex.test(text);
  },

  isvalidPasswordFormat(password) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  },

  isValidSSN(ssnNumber) {
    if (ssnNumber == undefined || ssnNumber == null || ssnNumber == '') {
      return true;
    } else if (ssnNumber.length == 9) {
      return true;
    } else {
      return false;
    }
  },

  midiumPasswordCheck(password) {
    var re = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;
    return re.test(password);
  },

  checkAlphaNemericPassword(password) {
    var re = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    return re.test(password);
  },

  showToastMsg(msg) {
    return Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
  },

  getArr(no) {
    const fruits = [];
    for (let i = 0; i < no; i++) {
      fruits.push(i);
    }
    return fruits;
  },

  shakeErrorMsg(param) {
    console.log(param);
    param.setValue(0);
    Animated.timing(param, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      param.setValue(0);
    });
  },

  calculateAge(dateofBirth) {
    let diff_ms = Date.now() - dateofBirth.getTime();
    let age_dt = new Date(diff_ms);
    console.log(Math.abs(age_dt.getUTCFullYear() - 1970));
    return Math.abs(age_dt.getUTCFullYear() - 1970);
    // dispatch(setIntakeData({"age":Math.abs(age_dt.getUTCFullYear() - 1970)}));
  },

  // logout(){
  //   const dispatch = useDispatch();
  //   Alert.alert('Logout', 'Are you sure you want to logout from this app?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'default',
  //     },
  //     {
  //       text: 'YES',
  //       onPress: () => {
  //         dispatch(resetAuthData());
  //         deleteData();
  //         // props.navigation.reset({index:0,routes: [{ name: 'LoginScreen' }]});

  //         navRef.current?.reset({
  //           index: 0,
  //           routes: [{name: 'LoginScreen'}],
  //         })
  //       },
  //     },
  //   ]);
  //   return true;
  // }

  // async checkconnectivity(){
  //   /*
  //   const dispatch = useDispatch();
  //   // const { internetConnecivity } = useSelector(state => state.commonData);
  //   // console.log("internetConnecivity : ", internetConnecivity)
  //   const dd = NetInfo.addEventListener(state => {
  //     // console.log("Connection type", state.type);
  //     // console.log("Is connected?", state.isConnected);
  //     dispatch(setInternetConnecivity(state.isConnected))
  //     // setTimeout(() => {

  //     // console.log("internetConnecivity : " ,internetConnecivity);
  //     // }, 3000);
  //   });
  //   // NetInfo.fetch().then((state) => {
  //   //   dispatch(setInternetConnecivity(state.isConnected))
  //   // });
  //   */
  //   b=new Boolean(true);
  //  await NetInfo.fetch().then(state => {
  //     console.log("Connection type", state.type);
  //     console.log("Is connected?", state.isConnected);
  //     b=state.isConnected;
  //   });
  //   return b;
  // }
};

export default HelperFunctions;
