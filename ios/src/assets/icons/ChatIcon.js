import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function ChatIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff" strokeWidth={1.5}>
        <Path d="M12 19.2a7.2 7.2 0 10-6.449-3.994c.128.256.17.55.097.826l-.43 1.603a.936.936 0 001.147 1.146l1.603-.429c.277-.074.57-.031.826.096A7.17 7.17 0 0012 19.2z" />
        <Path d="M9.12 10.92h5.76M9.12 13.44h3.96" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

export default ChatIcon;
