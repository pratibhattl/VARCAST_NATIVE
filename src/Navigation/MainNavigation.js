import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '../Screens';
import DrawerNavigation from './DrawerNavigation';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import ForgotPass from '../Screens/Auth/ForgotPass';
import UpdatePass from '../Screens/Auth/UpdatePass';
import HomePage from '../Screens/Home/HomePage';
import BottomTabNavigation from './BottomTabNavigation';
import Wallet from '../Screens/DrawerScreens/Wallet';
import Activity from '../Screens/DrawerScreens/Activity';
import HelpCenter from '../Screens/DrawerScreens/HelpCenter';
import PrivacyPolicy from '../Screens/DrawerScreens/PrivacyPolicy';
import SearchIndex from '../Screens/Search/SearchIndex';
import AddPlaylist from '../Screens/Playlist/AddPlaylist';
import PublicationIndex from '../Screens/Publication/PublicationIndex';
import Publication01 from '../Screens/Publication/Publication01';
import Publication02 from '../Screens/Publication/Publication02';
import FinalPublication from '../Screens/Publication/FinalPublication';
import WatchLater from '../Screens/Playlist/WatchLater';
import PlaylistAdd from '../Screens/Playlist/PlaylistAdd';
import ProfileIndex from '../Screens/Profile/ProfileIndex';
import AudioReels from '../Screens/Entertainment/AudioReels';
import VideoReels from '../Screens/Entertainment/VideoReels';
import PodcastIndex from '../Screens/Podcast/PodcastIndex';
import ReelVideoIndex from '../Screens/Video/ReelVideoIndex';
import EditProfile from '../Screens/Profile/EditProfile';
import Followers from '../Screens/Profile/Followers';
import ChatIndex from '../Screens/Chat/ChatIndex';
import ChatList from '../Screens/Chat/ChatList';
import PodcastLive from '../Screens/Podcast/PodcastLive';
import VideoLive from '../Screens/Video/VideoLive';
import SongPlayy from '../Screens/Podcast/SongPlayy';
import Recharge from '../Screens/DrawerScreens/Recharge';
import PopularEpisode from '../Screens/Home/PopularEpisode';
import ReportChat from '../Screens/DrawerScreens/ReportChat';
import NotificationIndex from '../Screens/Notification/NotificationIndex';
import OwnPodcastLive from '../Screens/Publication/OwnPodcastLive';
import MostPlayed from '../Screens/Home/MostPlayed';
import LiveEpisode from '../Screens/Home/Live';
import {useNavigation} from '@react-navigation/native';
import UserDetails from '../Screens/Profile/UserDetails';
import OurPicks from '../Screens/Home/OurPicks';
import FollowingUser from '../Screens/Home/FollowingUser';
import UploadScreen from '../Screens/Upload/UploadScreen';
import LiveDetails from '../Screens/Live/Livedetails';
import ChatRoom from '../Screens/Chat/ChatRoom';
import FollowingUsers from '../Screens/Profile/FollowingUsers'
import PodcastComment from '../Screens/Podcast/PodcastComment';
import AgoraTest from "../Screens/Live/AgoraTest";


const Stack = createNativeStackNavigator();

function MainNavigation() {
  const navigation = useNavigation();
  const goToUserDetails = userData => {
    navigation.navigate('UserDetails', {userData});
  };
  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigation"
      screenOptions={{animation: 'none'}}>
      {/* <Stack.Screen
        name="SplashScreen"
        options={{headerShown: false}}
        component={SplashScreen}
      /> */}
      {/* 
<Stack.Screen
  name="Login"
  options={{headerShown: false}}
  component={Login}
/>
<Stack.Screen
  name="Signup"
  options={{headerShown: false}}
  component={Signup}
/>
<Stack.Screen
  name="ForgotPass"
  options={{headerShown: false}}
  component={ForgotPass}
/>
<Stack.Screen
  name="UpdatePass"
  options={{headerShown: false}}
  component={UpdatePass}
/> */}
      <Stack.Screen
        name="ChatRoom"
        options={{headerShown: false}}
        component={ChatRoom}
      />
      <Stack.Screen
        name="DrawerNavigation"
        options={{headerShown: false}}
        component={DrawerNavigation}
      />
      <Stack.Screen
        name="BottomTabNavigation"
        options={{headerShown: false}}
        component={BottomTabNavigation}
      />
      <Stack.Screen
        name="HomePage"
        options={{headerShown: false}}
        component={props => (
          <HomePage {...props} goToUserDetails={goToUserDetails} />
        )}
      />

      <Stack.Screen
        name="Wallet"
        options={{headerShown: false}}
        component={Wallet}
      />
      <Stack.Screen
        name="Recharge"
        options={{headerShown: false}}
        component={Recharge}
      />
      <Stack.Screen
        name="Activity"
        options={{headerShown: false}}
        component={Activity}
      />
       <Stack.Screen
        name="PrivacyPolicy"
        options={{headerShown: false}}
        component={PrivacyPolicy}
      />
        <Stack.Screen
        name="HelpCenter"
        options={{headerShown: false}}
        component={HelpCenter}
      />
      <Stack.Screen
        name="SearchIndex"
        options={{headerShown: false}}
        component={SearchIndex}
      />
      <Stack.Screen
        name="Uplaod"
        options={{headerShown: false}}
        component={UploadScreen}
      />
      <Stack.Screen
        name="AddPlaylist"
        options={{headerShown: false}}
        component={AddPlaylist}
      />
      <Stack.Screen
        name="PublicationIndex"
        options={{headerShown: false}}
        component={PublicationIndex}
      />
      <Stack.Screen
        name="Publication01"
        options={{headerShown: false}}
        component={Publication01}
      />
      <Stack.Screen
        name="Publication02"
        options={{headerShown: false}}
        component={Publication02}
      />
      <Stack.Screen
        name="AgoraTest"
        options={{headerShown: false}}
        component={AgoraTest}
      />
      <Stack.Screen
        name="FinalPublication"
        options={{headerShown: false}}
        component={FinalPublication}
      />
      <Stack.Screen
        name="WatchLater"
        options={{headerShown: false}}
        component={WatchLater}
      />
      <Stack.Screen
        name="PlaylistAdd"
        options={{headerShown: false}}
        component={PlaylistAdd}
      />
      <Stack.Screen
        name="ProfileIndex"
        options={{headerShown: false}}
        component={ProfileIndex}
      />
      <Stack.Screen
        name="AudioReels"
        options={{headerShown: false}}
        component={AudioReels}
      />
      <Stack.Screen
        name="VideoReels"
        options={{headerShown: false}}
        component={VideoReels}
      />
      <Stack.Screen
        name="PodcastIndex"
        options={{headerShown: false}}
        component={PodcastIndex}
      />
      <Stack.Screen
        name="PodcastComment"
        options={{headerShown: false}}
        component={PodcastComment}
      />
      <Stack.Screen
        name="ReelVideoIndex"
        options={{headerShown: false}}
        component={ReelVideoIndex}
      />
      <Stack.Screen
        name="EditProfile"
        options={{headerShown: false}}
        component={EditProfile}
      />
      <Stack.Screen
        name="Followers"
        options={{headerShown: false}}
        component={Followers}
      />
      <Stack.Screen
        name="FollowingUsers"
        options={{headerShown: false}}
        component={FollowingUsers}
      />
      <Stack.Screen
        name="ChatIndex"
        options={{headerShown: false}}
        component={ChatIndex}
      />
      <Stack.Screen
        name="ChatList"
        options={{headerShown: false}}
        component={ChatList}
      />
      <Stack.Screen
        name="PodcastLive"
        options={{headerShown: false}}
        component={PodcastLive}
      />
      <Stack.Screen
        name="LiveDetails"
        options={{headerShown: false}}
        component={LiveDetails}
      />
      <Stack.Screen
        name="OwnPodcastLive"
        options={{headerShown: false}}
        component={OwnPodcastLive}
      />
      <Stack.Screen
        name="VideoLive"
        options={{headerShown: false}}
        component={VideoLive}
      />
      <Stack.Screen
        name="SongPlayy"
        options={{headerShown: false}}
        component={SongPlayy}
      />

      <Stack.Screen
        name="PopularEpisode"
        options={{headerShown: false}}
        component={PopularEpisode}
      />
      <Stack.Screen
        name="MostPlayed"
        options={{headerShown: false}}
        component={MostPlayed}
      />
      <Stack.Screen
        name="Live"
        options={{headerShown: false}}
        component={LiveEpisode}
      />
      <Stack.Screen
        name="ReportChat"
        options={{headerShown: false}}
        component={ReportChat}
      />
      <Stack.Screen
        name="NotificationIndex"
        options={{headerShown: false}}
        component={NotificationIndex}
      />
      <Stack.Screen
        name="OurPicks"
        options={{headerShown: false}}
        component={OurPicks}
      />
      <Stack.Screen
        name="FollowingUser"
        options={{headerShown: false}}
        component={FollowingUser}
      />
      <Stack.Screen
        name="UserDetails"
        options={{
          headerShown: false,
          tabBarStyle: null, // Hide the tab bar
        }}
        component={UserDetails}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
