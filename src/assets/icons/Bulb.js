import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

function BulbIcon(props) {
  return (
    <Svg
      width={36}
      height={37}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Path d="M0 36.52h36v-36H0v36z" fill="url(#pattern0)" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_302_2883" transform="scale(.00625)" />
        </Pattern>
        <Image
          id="image0_302_2883"
          width={160}
          height={160}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default BulbIcon;
