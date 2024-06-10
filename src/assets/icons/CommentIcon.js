import React from 'react';
import Svg, { Path } from 'react-native-svg';

function CommentIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 2C6.48 2 2 5.92 2 10.5C2 12.96 3.34 15.14 5.5 16.45V22L9.09 19.27C9.63 19.42 10.29 19.5 11 19.5C16.52 19.5 21 15.58 21 11C21 6.42 16.52 2.5 12 2ZM4 10.5C4 7.12 7.58 4 12 4C16.42 4 20 7.12 20 10.5C20 13.88 16.42 17 12 17C11.36 17 10.75 16.93 10.18 16.82L7.96 18.24L8 15.64C5.85 14.34 4 12.5 4 10.5Z"
        fill="#ffffff"
      />
    </Svg>
  );
}

export default CommentIcon;
