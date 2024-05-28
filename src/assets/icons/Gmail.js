import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function GmailIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1.636 21h3.819v-9.273L0 7.637v11.727C0 20.269.734 21 1.636 21z"
        fill="#4285F4"
      />
      <Path
        d="M18.546 21h3.818C23.27 21 24 20.266 24 19.364V7.636l-5.454 4.091"
        fill="#34A853"
      />
      <Path
        d="M18.546 4.636v7.091L24 7.637V5.454c0-2.024-2.31-3.178-3.927-1.964"
        fill="#FBBC04"
      />
      <Path
        d="M5.454 11.727v-7.09L12 9.544l6.545-4.909v7.091L12 16.637"
        fill="#EA4335"
      />
      <Path
        d="M0 5.455v2.181l5.455 4.091v-7.09L3.927 3.49C2.307 2.277 0 3.43 0 5.455z"
        fill="#C5221F"
      />
    </Svg>
  );
}

export default GmailIcon;
