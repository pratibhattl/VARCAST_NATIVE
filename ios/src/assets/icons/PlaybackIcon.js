import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function PlayBackIcon(props) {
  return (
    <Svg
      width={props.Size}
      height={props.Size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke={props.Color} strokeWidth={1.5}>
        <Path
          d="M16 26.666c5.891 0 10.667-4.775 10.667-10.666S21.89 5.333 16 5.333"
          strokeLinecap="round"
        />
        <Path
          d="M16 26.667c-5.891 0-10.667-4.775-10.667-10.666S10.109 5.334 16 5.334"
          strokeLinecap="round"
          strokeDasharray="4 3"
        />
        <Path d="M18.013 13.797c1.147.935 1.72 1.403 1.72 2.203 0 .8-.573 1.268-1.72 2.203-.316.258-.63.501-.919.704-.253.177-.54.361-.836.542-1.144.695-1.716 1.043-2.23.658-.512-.385-.559-1.191-.652-2.803A23.072 23.072 0 0113.333 16c0-.4.017-.848.043-1.304.093-1.612.14-2.418.653-2.803.513-.385 1.085-.037 2.229.658.297.18.583.365.836.542.289.203.603.446.92.704z" />
      </G>
    </Svg>
  );
}

export default PlayBackIcon;
