import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function RedHeartIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3 9.44c0 4.519 3.617 6.927 6.266 9.083C10.2 19.283 11.1 20 12 20c.9 0 1.8-.716 2.734-1.477C17.383 16.367 21 13.959 21 9.439s-4.95-7.725-9-3.38C7.95 1.714 3 4.92 3 9.44z"
        fill="#ED4040"
      />
    </Svg>
  );
}

export default RedHeartIcon;
