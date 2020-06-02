import React from "react";
import { colors, ShadedColor } from "../colors";

/**
 * Enumeration of all icon sizes
 *
 * This uses string literals instead of a TypeScript union so we can use
 * strings, like `"small"`, for props instead of `IconSize.small`
 */
type IconSize = "small" | "normal";

interface MenuConfig {
  /**
   * Color of the menu. This will be used to programtically alter hover,
   * selected, and text colors
   *
   * @default "inherit"
   */
  color: ShadedColor;

  /**
   * Icon size to use for all descendents
   */
  iconSize: IconSize;

  theme: "light" | "dark";
}

/**
 * Context holding all configuration options for Menus
 */
const MenuConfigContext = React.createContext<Partial<MenuConfig> | undefined>(
  undefined
);

/**
 * Provider to set menu config on the context
 *
 * This value is immutable; it's defined when instantiated
 */
export const MenuConfigProvider: React.FC<Partial<MenuConfig>> = ({
  children,
  iconSize,
  color,
  theme,
}) => {
  return (
    <MenuConfigContext.Provider
      value={{
        color,
        iconSize,
        theme,
      }}
    >
      {children}
    </MenuConfigContext.Provider>
  );
};

interface withMenuIconSizeProps {
  /**
   * Render prop function. Calls the callback in the shape of
   *
   * ```jsx
   * { iconSize: IconSize }
   * ```
   */
  children: (
    renderPropValues: Pick<MenuConfig, "iconSize">
  ) => ReturnType<React.FC>;
}

/**
 * Extract `IconSize` from context.
 *
 * *Avoid this component.* Use `useMenuIconSize` instead. This is intended to be
 * used _only_ in the case where you can't use hooks because you're rendering
 * something under another render prop component.
 */
export const WithMenuIconSize: React.FC<withMenuIconSizeProps> = ({
  children,
}) => (
  <MenuConfigContext.Consumer>
    {(config) => children({ iconSize: config?.iconSize ?? "normal" })}
  </MenuConfigContext.Consumer>
);

function useMenuConfig() {
  return React.useContext(MenuConfigContext);
}

/**
 * Extract color from menu config context
 *
 * Uses a reasonable default as we don't require any consumer to use
 * `MenuConfigProvider`
 */
export function useMenuColor(): MenuConfig["color"] {
  return useMenuConfig()?.color ?? colors.blue.base;
}

/**
 * Extract `IconSize` from context
 *
 * Uses a reasonable default as we don't require any consumer to use
 * `IconSizeProvider`
 */
export function useMenuIconSize(): MenuConfig["iconSize"] {
  return useMenuConfig()?.iconSize ?? "normal";
}

/**
 * Extract theme from menu config context
 *
 * Uses a reasonable default as we don't require any consumer to use
 * `MenuConfigProvider`
 *
 * Defaults to `light`
 */
export function useMenuTheme(): MenuConfig["theme"] {
  return useMenuConfig()?.theme ?? "light";
}
