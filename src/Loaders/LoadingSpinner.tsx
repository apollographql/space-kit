/** @jsx jsx */
import React from "react";
import * as CSS from "csstype";
import { jsx, keyframes } from "@emotion/core";
import { colors } from "../colors";

export type Size = "large" | "medium" | "small" | "xsmall" | "2xsmall";
export type Theme = "light" | "dark";
interface Props {
  /**
   * Class name that will be applied to the svg
   */
  className?: string;

  /**
   * Theme for the spinner
   * @default "light"
   */
  theme?: Theme;

  /**
   * Size of the spinner
   * @default "medium"
   */
  size?: Size;
}

// The whole animation is exactly 5 seconds long.
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

const SIZE_MAP: Record<Size, number> = {
  large: 90,
  medium: 64,
  small: 48,
  xsmall: 32,
  "2xsmall": 16,
};

const THEME_MAP: Record<
  Theme,
  {
    orbitColor: CSS.ColorProperty;
    orbitOpacity: CSS.GlobalsNumber;
    asteroidColor: CSS.ColorProperty;
  }
> = {
  light: {
    orbitColor: colors.silver.light,
    orbitOpacity: 1,
    asteroidColor: colors.blue.base,
  },
  dark: {
    orbitColor: colors.white,
    orbitOpacity: 0.5,
    asteroidColor: colors.white,
  },
};

export const LoadingSpinner: React.FC<Props> = ({
  theme = "light",
  size = "medium",
  className,
  ...props
}) => {
  const { orbitColor, orbitOpacity, asteroidColor } = THEME_MAP[theme];

  const pixelSize = SIZE_MAP[size];

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      css={{
        width: pixelSize,
        height: pixelSize,
      }}
      {...props}
    >
      <circle
        strokeWidth="8"
        stroke={orbitColor}
        strokeOpacity={orbitOpacity}
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
