import React from "react";

/**
 * Enumeration of all icon sizes
 *
 * This uses string literals instead of a TypeScript union so we can use
 * strings, like `"small"`, for props instead of `IconSize.small`
 */
type IconSize = "small" | "normal";

interface MenuConfig {
  /**
   * Icon size to use for all descendents
   */
  iconSize: IconSize;
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
  ...menuConfig
}) => {
  return (
    <MenuConfigContext.Provider value={menuConfig}>
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
    {config => children({ iconSize: config?.iconSize ?? "normal" })}
  </MenuConfigContext.Consumer>
);

/**
 * Extract `IconSize` from context
 *
 * Uses a reasonable default as we don't require any consumer to use
 * `IconSizeProvider`
 */
export function useMenuIconSize(): MenuConfig["iconSize"] {
  const context = React.useContext(MenuConfigContext);

  return context?.iconSize ?? "normal";
}
