/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function WatchLaterIcon(props) {
  return (
    <Svg
      width={props.Width ? props.Width : 20}
      height={props.Height ? props.Height : 20}
      viewBox="0 0 31 26"
      fill="#141414"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fill="#606060"
        d="M3.702 12.83a12.572 12.572 0 1 1 5.212 10.8l1.45-1.45a10.552 10.552 0 1 0-4.624-9.583l-2.038.233Z"/>
      <Path
        fill="#606060"
        d="M6.14 18.844a1.26 1.26 0 0 1-2.129.107L.96 14.62a1.26 1.26 0 0 1 .966-1.985l5.655-.285a1.26 1.26 0 0 1 1.161 1.877L6.14 18.844zM13.66 6.3h1.445v9.202H13.66V6.3z"/>
      <Path
        fill="#606060"
        d="m13.66 15.502.794-1.207 7.69 5.053-.794 1.207-7.69-5.053Z"/>
    </Svg>
  );
}

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="29"
  height="26"
  fill="none"
  id="watch-later"></svg>;
export default WatchLaterIcon;
