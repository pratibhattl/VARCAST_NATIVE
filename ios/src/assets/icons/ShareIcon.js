import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ShareIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.131 6.783l3.178 2.825c1.255 1.115 1.882 1.673 1.882 2.391 0 .719-.627 1.277-1.882 2.392l-3.178 2.825c-.573.51-.86.764-1.095.658-.236-.106-.236-.49-.236-1.256v-1.876c-2.88 0-6 1.372-7.2 3.657 0-7.314 4.266-9.142 7.2-9.142V7.38c0-.766 0-1.15.236-1.256.236-.106.522.149 1.095.658z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ShareIcon;
