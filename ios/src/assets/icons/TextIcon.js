import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function TextIcon(props) {
  return (
    <Svg
      width={29}
      height={29}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff" strokeWidth={1.5}>
        <Path d="M11.6 11.6h5.8M14.5 17.4v-5.8" strokeLinecap="round" />
        <Path d="M8.7 6.766a1.933 1.933 0 11-3.867 0 1.933 1.933 0 013.867 0zM8.7 22.233a1.933 1.933 0 11-3.867 0 1.933 1.933 0 013.867 0zM24.167 6.767a1.933 1.933 0 11-3.866 0 1.933 1.933 0 013.866 0zM24.167 22.233a1.933 1.933 0 11-3.866 0 1.933 1.933 0 013.866 0z" />
        <Path
          d="M8.7 22.233h11.6M20.3 6.767H8.7M22.233 20.3V8.7M6.767 8.7v11.6"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}

export default TextIcon;
