
import React, { useEffect, useRef, useState } from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import Theme from '../../Constants/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import moment from 'moment';
import LinkIcon from '../../assets/icons/LinkIcon';
import SendIcon from '../../assets/icons/SendIcon';
import NavigationService from '../../Services/Navigation';
import { apiCall } from '../../Services/Service';
import { useRoute } from '@react-navigation/native';
import AllSourcePath from '../../Constants/PathConfig';

const { width, height } = Dimensions.get('screen');

const CommentChatRoom = () => {
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  const [loadingState, setloadingState] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setdisabled] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const { token } = useSelector(state => state.authData);
  const route = useRoute();
  const [allComments, setAllComments] = useState([]);
  console.log("ROUTES------", route);
  // useEffect(() => {
  //   let obj = {
  //     message: route?.params?.comment,
  //     name: route?.params?.user?.name,
  //     image: route?.params?.user?.image ? imageUrl + route?.params?.user?.image : route?.params?.user?.full_path_image,
  //     created_at: route?.params?.created_at
  //   };
  //   let arr = [];
  //   arr.push(obj);
  //   setAllComments(arr)
  // }, [route?.params])

  const getPodcastComment = async () => {
    const { data } = await apiCall(route?.params?.getEndPoint,
      'GET',
      null,
      token,
    );
    let obj = {};
    let arr = [];
    data?.map((item) => {
      return (
        obj = {
          message: item?.message,
          name: item?.user?.name,
          image: item?.user?.image ? imageUrl + item?.user?.image : item?.user?.full_path_image,
          created_at: item?.created_at
        },
        arr.push(obj)
      )
    })
    setAllComments(arr);
  };

  useEffect(() => {
    getPodcastComment();
  }, []);

  /*== Send Message == */
  const sendMsg = () => {
    if (message.trim().length == 0) {
      return;
    }
    setdisabled(true);
    setloadingState(true)

    let msgData = {

      commentId: route?.params?.id,
      message: message
    };
    apiCall(route?.params?.addEndPoint, 'POST', msgData, token)
      .then(res => {
        if (res) {
          setMessage('');
          setTimeout(() => {
            setloadingState(false)
            getPodcastComment();
          }, 200)
        }
      })
      .catch(err => { console.log("err----", err); setloadingState(false) });
  };

  const renderItem = ({ item, index }) => (
    <Pressable key={index} style={{ marginVertical: 0 }}>
      <View
        style={[
          styles.TriangleShapeCSS,
          item.from == 'id123' ? styles.right : [styles.left],
        ]}
      />
      <View
        style={[
          {
            alignSelf: item.from == 'id123' ? 'flex-end' : 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>

        <Image
          source={{ 'uri': item?.image }}
          style={{
            width: 47,
            height: 47,
            borderRadius: 30,
            marginLeft: 10,
          }}
        />

        <View
          style={[
            styles.masBox,
            {
              alignSelf: item.from == 'id123' ? 'flex-end' : 'flex-start',
              backgroundColor: item.from == 'id123' ? '#767680' : '#525252',
            },
          ]}>

          <View>
            <Text
              style={{
                paddingLeft: 5,
                paddingTop: 8,
                color: item.from == 'id123' ? '#fff' : '#fff',
                fontSize: 15,
              }}>
              {item?.name}
            </Text>
            <Text
              style={{
                paddingLeft: 5,
                paddingTop: 8,
                color: item.from == 'id123' ? '#fff' : '#fff',
                fontSize: 15,
              }}>
              {item.message}
            </Text>

            <Text
              style={{
                paddingLeft: 5,
                paddingTop: 5,
                color: item.from == 'id123' ? '#fff' : '#fff',
                fontSize: 12,
                textAlign: item.from == 'id123' ? 'left' : 'right',
              }}>
              {item?.created_at
                ? moment(item?.created_at).format('yyyy-MM-DD | HH:mm:ss')
                : ''}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const ref = useRef();

  const scrollToIndex = index => {
    if (allComments.length > 0) {
      ref?.current?.scrollToIndex({
        animated: true,
        // index: allChat.length - 1,
        index: index,
      });
    }
  };

  return (
    <ScreenLayout
      isScrollable={false}
      showLeftIcon={true}
      showLoading={loadingState}
      onLeftIconPress={() => {
        NavigationService.back();
        // scrollToIndex(0)
      }}
      // Watch
      leftHeading={route?.params?.comment}
      headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96);' }}
    HeaderTitleValue={route?.params?.comment}
    >
      <ImageBackground
        style={styles.container}>
        <FlatList
          data={allComments}
          inverted
          renderItem={renderItem}
          initialNumToRender={10}
          onScroll={pr => {
            if (pr.nativeEvent.contentOffset.y > 300) {
              setShowScrollDown(true);
            } else {
              setShowScrollDown(false);
            }
          }}
          ref={ref}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          {/* <View style={{}}> */}
          {/* <LinkIcon /> */}
          <TextInput
            multiline={true}
            style={[styles.input, { minHeight: 40, maxHeight: 100 }]}
            placeholder="Type your issue here..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor={Theme.colors.white}
          />

          <TouchableOpacity
            disabled={message.trim().length == 0}
            style={[
              styles.sendButton,
              {
                backgroundColor: 'transparent',
                // message.trim().length==0?Theme.colors.grey:Theme.colors.primary
              },
            ]}
            onPress={() => { sendMsg() }}
          >
            <SendIcon />
          </TouchableOpacity>
        </View>

        {showScrollDown ? (
          <View style={{ position: 'absolute', bottom: '15%', right: '8%' }}>
            <TouchableOpacity
              // disabled={message.trim().length==0}
              style={[styles.downButton, { backgroundColor: Theme.colors.grey }]}
              onPress={() => {
                scrollToIndex(0);
              }}>
              <IonIcon name="chevron-down-outline" color="black" size={12} />
              <IonIcon name="chevron-down-outline" color="black" size={12} />
            </TouchableOpacity>
          </View>
        ) : null}
      </ImageBackground>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#131313',
    width: width,
    padding: 0,
  },
  messageContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 8,
    paddingVertical: 10,
    height: 80,
    backgroundColor: 'rgba(27, 27, 27, 0.96)',
    width: width,
    padding: 15,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    color: Theme.colors.white,
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    padding: 10,
  },
  sendButton: {
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downButton: {
    borderRadius: 5,
    //backgroundColor:'white',
    height: 30,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  masBox: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    minWidth: 80,
    maxWidth: '80%',
    marginVertical: 5,
    padding: 4,
    paddingHorizontal: 7,
    borderRadius: 8,
    flexDirection: 'row',
  },
  timeText: {
    fontFamily: 'AveriaSerifLibre-Light',
    fontSize: 10,
  },
  dayview: {
    alignSelf: 'center',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.white,
    borderRadius: 30,
    marginTop: 10,
  },
  iconView: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.themecolor,
  },
  TriangleShapeCSS: {
    position: 'absolute',
    // top: -3,
    width: 0,
    height: 0,
    // borderBottomLeftRadius:5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 5,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // borderBottomColor: '#757474'
  },
  left: {
    borderBottomColor: '#525252',
    // borderBottomColor: 'red',
    left: 60,
    bottom: 5,
    transform: [{ rotate: '0deg' }],
  },
  right: {
    // borderBottomColor: 'red',
    borderBottomColor: '#767680',
    right: 3,
    // top:0,
    bottom: 2.7,
    transform: [{ rotate: '103deg' }],
  },
});

export default CommentChatRoom;

