import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function PlayNext(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#fff" fillOpacity={0.54}>
        <Path d="M17.813 10.492C20.871 12.832 22.4 14 22.4 16s-1.53 3.169-4.587 5.507a43.716 43.716 0 01-2.45 1.76c-.675.444-1.44.903-2.23 1.355-3.051 1.739-4.576 2.608-5.944 1.645-1.368-.962-1.492-2.978-1.741-7.008a54.147 54.147 0 01-.115-3.26c0-1.001.045-2.119.115-3.258.249-4.031.373-6.046 1.74-7.01 1.369-.962 2.894-.092 5.944 1.647.792.45 1.556.91 2.23 1.355a43.67 43.67 0 012.451 1.76z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.666 7.733a.8.8 0 01.8.8v16a.8.8 0 11-1.6 0v-16a.8.8 0 01.8-.8z"
        />
      </G>
    </Svg>
  );
}

export default PlayNext;
