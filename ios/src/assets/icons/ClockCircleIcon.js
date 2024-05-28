import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

function ClockCircleIcon(props) {
  return (
    <Svg
      width={props.Width ? props.Width : 14}
      height={props.Height ? props.Height : 14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff">
        <Circle cx={7.00008} cy={7.00008} r={5.00008} />
        <Path
          d="M7 5v2l1.25 1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

export default ClockCircleIcon;
