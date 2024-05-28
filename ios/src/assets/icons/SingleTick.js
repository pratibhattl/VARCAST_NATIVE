import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SingleTick(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6 10.6L8.286 13 14 7"
        stroke="#fff"
        strokeOpacity={0.54}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SingleTick;
