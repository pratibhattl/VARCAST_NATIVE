import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

function BlastIcon(props) {
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
          <Use xlinkHref="#image0_302_2877" transform="scale(.00625)" />
        </Pattern>
        <Image
          id="image0_302_2877"
          width={160}
          height={160}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default BlastIcon;
