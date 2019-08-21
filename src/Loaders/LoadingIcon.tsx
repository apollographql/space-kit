/** @jsx jsx */
import React from "react";
import { jsx, keyframes } from "@emotion/core";
import { colors } from "../colors";

interface Props {
  darkBackground?: boolean;
  size?: "large" | "medium" | "small" | "tiny" | "icon";
}

// The whole thing is exactly 5 seconds long.
// Each rotation is 450 degrees, with a deceleration at
// 420 degrees, and a reduced speed between 420-450.
// 1st rotation: 60 deg and 90 deg
// 2nd rotation: 150 deg and 180 deg
// 3rd rotation: 240 deg and 270 deg
// 4th rotation: 330 deg and 360 deg (restart loop)
const SPIN = keyframes`
  25% { transform: rotate(450deg) }
  50% { transform: rotate(900deg) }
  75% { transform: rotate(1350deg) }
  100% { transform: rotate(1800deg) }
`;

const SIZE_MAP = {
  large: 90,
  medium: 64,
  small: 48,
  tiny: 32,
  icon: 14,
}

export const LoadingIcon: React.FC<Props> = ({
  darkBackground = false,
  size = "medium",
  ...props
}) => {
  const orbitColor = darkBackground ? colors.white : colors.silver.light;
  const orbitOpacity = darkBackground ? 0.5 : 1;
  const asteroidColor = darkBackground ? colors.white : colors.blue.base;

  const pixelSize = SIZE_MAP[size];

  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        width: pixelSize,
        height: pixelSize,
      }}
      {...props}
    >
      <circle
        stroke-width="8"
        stroke={orbitColor}
        stroke-opacity={orbitOpacity}
        fill="transparent"
        r="41"
        cx="50"
        cy="50"
      />
      <g transform="translate(50 50)">
        <circle
          css={{
            animation: `${SPIN} 5s cubic-bezier(0.6, 0.22, 0.44, 0.8) infinite`,
          }}
          fill={asteroidColor}
          r="10"
          cx="40"
          cy="0"
        />
      </g>
    </svg>
  );
};
