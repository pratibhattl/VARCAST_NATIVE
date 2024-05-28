import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function HomeDisabledIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke={props.Color ? props.Color : '#525252'} strokeWidth={1.5}>
        <Path d="M4.291 12.766c-.303-2.11-.455-3.164-.023-4.066.433-.902 1.353-1.45 3.194-2.547l1.107-.66C10.241 4.498 11.077 4 12 4s1.76.498 3.43 1.494l1.108.66C18.38 7.25 19.3 7.797 19.732 8.7c.432.902.28 1.957-.023 4.066l-.223 1.55c-.39 2.71-.585 4.065-1.525 4.874-.94.81-2.319.81-5.076.81h-1.77c-2.757 0-4.136 0-5.076-.81-.94-.809-1.135-2.164-1.525-4.874l-.223-1.55z" />
        <Path d="M14.4 16.8H9.6" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

export default HomeDisabledIcon;
