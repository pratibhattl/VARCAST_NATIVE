/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';

import Theme from '../../Constants/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import HelperFunctions from '../../Constants/HelperFunctions';
import {postApi} from '../../Services/Service';
import {useDispatch, useSelector} from 'react-redux';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import database from '@react-native-firebase/database';
import {setExtraUserDetails} from '../../Store/Reducers/AuthReducer';
import moment from 'moment';
import GlobalStyles from '../../Constants/GlobalStyles';
import LinkIcon from '../../assets/icons/LinkIcon';
import SendIcon from '../../assets/icons/SendIcon';
import NavigationService from '../../Services/Navigation';
import {useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

const ChatIndex = props => {
  const GlobalStyle = GlobalStyles();
  const route = useRoute();

  console.log('route', route.params);

  const [loadingState, setloadingState] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [disabled, setdisabled] = useState(false);
  const [allChat, setallChat] = useState([
    {
      from: 'id123',
      id: '-NXixwOEO8TtURnf7TLC',
      message: 'Hello ',
      msgType: 'text',
      roomId: '-NXigly87wcwCgvqmkrQ',
      sendTime: 1686562653415,
    },
    {
      from: 'id123',
      id: '-NXiy1qRHPI2XDwK8y7g',
      message: 'Where were you all this time? Have any problem?',
      msgType: 'text',
      roomId: '-NXigly87wcwCgvqmkrQ',
      sendTime: 1686562679859,
    },
    {
      from: 'id1234',
      id: '-NXixwOEO8TtURnf7TLC',
      message: 'Hello ',
      msgType: 'text',
      roomId: '-NXigly87wcwCgvqmkrQ',
      sendTime: 1686562653415,
    },
    {
      from: 'id123',
      id: '-NXiy1qRHPI2XDwK8y7g',
      message: 'Test',
      msgType: 'text',
      roomId: '-NXigly87wcwCgvqmkrQ',
      sendTime: 1686562679859,
    },
    {
      from: 'id1234',
      id: '-NXixwOEO8TtURnf7TLC',
      message: 'Where were you all this time? Have any problem? ',
      msgType: 'text',
      roomId: '-NXigly87wcwCgvqmkrQ',
      sendTime: 1686562653415,
    },
  ]);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const dispatch = useDispatch();
  const {token, userDetails} = useSelector(state => state.authData);

  // const [roomId,setRoomId]=useState('demo123456789')
  const [roomId, setRoomId] = useState('');

  //   const {userData} = useSelector(state => state.common);

  //   useEffect(()=>{

  //     if(roomId == ''){
  //       if (userDetails.chat_room_id==null || userDetails.chat_room_id==undefined || userDetails.chat_room_id=="") {
  //         console.log("createchat")
  //         createUserInFirebaseRDB()
  //       } else {
  //         setRoomId(userDetails.chat_room_id)
  //       }
  //     }
  //   },[])

  /* == Create New user in Firebase == */
  const createUserInFirebaseRDB = () => {
    const usersMade = database().ref('/users').push();
    let firebaseUserDetails = {
      email: userDetails.user_email,
      name: userDetails.display_name,
    };
    setloadingState(true);
    usersMade
      .set(firebaseUserDetails)
      .then(e => {
        // console.log("user created")
        createChatlistInFirebaseRDB(usersMade.key);
      })
      .catch(e => {
        // console.log(e)
        setloadingState(false);
        HelperFunctions.showToastMsg(e.message);
      });
  };

  /* == Create Chat list for new user == */
  const createChatlistInFirebaseRDB = userKey => {
    const chatListMade = database().ref('/chatlist').push();
    let chatListData = {
      email: userDetails.user_email,
      id: userKey,
      lastMsg: '',
      name: userDetails.display_name,
      roomId: chatListMade.key,
      sendTime: 0,
    };
    chatListMade
      .set(chatListData)
      .then(() => {
        setChatRoomKey(chatListMade.key);
      })
      .catch(e => {
        setloadingState(false);
        HelperFunctions.showToastMsg(e.message);
      });
  };

  /* == Set room ID for new user == */
  const setChatRoomKey = chatRoomKey => {
    postApi('user/chat', {room_id: chatRoomKey}, token)
      .then(response => {
        if (response?.code !== 200) {
          HelperFunctions.showToastMsg(response?.message);
        } else {
          setRoomId(chatRoomKey);
          dispatch(setExtraUserDetails({chat_room_id: chatRoomKey}));
        }
        setloadingState(false);
      })
      .catch(error => {
        setloadingState(false);
        HelperFunctions.showToastMsg(error.message);
      });
  };

  //   useEffect(() => {

  //     if(roomId != ''){
  //       setloadingState(true)
  //       console.log("Use effect room id is available :",roomId)
  //       database().ref('/messages/'+roomId)
  //       .on('value',snapshot => {
  //         if(snapshot.val()){
  //           // const array = Object.values(snapshot.val()).sort((a, b) =>  a.sendTime - b.sendTime );
  //           const array = Object.values(snapshot.val()).sort((a, b) =>  b.sendTime - a.sendTime );
  //           setallChat([]);
  //           setallChat(array)
  //             if(allChat.length >0){
  //               scrollToIndex(0)
  //             }
  //         }
  //         setloadingState(false)
  //       })

  //     }else{
  //       console.log("Use effect room id is black ....")
  //     }
  //   },
  //   [roomId]
  //   );

  /*== Send Message == */
  const sendMsg = () => {
    if (message.trim().length === 0) {
      return;
    }
    setdisabled(true);
    let msgData = {
      roomId: roomId,
      message: message,
      from: 'id123',
      sendTime: new Date().getTime(),
      msgType: 'text',
    };
    setMessage('');
    // console.log(msgData);
    const newReference = database()
      // .ref('/messages/' + receiverData.roomId)
      .ref('/messages/' + roomId)
      .push();
    msgData.id = newReference.key;

    newReference.set(msgData).then(() => {
      let chatListupdate = {
        lastMsg: message,
        sendTime: msgData.sendTime,
      };
      database()
        .ref('/chatlist/' + roomId)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));
      setMessage('');
      setdisabled(false);
    });
  };

  const renderItem = ({item, index}) => (
    <Pressable key={index} style={{marginVertical: 0}}>
      <View
        style={[
          styles.TriangleShapeCSS,
          item.from === 'id123' ? styles.right : [styles.left],
        ]}
      />
      <View
        style={[
          // styles.masBox,
          {
            alignSelf: item.from === 'id123' ? 'flex-end' : 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            //   backgroundColor: item.from =="id123" ? '#767680' : '#525252',
          },
        ]}>
        {item.from !== 'id123' ? (
          <Image
            source={require('../../assets/images/image3.png')}
            style={{
              width: 47,
              height: 47,
              borderRadius: 30,
              marginLeft: 10,
            }}
          />
        ) : null}
        <View
          style={[
            styles.masBox,

            {
              alignSelf: item.from === 'id123' ? 'flex-end' : 'flex-start',
              backgroundColor: item.from === 'id123' ? '#767680' : '#525252',
            },
          ]}>
          <View>
            <Text
              style={{
                paddingLeft: 5,
                paddingTop: 8,
                color: item.from === 'id123' ? '#fff' : '#fff',
                fontSize: 12.5,
              }}>
              {item.message}
            </Text>

            <Text
              style={{
                paddingLeft: 5,
                paddingTop: 5,
                color: item.from === 'id123' ? '#fff' : '#fff',
                fontSize: 8,
                textAlign: item.from === 'id123' ? 'left' : 'right',
              }}>
              {item?.sendTime
                ? moment(item.sendTime).format('yyyy-MM-DD | HH:mm:ss')
                : ''}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const ref = useRef();

  const scrollToIndex = index => {
    if (allChat.length > 0) {
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
      Watch
      leftHeading={'Augusta Walter'}
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      // HeaderTitleValue="Support"
    >
      <ImageBackground
        // source={{uri: 'https://cdn.wallpapersafari.com/63/70/nzkcDh.jpg'}}
        // source={AllSourcePath.LOCAL_IMAGES.chatBackground}
        style={styles.container}>
        <FlatList
          data={allChat}
          keyExtractor={item => item.id.toString()}
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
          <LinkIcon />
          <TextInput
            multiline={true}
            style={[styles.input, {minHeight: 40, maxHeight: 100}]}
            placeholder="Message..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor={Theme.colors.grey}
          />

          <TouchableOpacity
            disabled={message.trim().length === 0}
            style={[
              styles.sendButton,
              {
                backgroundColor: 'transparent',
                // message.trim().length==0?Theme.colors.grey:Theme.colors.primary
              },
            ]}
            onPress={() => {
              sendMsg();
            }}>
            <SendIcon />
          </TouchableOpacity>
        </View>

        {showScrollDown ? (
          <View style={{position: 'absolute', bottom: '15%', right: '8%'}}>
            <TouchableOpacity
              // disabled={message.trim().length==0}
              style={[styles.downButton, {backgroundColor: Theme.colors.grey}]}
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
    // eslint-disable-next-line no-dupe-keys
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
    transform: [{rotate: '0deg'}],
  },
  right: {
    // borderBottomColor: 'red',
    borderBottomColor: '#767680',
    right: 3,
    // top:0,
    bottom: 2.7,
    transform: [{rotate: '103deg'}],
  },
});

export default ChatIndex;
