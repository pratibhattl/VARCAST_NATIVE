import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';

import {useScrollToTop} from '@react-navigation/native';
import HomePage from '../Screens/Home/HomePage';
import SearchIndex from '../Screens/Search/SearchIndex';
import AddPlaylist from '../Screens/Playlist/AddPlaylist';
import HomeEnableIcon from '../assets/icons/HomeEnableIcon';
import AddSquareIcon from '../assets/icons/AddSquareIcon';
import CompassIcon from '../assets/icons/CompassIcon';
import PlaylistIcon from '../assets/icons/PlayListIcon';
import UserIcon from '../assets/icons/UserIcon';
import PublicationIndex from '../Screens/Publication/PublicationIndex';
import ProfileIndex from '../Screens/Profile/ProfileIndex';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SongPlayComp from '../Components/Podcast/SongPlayComp';
import {Platform, View} from 'react-native';
import UserDetails from '../Screens/Profile/UserDetails';
import PodcastIndex from '../Screens/Podcast/PodcastIndex';
// If you want Bottom Tabs Navigator then use Bottom Tabs
// https://reactnavigation.org/docs/bottom-tab-navigator
// import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  // const theme = useTheme();
  // theme.colors.secondaryContainer = 'transperent';

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'rgba(27, 27, 27, 0.96)',
            paddingBottom: Platform.OS === 'ios' ? 30 : 15,
            height: Platform.OS === 'ios' ? 90 : 70,
            borderWidth: 0,
            borderColor: 'black',
          },
        }}>
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          options={{
            unmountOnBlur: false,
            tabBarIcon: ({color}) => <HomeEnableIcon Color={color} />,
          }}
        />

        <Tab.Screen
          name="Compass"
          component={SearchIndex}
          options={{
            unmountOnBlur: false,
            tabBarIcon: ({color}) => <CompassIcon Color={color} />,
          }}
        />

        <Tab.Screen
          name="Add"
          component={PublicationIndex}
          options={{
            unmountOnBlur: false,
            tabBarIcon: ({color}) => <AddSquareIcon Color={color} />,
          }}
        />
        <Tab.Screen
          name="AddPlaylist"
          component={AddPlaylist}
          options={{ 
            unmountOnBlur: false,
            tabBarIcon: ({color}) => <PlaylistIcon Color={color} />,

          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileIndex}
          options={{
            unmountOnBlur: false,
            tabBarIcon: ({color}) => <UserIcon Color={color} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default BottomTabNavigation;
