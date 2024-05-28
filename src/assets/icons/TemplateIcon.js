import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function TemplateIcon(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="#fff" strokeWidth={1.5}>
        <Path d="M5.333 9.6a4.267 4.267 0 018.533 0v12.8a4.267 4.267 0 11-8.533 0V9.6z" />
        <Path d="M13.867 11.992L17.4 8.458a4.267 4.267 0 016.034 6.034L13.127 24.8" />
        <Path d="M9.6 26.666h12.8a4.267 4.267 0 100-8.533h-2.667M10.666 22.4a1.067 1.067 0 11-2.133 0 1.067 1.067 0 012.133 0z" />
      </G>
    </Svg>
  );
}

export default TemplateIcon;
