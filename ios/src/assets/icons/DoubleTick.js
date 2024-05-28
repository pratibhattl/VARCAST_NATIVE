import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function DoubleTick(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G
        stroke="#E1D01E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M4 10.6L6.286 13 12 7M16 7l-5.714 6-.286-.375" />
      </G>
    </Svg>
  );
}

export default DoubleTick;
