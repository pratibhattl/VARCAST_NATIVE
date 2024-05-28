import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function HelpIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12} cy={12} r={8} stroke="#fff" strokeWidth={1.5} />
      <Path
        d="M10.5 9.5a1.5 1.5 0 112.263 1.292c-.38.225-.763.566-.763 1.008v1"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle cx={12.0002} cy={15.1999} r={0.8} fill="#fff" />
    </Svg>
  );
}

export default HelpIcon;
