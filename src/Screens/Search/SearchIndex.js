/* eslint-disable prettier/prettier */
import {BlurView} from '@react-native-community/blur';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import {AppTextInput} from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import LinearGradient from 'react-native-linear-gradient';
import MicroPhoneIcon from '../../assets/icons/MicrophoneIcon';
import NavigationService from '../../Services/Navigation';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
import {useTranslation} from 'react-i18next';
import AllSourcePath from '../../Constants/PathConfig';

const {width, height} = Dimensions.get('screen');

const SearchIndex = props => {
  const token = useSelector(state => state.authData.token);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cat, setCat] = useState(0);
  const [data, setData] = useState([]);
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  
  useEffect(() => {
    console.log('Category changed:', cat);
    const fetchData = async () => {
      let endpoint = '';
      switch (cat) {
        case 0: // Live
          endpoint = 'lives/list';
          break;
        case 1: // Podcast
          endpoint = 'podcast/list';
          break;
        case 2: // Video
          endpoint = 'videos/list';
          break;
        default:
          endpoint = '';
      }

      if (endpoint !== '') {
        try {
          const response = await apiCall(endpoint, 'GET', {}, token);
          if (response && response.data && response.data.listData) {
            setData(response.data.listData);
            setFilteredData(response.data.listData);
            console.log('Data received:', response.data.listData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData(); // Call fetchData inside the useEffect callback
  }, [cat, token]);

  const {t} = useTranslation();

  const handleSearch = query => {
    console.log('Search Query:', query);
    setSearchQuery(query);

    if (data && Array.isArray(data)) {
      if (query === '') {
        setFilteredData(data);
      } else {
        const filtered = data.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        );
        console.log('Filtered Data:', filtered);
        setFilteredData(filtered);
      }
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />
      <View style={{flex: 1}}>
        <AppTextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
          placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
          inputStyle={{fontSize: 14}}
          autoCapitalize="none"
          titleStyle={{
            fontFamily: Theme.FontFamily.semiBold,
            fontSize: Theme.sizes.s16,
          }}
          mainContainerStyle={{}}
          rightAction={<MicroPhoneIcon />}
          leftIcon={{
            name: 'search',
            type: 'Feather',
            color: 'rgba(255, 255, 255, 0.54)',
            size: 21,
          }}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />

        <FlatList
          data={['Live', 'Podcast', 'Video']}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled
          contentContainerStyle={{
            paddingVertical: 25,
            paddingLeft: 20,
            paddingBottom: 35,
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={index}
                onPress={() => setCat(index)}
                style={{
                  height: 50,
                  width: 105,
                  borderRadius: 30,
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  borderWidth: 1.5,
                  backgroundColor: cat == index ? '#fff' : 'transparent',
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color:
                      cat == index ? '#131313' : 'rgba(255, 255, 255, 0.54)',
                    fontSize: 16,
                    fontFamily: Theme.FontFamily.normal,
                  }}>
                  {t(item)}
                </Text>
              </Pressable>
            );
          }}
        />

        <FlatList
          data={filteredData}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, paddingTop: 5}}
          renderItem={({item}) => {
            return (
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.3)',
                  '#f4c5c5',
                  'rgba(255, 255, 255, 0.3)',
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.1)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 0.6, y: 0}}
                style={{
                  flex: 1,
                  height: 120,
                  width: width - 40,
                  borderRadius: 15,
                  marginTop: 10,
                  flexDirection: 'row',
                  padding: 10,
                  alignSelf: 'center',
                }}>
                <View
                  style={{marginLeft: 3, borderRadius: 10, overflow: 'hidden'}}>
                  <Image
                    source={
                      cat === 0
                        ? {uri: item.imageUrl}
                        : {uri: `${imageUrl}${item?.image}`}
                    }
                    style={{
                      height: 100,
                      width: 100,
                    }}
                    resizeMode="cover"
                  />
                </View>
                <Pressable
                  onPress={() => {
                    if (cat === 0) {
                      NavigationService.navigate('LiveDetails', {id: item?._id});
                    } else if (cat === 1) {
                      NavigationService.navigate('PodcastLive', item);
                    } else if (cat === 2) {
                      NavigationService.navigate('ReelVideoIndex', {id: item?._id});
                    }
                  }}
                  style={{
                    marginHorizontal: 10,
                    width: '60%',
                  }}>
                  {cat === 0 && (
                    <Pressable
                      style={{
                        height: 29,
                        width: 58,
                        borderRadius: 30,
                        backgroundColor: '#ED4040',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 2,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.normal,
                        }}>
                        {t('Live')}
                      </Text>
                    </Pressable>
                  )}
                  <View style={{marginTop: 12}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: Theme.FontFamily.medium,
                        marginLeft: 5,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                        marginLeft: 5,
                      }}>
                      {item.views} 
                      {/* • */}
                       {formatDate(item.created_at)}
                    </Text>
                  </View>
                </Pressable>
              </LinearGradient>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  input_container_sty: {
    paddingHorizontal: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 0,
    width: width - 40,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 60,
  },
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 15,
    color: '#fff',
  },
});
