import * as React from 'react';
import Svg, {Circle, Path, Ellipse} from 'react-native-svg';

function SadEmojiIcon(props) {
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
        d="M9.6 16c.68-.504 1.507-.8 2.4-.8.892 0 1.72.296 2.4.8"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Ellipse cx={14.3996} cy={10.7996} rx={0.8} ry={1.2} fill="#fff" />
      <Ellipse cx={9.5998} cy={10.7996} rx={0.8} ry={1.2} fill="#fff" />
    </Svg>
  );
}

export default SadEmojiIcon;
