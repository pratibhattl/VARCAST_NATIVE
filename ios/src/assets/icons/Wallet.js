import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function WalletIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.2 10.4h3.2"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.067 11.2h-2.082c-1.427 0-2.585 1.075-2.585 2.4 0 1.326 1.158 2.4 2.585 2.4h2.082c.067 0 .1 0 .128-.002.432-.026.775-.345.803-.745.002-.027.002-.058.002-.12v-3.066c0-.062 0-.093-.002-.12-.028-.4-.371-.719-.803-.745-.028-.002-.061-.002-.128-.002z"
        stroke="#fff"
        strokeWidth={1.5}
      />
      <Circle cx={16.8} cy={13.5998} r={0.8} fill="#fff" />
      <Path
        d="M19.172 11.2c-.062-1.498-.263-2.416-.91-3.063C17.327 7.2 15.818 7.2 12.8 7.2h-2.4c-3.017 0-4.525 0-5.463.937C4 9.075 4 10.583 4 13.6s0 4.526.937 5.463C5.875 20 7.383 20 10.4 20h2.4c3.017 0 4.526 0 5.463-.937.646-.647.847-1.565.909-3.063"
        stroke="#fff"
        strokeWidth={1.5}
      />
      <Path
        d="M7.2 7.2l2.989-1.982a2.59 2.59 0 012.823 0L16 7.2"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default WalletIcon;
