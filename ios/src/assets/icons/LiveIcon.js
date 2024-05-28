import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';

function LiveIcon(props) {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke={props.Color} strokeWidth={2}>
        <Path
          d="M26.57 9.6A11.961 11.961 0 0130 18c0 3.309-1.34 6.305-3.506 8.476M9.6 26.57A11.964 11.964 0 016 18c0-3.317 1.347-6.32 3.523-8.493M23.142 13.253c1.273 1.218 2.058 2.886 2.058 4.726 0 1.862-.804 3.547-2.104 4.769M12.96 22.8c-1.333-1.225-2.16-2.933-2.16-4.821 0-1.867.808-3.557 2.114-4.779"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx={17.9996} cy={17.9996} r={2.4} />
      </G>
    </Svg>
  );
}

export default LiveIcon;
