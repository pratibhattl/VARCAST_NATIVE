import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {useRoute} from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import {Image} from 'react-native';
import NavigationService from '../../Services/Navigation';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
const {width, height} = Dimensions.get('screen');

const Activity = (props) => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [allData, setAllData] = useState([])
  const token = useSelector(state => state.authData.token);

   
  const fetchData = async () => {
    try {
      const endpoint = 'activity/index';
      const response = await apiCall(endpoint, 'GET', {}, token);

      if (response.status) {
        setAllData(response?.data?.listData);
      } else {
        console.error('Error fetching data: ', response?.message);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    if(props){
      fetchData();
    }
  }, [props]);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={'Your Activity'}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <FlatList
          data={allData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 0}}
          renderItem={({item, index}) => {
            const formatDate = (timestamp) => {
              const date = new Date(timestamp);
              return date.toISOString().split('T')[0];
          };
          const formatTime = (timestamp) => {
            const date = new Date(timestamp);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        };
            return (
              <View
                key={index}
                style={{
                  marginTop: 25,
                  borderBottomColor: '#1C1C1C',
                  borderBottomWidth: 1.5,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: Theme.FontFamily.medium,
                  }}>
                  {item?.message}
                </Text>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.54)',
                    fontSize: 14,
                    fontFamily: Theme.FontFamily.light,
                    marginTop: 3,
                  }}>
                  {formatDate(item?.created_at)}{' '}
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.light,
                    }}>
                    {formatTime(item?.created_at)}
                  </Text>
                </Text>
                <View style={{flexDirection: 'row', marginTop: 12}}>
                  <View
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      borderWidth: item.price ? 2 : 0,
                      borderRadius: 6,
                      // padding:1
                    }}>
                    <Image
                      source={item.image}
                      style={{
                        height: 42,
                        width: 42,
                        borderRadius: 5,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  {item.price ? (
                    <View
                      style={{
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#ED4040',
                          fontSize: 16,
                          fontFamily: Theme.FontFamily.medium,
                        }}>
                        {' '}
                        {item.price}
                      </Text>
                    </View>
                  ) : (
                    <View style={{paddingHorizontal: 15}}>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          fontSize: 16,
                          fontFamily: Theme.FontFamily.normal,
                        }}>
                        {item.details}
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.light,
                          marginTop: 5,
                        }}>
                        {item.hostedby}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default Activity;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
  },
});
