import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function PlaylistIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke={props.Color} strokeWidth={1.5}>
        <Path d="M18.4 5.6H4.8M8.8 13.6h-4M12 9.6H4.8" strokeLinecap="round" />
        <Path d="M15.2 16.343c0 1.136-.895 2.057-2 2.057-1.104 0-2-.92-2-2.057 0-1.136.896-2.057 2-2.057 1.105 0 2 .92 2 2.057zm0 0V11.2" />
        <Path
          d="M17.34 8.893l-1.403.674c-.274.131-.41.197-.51.298a.802.802 0 00-.178.285c-.049.133-.049.284-.049.587 0 .701 0 1.052.153 1.262a.8.8 0 00.503.317c.256.047.572-.105 1.204-.408l1.404-.674c.273-.131.41-.197.509-.298a.8.8 0 00.179-.285c.048-.133.048-.284.048-.587 0-.702 0-1.052-.153-1.262a.8.8 0 00-.503-.317c-.256-.047-.572.105-1.204.408z"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}

export default PlaylistIcon;
