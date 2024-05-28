import * as React from 'react';
import Svg, {G, Circle, Ellipse} from 'react-native-svg';

function UserIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke={props.Color} strokeWidth={1.5}>
        <Circle cx={12.0008} cy={7.2} r={3.2} />
        <Ellipse cx={12.0004} cy={15.9998} rx={5.6} ry={3.2} />
      </G>
    </Svg>
  );
}

export default UserIcon;
