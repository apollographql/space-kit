import React from "react";
import {
  MenuConfigProvider,
  useMenuColor,
  useMenuIconSize,
  useMenuTheme,
} from "../MenuConfig";

interface Props
  extends Omit<React.ComponentProps<typeof MenuConfigProvider>, "children"> {
  // className?: string;
  // style?: React.CSSProperties;

  /**
   * Color to use for the selected state of a menu item. Hover state will be
   * programatically calculated depending on the color and theme.
   */
  color?: React.ComponentProps<typeof MenuConfigProvider>["color"];

  /**
   * Icon size to use for all MenuItem icons
   *
   * This will assume that your icons are set to use `width="100%"` and
   * `height="100%"`. These styles will *not* be automatically applied to
   * accomodate for non-square icons.
   */
  iconSize?: React.ComponentProps<typeof MenuConfigProvider>["iconSize"];

  /**
   * Theme of the menu
   *
   * This will be used to calculate the shade of the hover color for menu items.
   *
   * This will *not* apply a background color because this element does not add
   * anything to the DOM. You are responsible for doing that yourself.
   */
  theme?: React.ComponentProps<typeof MenuConfigProvider>["theme"];
}

export const Menu: React.FC<Props> = ({ children, color, iconSize, theme }) => {
  const inheritedIconSize = useMenuIconSize();
  const inheritedMenuColor = useMenuColor();
  const inheritedTheme = useMenuTheme();

  return (
    <MenuConfigProvider
      color={color ?? inheritedMenuColor}
      iconSize={iconSize ?? inheritedIconSize}
      theme={theme ?? inheritedTheme}
    >
      {children}
    </MenuConfigProvider>
  );
};
