import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

function Activity(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      // viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff" strokeWidth={1.5}>
        <Circle cx={12} cy={12} r={8} />
        <Path d="M12 8.8V12l2 2" strokeLinecap="round" strokeLinejoin="round" />
      </G>
    </Svg>
  );
}

export default Activity;
