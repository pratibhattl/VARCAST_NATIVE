import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function VideoPlayIcon(props) {
  return (
    <Svg
      width={props.Width ? props.Width : 20}
      height={props.Height ? props.Height : 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.044 6.902C15.014 8.218 16 8.875 16 10c0 1.125-.985 1.783-2.956 3.098-.544.363-1.084.705-1.58.99-.434.25-.927.508-1.437.762-1.966.978-2.95 1.467-3.83.926-.883-.542-.963-1.675-1.123-3.943A26.604 26.604 0 015 10c0-.563.029-1.192.074-1.833.16-2.267.24-3.401 1.122-3.943.882-.541 1.865-.052 3.83.926.51.254 1.004.513 1.438.762.496.285 1.036.627 1.58.99z"
        fill={props.Color ? props.Color : '#141414'}
      />
    </Svg>
  );
}

export default VideoPlayIcon;
