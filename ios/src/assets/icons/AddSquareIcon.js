import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function AddSquareIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke={props.Color} strokeWidth={1.5}>
        <Path d="M4 12c0-3.771 0-5.657 1.172-6.828C6.343 4 8.229 4 12 4c3.771 0 5.657 0 6.828 1.172C20 6.343 20 8.229 20 12c0 3.771 0 5.657-1.172 6.828C17.657 20 15.771 20 12 20c-3.771 0-5.657 0-6.828-1.172C4 17.657 4 15.771 4 12z" />
        <Path
          d="M14.4 12H12m0 0H9.6m2.4 0V9.6m0 2.4v2.4"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}

export default AddSquareIcon;
