import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function PlayPrevious(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#fff" fillOpacity={0.54}>
        <Path d="M14.186 10.492C11.13 12.832 9.6 14 9.6 16s1.529 3.169 4.586 5.507a43.753 43.753 0 002.45 1.76c.676.444 1.44.903 2.231 1.355 3.05 1.739 4.576 2.608 5.944 1.645 1.368-.962 1.492-2.978 1.74-7.008.071-1.14.116-2.258.116-3.26 0-1.001-.045-2.119-.115-3.258-.249-4.031-.373-6.046-1.741-7.01-1.368-.962-2.893-.092-5.944 1.647-.791.45-1.555.91-2.23 1.355a43.707 43.707 0 00-2.45 1.76z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.333 7.733a.8.8 0 00-.8.8v16a.8.8 0 001.6 0v-16a.8.8 0 00-.8-.8z"
        />
      </G>
    </Svg>
  );
}

export default PlayPrevious;
