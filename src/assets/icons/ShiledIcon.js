import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function ShiledIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff" strokeWidth={1.5}>
        <Path d="M4.8 10.733c0-2.558 0-3.837.302-4.267.302-.43 1.504-.842 3.91-1.665l.458-.157C10.724 4.214 11.35 4 12 4c.649 0 1.276.215 2.53.644l.458.157c2.405.823 3.608 1.235 3.91 1.665.302.43.302 1.71.302 4.267v1.26c0 4.51-3.391 6.7-5.519 7.629-.577.252-.866.378-1.681.378-.816 0-1.104-.126-1.681-.378-2.128-.93-5.52-3.119-5.52-7.629v-1.26z" />
        <Path d="M14 10l-4 4m0-4l4 4" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

export default ShiledIcon;
