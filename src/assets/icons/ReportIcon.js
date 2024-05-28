import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function ReportIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.65 11.009c2.334-4.14 3.501-6.21 5.35-6.21 1.849 0 3.016 2.07 5.35 6.21l.292.516c1.94 3.44 2.91 5.16 2.033 6.417-.877 1.258-3.046 1.258-7.384 1.258h-.582c-4.338 0-6.507 0-7.384-1.258-.877-1.257.093-2.977 2.033-6.417l.291-.516z"
        stroke={props.Color ? props.Color : '#fff'}
        strokeWidth={1.5}
      />
      <Path
        d="M12 8.8v4"
        stroke={props.Color ? props.Color : '#fff'}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle
        cx={12.0002}
        cy={15.1999}
        r={0.8}
        fill={props.Color ? props.Color : '#fff'}
      />
    </Svg>
  );
}

export default ReportIcon;
