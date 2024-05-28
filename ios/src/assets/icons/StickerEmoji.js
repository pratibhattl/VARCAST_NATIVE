import * as React from 'react';
import Svg, {Path, Ellipse} from 'react-native-svg';

function StickerEmoji(props) {
  return (
    <Svg
      width={29}
      height={29}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.833 14.5c0 5.338 4.328 9.666 9.667 9.666.626 0 1.208-.29 1.651-.732l7.283-7.283c.443-.443.732-1.025.732-1.651a9.667 9.667 0 10-19.333 0z"
        stroke="#fff"
        strokeWidth={1.5}
      />
      <Path
        d="M11.516 18.302c1 .25 2.11.295 3.244.097"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Ellipse
        cx={16.9262}
        cy={12.3486}
        rx={0.966667}
        ry={1.45}
        transform="rotate(-15 16.926 12.349)"
        fill="#fff"
      />
      <Ellipse
        cx={11.3237}
        cy={13.8496}
        rx={0.966667}
        ry={1.45}
        transform="rotate(-15 11.324 13.85)"
        fill="#fff"
      />
      <Path
        d="M14.5 24.167c0-2.7 0-4.05.38-5.135a6.767 6.767 0 014.152-4.152c1.085-.38 2.435-.38 5.135-.38"
        stroke="#fff"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default StickerEmoji;
