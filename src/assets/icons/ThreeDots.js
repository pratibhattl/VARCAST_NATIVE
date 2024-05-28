import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function ThreeDots(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#fff">
        <Path d="M8 12a1.6 1.6 0 11-3.2 0A1.6 1.6 0 018 12zM13.6 12a1.6 1.6 0 11-3.2 0 1.6 1.6 0 013.2 0zM19.2 12a1.6 1.6 0 11-3.2 0 1.6 1.6 0 013.2 0z" />
      </G>
    </Svg>
  );
}

export default ThreeDots;
