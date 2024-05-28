import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function Notification(props) {
  return (
    <Svg
      width={24}
      height={24}
      style={{
        marginRight: 10,
      }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff" strokeWidth={1.5}>
        <Path d="M17.6 10.163V9.6a5.6 5.6 0 10-11.2 0v.563c0 .676-.2 1.337-.575 1.9l-.92 1.378a2.217 2.217 0 001.262 3.368 22.167 22.167 0 0011.666 0 2.217 2.217 0 001.26-3.368l-.918-1.378a3.425 3.425 0 01-.575-1.9z" />
        <Path
          d="M8.4 17.6c.524 1.398 1.938 2.4 3.6 2.4 1.662 0 3.076-1.002 3.6-2.4"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}

export default Notification;
