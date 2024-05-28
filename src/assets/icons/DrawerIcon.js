import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function DrawerIcon(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff" strokeWidth={1.5} strokeLinecap="round">
        <Path d="M18.4 8H5.6M18.4 12H5.6M18.4 16H5.6" />
      </G>
    </Svg>
  );
}

export default DrawerIcon;
