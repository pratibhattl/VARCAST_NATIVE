import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function GitftIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff" strokeWidth={1.5}>
        <Path
          d="M20 12H4M12 4v16M12.8 12a3.2 3.2 0 003.2 3.2M11.2 12A3.2 3.2 0 018 15.2"
          strokeLinecap="round"
        />
        <Path d="M12 10.428c0-1.192.811-2.231 1.967-2.52a1.752 1.752 0 012.125 2.124A2.598 2.598 0 0113.572 12H12v-1.572zM12 10.428c0-1.192-.81-2.23-1.967-2.52a1.752 1.752 0 00-2.125 2.125A2.597 2.597 0 0010.428 12H12v-1.572z" />
        <Path d="M4 12c0-3.771 0-5.657 1.172-6.828C6.343 4 8.229 4 12 4c3.771 0 5.657 0 6.828 1.172C20 6.343 20 8.229 20 12c0 3.771 0 5.657-1.172 6.828C17.657 20 15.771 20 12 20c-3.771 0-5.657 0-6.828-1.172C4 17.657 4 15.771 4 12z" />
      </G>
    </Svg>
  );
}

export default GitftIcon;
