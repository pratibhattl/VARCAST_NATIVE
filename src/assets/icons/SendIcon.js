import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SendIcon(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.281 24.064l5.361-2.686c4.683-2.347 7.024-3.52 7.024-5.378s-2.341-3.032-7.024-5.379l-5.36-2.686c-3.78-1.894-5.67-2.841-6.765-2.55a3.003 3.003 0 00-2.132 2.137c-.29 1.098.654 2.992 2.544 6.78.234.47.713.782 1.237.784l8.557.04a.873.873 0 01-.008 1.747l-8.42-.039c-.576-.003-1.108.346-1.366.864-1.89 3.788-2.834 5.682-2.544 6.78a3.003 3.003 0 002.132 2.137c1.095.29 2.985-.657 6.764-2.55z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SendIcon;
