import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function AlarmIcon(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fillRule="evenodd" clipRule="evenodd" fill="#fff" fillOpacity={0.54}>
        <Path d="M11.878 4.91a.8.8 0 01-.254 1.102L7.357 8.678a.8.8 0 01-.848-1.356l4.267-2.667a.8.8 0 011.102.254zm8.243 0a.8.8 0 011.103-.255l4.266 2.667a.8.8 0 01-.848 1.356l-4.266-2.666a.8.8 0 01-.255-1.103zM16 26.667a9.6 9.6 0 100-19.2 9.6 9.6 0 000 19.2zm-3.2-12a.8.8 0 110-1.6h6.4a.8.8 0 01.565 1.365l-5.034 5.035H19.2a.8.8 0 010 1.6h-6.4a.8.8 0 01-.566-1.366l5.034-5.034H12.8z" />
      </G>
    </Svg>
  );
}

export default AlarmIcon;
