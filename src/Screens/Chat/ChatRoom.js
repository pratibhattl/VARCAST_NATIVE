import React, {useState, useEffect, useCallback} from 'react';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {moderateScale, scale, verticalScale} from '../../Constants/PixelRatio';
import CustomHeader from '../../Components/Header/CustomHeader';
import NavigationService from '../../Services/Navigation';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
// import { moderateScale,moderateScaleVertical } from 'react-native-size-matters';

const ChatRoom = () => {
  const route = useRoute();
  const {userDetails, token} = useSelector(state => state.authData);
  console.log('route', route);
  const [messages, setMessages] = useState([]);

  const renderAvatar = () => {
    return (
      <View style={styles.profile}>
        <Image
          source={
            route.params.image
              ? {uri: route.params.image}
              : require('../../assets/images/user.png')
          }
         style={styles.pic}
        />
      </View>
    );
  };

  // const renderActions = useCallback(() => {
  //   return (
  //     <TouchableOpacity style={styles.clip}>
  //       <Image source={require('../../assets/images/Vector.png')} />
  //     </TouchableOpacity>
  //   );
  // }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];

    const myMessage = {
      ...msg,
      sendBy: userDetails._id,
      sendTo: route.params.id,
      createdAt: Date.parse(msg.createdAt),
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, myMessage),
    );

    await firestore()
      .collection('chats')
      .doc('' + userDetails._id + route.params.id)
      .collection('messages')
      .add(myMessage);

    await firestore()
      .collection('chats')
      .doc('' + route.params.id + userDetails._id)
      .collection('messages')
      .add(myMessage);

    if (route.params.isExisting) {
      return;
    } else {
      await apiCall(
        'home/checkUserChat',
        'POST',
        {userId: route.params.id},
        token,
      );
    }
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(userDetails._id + route.params.id)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    subscriber.onSnapshot(querySnapshot => {
      const allMessages = querySnapshot.docs.map(item => {
        return {...item._data, createdAt: item._data.createdAt};
      });

      setMessages(allMessages);
    });

    return () => subscriber();
  }, []);

  return (
    <SafeAreaProvider>
      <CustomHeader
        HeaderColor="rgba(27, 27, 27, 0.96)"
        leftHeading={`${route.params.title}`}
        Watch={true}
        onLeftIconPress={() => NavigationService.back()}
      />

      <View style={styles.container}>
        <GiftedChat
          placeholder="Message..."
          messages={messages}
          onSend={messages => onSend(messages)}
          renderSend={renderSend}
          renderAvatar={renderAvatar}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          // renderActions={renderActions}
          user={{
            _id: userDetails._id,
            name: userDetails.name,
            avatar: userDetails.full_path_image,
          }}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    padding: '1rem',
  },
  clip: {
    marginBottom: verticalScale(14),
    marginLeft: moderateScale(12),
    fontSize: scale(1),
  },
  send: {
    // marginBottom: verticalScale(14),
    // marginRight: moderateScale(12),
    fontSize: scale(1),
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 0,
  },
 pic: {
    objectFit: 'scale-down',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});

const renderBubble = props => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: '#ffffff',
          fontSize: 15,
        },
        left: {
          color: '#ffffff',
          fontSize: 15,
        },
      }}
      wrapperStyle={{
        right: {backgroundColor: '#767680', borderBottomRightRadius: 5},
        left: {
          backgroundColor: 'rgba(118, 118, 128, 0.24)',
          borderBottomLeftRadius: 5,
        },
      }}
    />
  );
};

const renderInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: 'rgba(27, 27, 27, 0.96)',
        borderTopColor: 'rgba(27, 27, 27, 0.96)',
        marginTop: 10,
      }}
      textInputStyle={{color: 'grey'}}
    />
  );
};

const renderSend = props => {
  return (
    <Send
      {...props}
      containerStyle={{
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.send}>
        <Image source={require('../../assets/images/Plain.png')} />
      </View>
    </Send>
  );
};
