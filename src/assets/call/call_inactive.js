import React from "react";
import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";

/** home active icon */
const CallInActiveIcon = ({ width = 24, height = 24, color = "black" }) => {
  return (
    <Svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M64 436 c-19 -19 -34 -42 -34 -52 1 -103 251 -353 353 -354 23 0 87
62 87 84 0 9 -25 32 -55 53 -55 36 -56 36 -89 20 l-33 -15 -61 61 -60 62 16
32 c15 32 15 33 -21 88 -21 30 -44 55 -53 55 -9 0 -31 -15 -50 -34z"
        fill="#677187"
      />
    </Svg>
  );
};

export default CallInActiveIcon;
