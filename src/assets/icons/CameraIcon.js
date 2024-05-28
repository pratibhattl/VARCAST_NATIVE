import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

function CameraIcon(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff" strokeWidth={1.5}>
        <Circle cx={15.9998} cy={17.0662} r={3.2} />
        <Path d="M13.63 25.6h4.74c3.33 0 4.994 0 6.19-.784.517-.34.962-.776 1.307-1.284.8-1.174.8-2.808.8-6.077s0-4.903-.8-6.077a4.699 4.699 0 00-1.308-1.284c-.768-.504-1.73-.684-3.203-.749-.702 0-1.307-.523-1.445-1.2-.207-1.014-1.115-1.745-2.169-1.745h-3.485c-1.054 0-1.962.73-2.168 1.746-.138.676-.743 1.2-1.446 1.2-1.473.064-2.435.244-3.203.748a4.7 4.7 0 00-1.308 1.284c-.799 1.174-.799 2.808-.799 6.077s0 4.903.799 6.077a4.7 4.7 0 001.308 1.284c1.196.784 2.86.784 6.19.784z" />
        <Path d="M23.467 13.867H22.4" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

export default CameraIcon;
