// import { View, Text, StyleSheet, StatusBar, Dimensions, Pressable, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
// import React, { useState } from 'react'
// import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
// import NavigationService from '../../Services/Navigation';
// import { useRoute } from '@react-navigation/native';
// import { ImageBackground } from 'react-native';
// import CustomHeader from '../../Components/Header/CustomHeader';
// import { Image } from 'react-native';
// import Theme from '../../Constants/Theme';
// import ClockCircleIcon from '../../assets/icons/ClockCircleIcon';
// import VideoPlayIcon from '../../assets/icons/VideoPlayIcon';
// import { BlurView } from '@react-native-community/blur';
// import LinearGradient from 'react-native-linear-gradient';
// import DownArrowIcon from '../../assets/icons/DownArrowIcon';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import DoubleTick from '../../assets/icons/DoubleTick';
// import SendIcon from '../../assets/icons/SendIcon';
// import LinkIcon from '../../assets/icons/LinkIcon';
// import GitftIcon from '../../assets/icons/GiftIcon';
// import ShareIcon from '../../assets/icons/ShareIcon';
// import RedHeartIcon from '../../assets/icons/RedHeartIcon';
// import CrossIcon from '../../assets/icons/CrossIcon';
// const { width, height } = Dimensions.get('screen');

// const VideoLive = (props) => {
//     const route = useRoute();
//     // Access the customProp passed from the source screen
//     const customProp = route.params?.showButton;
//     const [loadingState, changeloadingState] = useState(false);
//   const [message, setMessage] = useState('');

//     const [allData, setAllData] = useState([
//         {
//             'title': 'Allian Buttlar',
//             'date': 'typing...',
//             'time': '19:45',
//             'image': require('../../assets/images/image3.png'),
//             'details': 'My mission is my happiness',
//             'hostedby': 'Hosted by: Kevin Hart'
//         },
//         {
//             'title': 'Augustas Walter',
//             'date': 'Hey, I’m good what about you?',
//             'time': '19:32',
//             'image': require('../../assets/images/image151.png'),
//             'details': 'Gold Minds with Kevin Hart',
//             'hostedby': 'Hosted by: Kevin Hart'
//         },
//         {
//             'title': 'William Jhonson',
//             'date': 'By pioneering reusable rockets, SpaceX is pursuing the long-term goal,Is your team hiring? Cause I"d be a great fit.',
//             'time': ' 14:45',
//             'image': require('../../assets/images/image3.png'),
//             'details': 'My mission is my happiness',
//             'hostedby': 'Hosted by: Kevin Hart',
//             'price': '- $ 120'
//         },
//         {
//             'title': 'David Willy',
//             'date': 'By pioneering reusable rockets, SpaceX is pursuing the long-term goal',
//             'time': ' 19:45',
//             'image': require('../../assets/images/image153.png'),
//             'details': 'Pitbull by Gold Minds with Kevin Hart',
//             'hostedby': 'Hosted by: Kevin Hart'
//         },
//         {
//             'title': 'Steve Smith',
//             'date': 'Is your team hiring? Cause I"d be a great fit.',
//             'time': ' 19:45',
//             'image': require('../../assets/images/image150.png'),
//             'details': 'My mission is my happiness',
//             'hostedby': 'Hosted by: Kevin Hart'
//         },
//         {
//             'title': 'Virat Kohli',
//             'date': 'Is your team hiring? Cause I"d be a great fit.',
//             'time': ' 19:32',
//             'image': require('../../assets/images/image151.png'),
//             'details': 'Gold Minds with Kevin Hart',
//             'hostedby': 'Hosted by: Kevin Hart'
//         },
//         {
//             'title': 'Van der dedassun',
//             'date': '23 Sep ',
//             'time': ' 14:45',
//             'image': require('../../assets/images/image3.png'),
//             'details': 'My mission is my happiness',
//             'hostedby': 'Hosted by: Kevin Hart',
//             'price': '- $ 120'
//         },
//         {
//             'title': 'Video Watched',
//             'date': "Is your team hiring? Cause I'd be a great fit.",
//             'time': '19:45',
//             'image': require('../../assets/images/image153.png'),
//             'details': 'Pitbull by Gold Minds with Kevin Hart',
//             'hostedby': 'Hosted by: Kevin Hart'
//         }
//     ])
//     return (

//         <View style={styles.container}>
//             <StatusBar
//                 backgroundColor={'transparent'}
//                 // animated={true}
//                 barStyle={'light-content'}
//                 translucent={true}
//             />
//             <ImageBackground
//                 source={require('../../assets/images/image140.png')}
//                 style={{
//                     width: width,
//                     height: height ,
//                     backgroundColor: 'rgba(0,0,0,0.999999999)',
//                     // paddingTop: 45,
//                     // alignItems: 'center',
//                     shadowColor: '#131313',
//                     shadowOffset: { width: 0, height: 35 },
//                     shadowOpacity: 0.6,
//                     // shadowRadius: 2,
//                     elevation: 20,
//                     // zIndex:9999,
//                     flex:1
//                     // position:'absolute',
//                     // top: 0,
//                 }}
//                 resizeMode="cover">

//                      <View style={{
//                     flexDirection: 'row', justifyContent: 'space-between', width: width, alignItems: 'center', paddingHorizontal: 5,
//                     paddingTop: height/15,

//                 }}>

//                     <TouchableOpacity
//                         onPress={() => {

//                         }}
//                         style={{
//                             height: 40,
//                             width: 140,
//                             marginVertical: 25,
//                             marginHorizontal: 15,

//                             backgroundColor: 'rgba(28, 28, 28, 0.4)',
//                             borderRadius: 10,
//                             alignItems: 'center',
//                             // justifyContent: 'space-between',
//                             flexDirection: 'row',
//                             paddingHorizontal: 2
//                         }}
//                     >
//                         <View style={{
//                             height: 38,
//                             width: 38,
//                             borderRadius: 10,
//                             backgroundColor: 'red',

//                         }}>
//                             <Image
//                                 source={require('../../assets/images/image97.png')}
//                                 style={{
//                                     height: 38,
//                                     width: 38,
//                                     borderRadius: 10,
//                                     marginRight: 10

//                                 }}
//                                 resizeMode='cover'
//                             />
//                         </View>
//                         <View style={{ marginHorizontal: 10 }}>
//                             <Text
//                                 style={{
//                                     color: '#fff',
//                                     fontSize: 14,
//                                     fontFamily: Theme.FontFamily.normal,
//                                 }}>
//                                 Adrian Reif
//                             </Text>
//                             <Text
//                                 style={{
//                                     color: 'rgba(255, 255, 255, 0.54)',
//                                     fontSize: 13,
//                                     fontFamily: Theme.FontFamily.light,
//                                     textAlign: 'center',
//                                     marginTop: 1

//                                 }}>
//                                 32,217 views
//                             </Text>
//                         </View>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => NavigationService.back()}
//                         style={{
//                             height: 38,
//                             width: 38,
//                             marginVertical: 25,
//                             marginHorizontal: 15,

//                             backgroundColor: 'rgba(28, 28, 28, 0.2)',
//                             borderRadius: 10,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             flexDirection: 'row',
//                             paddingHorizontal: 2,
//                             borderColor: 'white',
//                             borderStyle: 'dashed',
//                             borderWidth: 0.8,
//                         }}
//                     >
//                         <CrossIcon />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{height:height/2.5}}/>
//                 <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
//                     {allData.map((res, ind) => {
//                         return (
//                             <Pressable key={ind}
//                             // onPress={()=>NavigationService.navigate('ChatIndex')}
//                             style={{
//                                 flexDirection: 'row',
//                                 // alignItems: 'center',
//                                 // justifyContent:'space-between',
//                                 marginTop: 15,
//                                 paddingLeft:20,
//                                 paddingRight:15
//                             }}>
//                                 <Pressable
//                                 >
//                                 <Image
//                                     source={res?.image}
//                                     style={{
//                                         height: 40,
//                                         width: 40,
//                                         borderRadius: 45,
//                                         borderWidth:0.7,
//                                         borderColor: 'white',
//                                     }}
//                                     resizeMode='contain'
//                                 />
//                                 </Pressable>
//                                 <View style={{
//                                     flexDirection: 'row', flex: 1, justifyContent: 'space-between',
//                                     marginLeft: 20, borderColor: 'rgba(118, 118, 128, 0.24)', borderBottomWidth: 0, paddingBottom: 10,
//                                     // marginTop:5
//                                 }}>
//                                     <View>
//                                         <Text style={{
//                                             color: '#fff',
//                                             fontSize: 14,
//                                             fontFamily: Theme.FontFamily.medium,
//                                         }}>{res.title}</Text>
//                                         <Text style={{
//                                             color: 'rgba(255, 255, 255, 0.54)',
//                                             fontSize: 14,
//                                             fontFamily: Theme.FontFamily.normal,
//                                             marginTop: 3
//                                         }}>{res.date} </Text>
//                                     </View>
//                                     {/* <Pressable
//                                         onPress={() => {
//                                             // setModalVisible(false)
//                                             // NavigationService.navigate('Publication02')
//                                         }}
//                                         style={{
//                                             marginRight:20,
//                                             alignItems:'flex-end'
//                                         }}>
//                                       <Text style={{
//                                             color: 'rgba(255, 255, 255, 0.54)',
//                                             fontSize: 14,
//                                             fontFamily: Theme.FontFamily.light,
//                                             marginBottom: 3
//                                         }}>{res.time} </Text>
//                                         <DoubleTick/>
//                                     </Pressable> */}
//                                 </View>
//                             </Pressable>
//                         )
//                     })}
//                 </ScrollView>

//                 </ImageBackground>
//                 <View style={styles.inputContainer}>
//           {/* <View style={{}}> */}
//           {/* <LinkIcon/> */}
//             <TextInput
//               multiline={true}
//               style={[styles.input, { minHeight: 40,maxHeight:100 }]}
//               placeholder="Message..."
//               value={message}
//               onChangeText={setMessage}
//               placeholderTextColor={Theme.colors.white}
//             />

//           <TouchableOpacity
//             // disabled={message.trim().length==0}
//             style={
//               [ styles.sendButton,
//               {backgroundColor:'transparent'
//                 // message.trim().length==0?Theme.colors.grey:Theme.colors.primary
//             }
//               ]}
//             //   onPress={()=>{ sendMsg() }}
//               >
//            <SendIcon/>
//           </TouchableOpacity>
//         </View>
//         <View style={{
//             // flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent:'space-between',
//             position:'absolute',
//             bottom:30,
//             // left:0,
//             right:20,
//             // paddingHorizontal:20,
//             // paddingVertical:10,
//         }}>
//             <Pressable style={{
//                 height:50,
//                 width:50,
//                 borderRadius:50,
//                 backgroundColor:'rgba(27, 27, 27, 0.86)',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginBottom:15
//             }}>

//             <GitftIcon/>
//             </Pressable>
//             <Pressable style={{
//                 height:50,
//                 width:50,
//                 borderRadius:50,
//                 backgroundColor:'rgba(27, 27, 27, 0.86)',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginBottom:15

//             }}>
//             <ShareIcon/>
//             </Pressable>
//             <Pressable style={{
//                 height:50,
//                 width:50,
//                 borderRadius:50,
//                 backgroundColor:'rgba(27, 27, 27, 0.86)',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 // marginBottom:10

//             }}>
//             <RedHeartIcon/>
//             </Pressable>
//         </View>
//         </View>
//     )
// }

// export default VideoLive
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // alignItems: 'center',
//         // width:width
//         // paddingHorizontal: 20
//         backgroundColor: '#131313',
//         height: height

//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         // paddingVertical: 8,
//         paddingVertical:10,
//         height:50,backgroundColor:'rgba(27, 27, 27, 0.8)',
//         width:'75%',
//         padding:10,
//         // position:'absolute',
//         bottom:30,
//         justifyContent:'space-between',
//         marginHorizontal:20,
//         borderRadius:30,
//         // marginTop:30
//       },
//       sendButton: {
//         borderRadius: 50,
//         backgroundColor:'white',
//         height:40,width:40,
//         justifyContent:'center',
//         alignItems:'center'

//       },
//       input: {
//         flex: 1,
//         borderColor: '#ccc',
//         // borderWidth: 1,
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         marginRight: 8,
//         color: Theme.colors.white,
//         backgroundColor:'transparent',textAlignVertical: 'top',paddingTop: 10,
//         paddingBottom: 10,
//         flex:1,padding:10,
//         fontSize:16

//       },
// })

// {/* <ScreenLayout
// headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96);' }}
// showLoading={loadingState}
// isScrollable={true}
// leftHeading={'Podcast Details'}
// // Podcast
// // right
// Watch
// // Live={cat == 'Live' ? true : false}
// leftHeadingStyle={{ color: '#E1D01E' }}
// hideLeftIcon={customProp ? false : true}
// onLeftIconPress={() => NavigationService.back()}>
//  <Pressable style={{
//                     position: 'absolute',
//                     bottom: -25,
//                     right: 10,
//                     height: 50,
//                     width: 50,
//                     borderRadius: 30,
//                     backgroundColor: '#fff',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                 }}>
//                     <VideoPlayIcon Width={30} Height={30} />
//                 </Pressable>
// */}
