import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function RepeatIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#fff" fillOpacity={0.54}>
        <Path d="M10 18.35a.75.75 0 000-1.5v1.5zM11.2 6.4v.75a.75.75 0 00.53-1.28l-.53.53zm-1.07-2.13a.75.75 0 10-1.06 1.06l1.06-1.06zM10 16.85h-.4v1.5h.4v-1.5zm-.4-9.7h1.6v-1.5H9.6v1.5zm2.13-1.28l-1.6-1.6-1.06 1.06 1.6 1.6 1.06-1.06zM3.25 12a6.35 6.35 0 006.35 6.35v-1.5A4.85 4.85 0 014.75 12h-1.5zm1.5 0A4.85 4.85 0 019.6 7.15v-1.5A6.35 6.35 0 003.25 12h1.5zM12.8 17.6v-.75a.75.75 0 00-.53 1.28l.53-.53zm1.07 2.13a.75.75 0 101.06-1.06l-1.06 1.06zM14 5.65a.75.75 0 000 1.5v-1.5zm.4 11.2h-1.6v1.5h1.6v-1.5zm-2.13 1.28l1.6 1.6 1.06-1.06-1.6-1.6-1.06 1.06zM14 7.15h.4v-1.5H14v1.5zM19.25 12a4.85 4.85 0 01-4.85 4.85v1.5A6.35 6.35 0 0020.75 12h-1.5zm1.5 0a6.35 6.35 0 00-6.35-6.35v1.5A4.85 4.85 0 0119.25 12h1.5z" />
      </G>
    </Svg>
  );
}

export default RepeatIcon;
