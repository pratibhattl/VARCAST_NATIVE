import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function EyeOpen(props) {
  return (
    <Svg
      width={props.Width ? props.Width : 24}
      height={props.Heigth ? props.Heigth : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.02 14.636C4.34 13.753 4 13.313 4 12s.34-1.753 1.02-2.637C6.378 7.6 8.654 5.6 12 5.6c3.345 0 5.622 2 6.98 3.763.68.884 1.02 1.325 1.02 2.637s-.34 1.753-1.02 2.636C17.622 16.4 15.345 18.4 12 18.4c-3.346 0-5.622-2-6.98-3.763z"
        stroke="#fff"
        strokeWidth={1.5}
      />
      <Path
        d="M14.4 12a2.4 2.4 0 11-4.8 0 2.4 2.4 0 014.8 0z"
        stroke="#fff"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default EyeOpen;
