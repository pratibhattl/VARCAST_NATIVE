import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

function CompassIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke={props.Color} strokeWidth={1.5}>
        <Circle cx={12} cy={12} r={8} />
        <Path d="M12.82 14.048c-1.848.74-2.772 1.109-3.3.75a1.202 1.202 0 01-.318-.318c-.359-.527.01-1.451.75-3.3.158-.393.236-.59.372-.745.034-.04.072-.077.111-.111.155-.136.352-.214.746-.372 1.848-.74 2.772-1.109 3.3-.75.124.085.232.193.317.318.359.528-.01 1.452-.75 3.3-.157.393-.236.59-.372.745-.034.04-.071.077-.11.111-.155.136-.353.215-.747.372z" />
      </G>
    </Svg>
  );
}

export default CompassIcon;
