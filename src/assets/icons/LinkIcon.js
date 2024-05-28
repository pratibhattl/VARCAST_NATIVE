import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LinkIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.734 16.645l6.313-6.042a1.802 1.802 0 000-2.627 2.003 2.003 0 00-2.745 0l-6.267 5.998a3.424 3.424 0 000 4.992c1.44 1.379 3.775 1.379 5.215 0l6.358-6.086c2.122-2.032 2.122-5.325 0-7.356-2.122-2.032-5.563-2.032-7.685 0L4.8 10.428"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default LinkIcon;
