import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function BookmarkIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke={props.Color ? props.Color : '#fff'} strokeWidth={1.5}>
        <Path d="M19.2 15.273v-3.995c0-3.43 0-5.146-1.055-6.212C17.091 4 15.394 4 12 4 8.606 4 6.909 4 5.854 5.066 4.8 6.132 4.8 7.847 4.8 11.278v3.995c0 2.477 0 3.716.587 4.257.28.258.634.42 1.01.463.79.09 1.712-.725 3.557-2.356.815-.721 1.222-1.082 1.694-1.177a1.78 1.78 0 01.704 0c.471.095.879.456 1.694 1.177 1.844 1.63 2.767 2.447 3.556 2.356a1.79 1.79 0 001.01-.463c.588-.541.588-1.78.588-4.257z" />
        <Path d="M14.4 7.2H9.6" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

export default BookmarkIcon;
